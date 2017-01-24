#include "SimpleTimer.h"
#include "OneWire.h"
#include "LiquidCrystal.h"

OneWire  ds(8); 
LiquidCrystal lcd(2,3,4,5,6,7);

//program variables
SimpleTimer timer;
int pwm;
float temperatureReading;
int temperatureSetpoint = 22;
int kp = 250;
int ki = 65;
int kd = 80;
int regulatorType = 0;
float hysteresis=0.5;
int power=255;

//PIN DECLARATIONS
const int FAN1 = 9;
const int FAN2 = 10;
const int ENA = 11;
const int IN2 = 12;
const int IN1 = 13;


/////FUNCTIONS executed with timers////
void bluetoothReceive();
void bluetoothSend();
void regulation();
///// other functions
void Motor_Control(int Speed);
int PID(int setpoint, float currentTemperature , float actualTime, int kp, int ki, int kd);
float TempRead();
void setLCD_start();
void setLCD(int setpoint, float temp);
int HIST(int setpointTemperature, float currentTemperature);

////PROGRAM
void setup(void) {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(FAN1, OUTPUT);
  pinMode(FAN2, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN1, OUTPUT);
  setLCD_start();
  timer.setInterval(1000, regulation);
  timer.setInterval(1000, bluetoothSend);
  timer.setInterval(2000, bluetoothReceive);
}

void loop(void) {
  timer.run();
  analogWrite(FAN1, 255);
  analogWrite(FAN2, 255);
}


/////TIMER FUNCTIONS/////
void bluetoothReceive() {
  // main points in string data
  int t;
  int p;
  int j;
  int d;
  int r;
  int h;
  int m;
  // received data
  String receivedData;
  String receivedSetpointS = "0";
  String receivedKiS = "0";
  String receivedKpS = "0";
  String receivedKdS = "0";
  String receivedRegulatorTypeS = "0";
  String receivedHysteresisS="0";
  String receivedPowerS="0";
  //received data in INT
  int receivedSetpointInt;
  int receivedKiInt;
  int receivedKpInt;
  int receivedKdInt;
  int receivedRegulatorTypeInt;
  float receivedHysteresisFloat;
  int receivedPowerInt;

  receivedData = Serial.readStringUntil('/n');
  if (receivedData.length() >= 15)
  {

    for (int i = 0; i < receivedData.length(); i++)
    {
      if (receivedData[i] == 't') {
        t = i;
      }
      else if (receivedData[i] == 'p') {
        p = i;
      }
      else if (receivedData[i] == 'i') {
        j = i;
      }
      else if (receivedData[i] == 'd') {
        d = i;
      }
      else if (receivedData[i] == 'r') {
        r = i;
      }
      else if (receivedData[i] == 'h') {
        h = i;
      }
      else if (receivedData[i] == 'm') {
        m = i;
      }
    }

    receivedSetpointS = receivedData.substring(t + 1, p);
    receivedKpS = receivedData.substring(p + 1, j);
    receivedKiS = receivedData.substring(j + 1, d);
    receivedKdS = receivedData.substring(d + 1, r);
    receivedRegulatorTypeS = receivedData.substring(r + 1, h);
    receivedHysteresisS=receivedData.substring(h + 1, m);
    receivedPowerS=receivedData.substring(m + 1, receivedData.length() - 1);

    receivedSetpointInt = receivedSetpointS.toInt();
    receivedKpInt = receivedKpS.toInt();
    receivedKiInt = receivedKiS.toInt();
    receivedKdInt = receivedKdS.toInt();
    receivedRegulatorTypeInt = receivedRegulatorTypeS.toInt();
    receivedHysteresisFloat=receivedHysteresisS.toFloat();
    receivedPowerInt=receivedPowerS.toInt();

    temperatureSetpoint = receivedSetpointInt;
    kp = receivedKpInt;
    ki = receivedKiInt;
    kd = receivedKdInt;
    regulatorType = receivedRegulatorTypeInt;
    hysteresis=receivedHysteresisFloat;
    power=receivedPowerInt;

  }
  else {}
}

void bluetoothSend() {
  Serial.print("t");
  Serial.print(temperatureReading,1);
  Serial.print("s");
  Serial.print(temperatureSetpoint,1);
  Serial.print("p");
  Serial.print(pwm);
  Serial.print("k");
  Serial.print(kp);
  Serial.print("i");
  Serial.print(ki);
  Serial.print("d");
  Serial.print(kd);
  Serial.print("r");
  Serial.print(regulatorType);
  Serial.print("h");
  Serial.print(hysteresis);
  Serial.print("m");
  Serial.print(power);
  Serial.println("/n");

  setLCD(temperatureSetpoint, temperatureReading);
}

void regulation() {
  temperatureReading = TempRead();
  if (regulatorType == 0) {
    pwm = PID(temperatureSetpoint, temperatureReading, millis(), kp , ki, kd); //  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2)
  }
  else {
    pwm = HIST(temperatureSetpoint, temperatureReading, hysteresis, power);
  }
  Motor_Control(pwm);
}

/////OTHER FUNCTIONS/////
void Motor_Control(int Speed)
{
  if (Speed > 0)//heating
  {
    digitalWrite(IN2, LOW);
    digitalWrite(IN1,  HIGH);
    analogWrite(ENA, Speed);
  }
  else if (Speed < 0)//cooling
  {
    Speed = Speed * (-1);
    digitalWrite(IN2, HIGH);
    digitalWrite(IN1, LOW);
    analogWrite(ENA, Speed);
  }
  else {//stop
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
  }
}

int HIST(int setpointTemperature, float currentTemperature, float hystValue, int powerValue) {
  float error = setpointTemperature - currentTemperature;
  if (error > hystValue) {
    return powerValue;
  }
  else if (error < -hystValue) {
    return -powerValue;
  }
  else {
    return 0;
  }
}

int PID(int setpointTemperature, float currentTemperature, float actualTime, int kp, int ki, int kd) {

  //variable declarations
  float maximum = 255;
  float minimum = -255;
  
  float static integral = 0;
  float static previousTime = 0;
  float static previousError = 0;
  float static previousOutput=0;

  float error = setpointTemperature - currentTemperature;
  float dt = (float)(actualTime - previousTime);
  dt=dt/60000;
  if(previousOutput>-255&&previousOutput<255){
    integral = integral + (error * dt);
  }
  if (integral > 1) {
    integral = 1;
  }
  else if (integral < -1) {
    integral = -1;
  }
  float derivative = (error - previousError) / dt;
  previousError = error;
  previousTime = actualTime;

  int output = kp * error + ki*integral + kd * derivative;
  previousOutput=output;
  if (output >= maximum)
  {
    output = maximum;
  }
  else if ( output <= minimum)
  {
    output = minimum;
  }
  return output;
}

void setLCD_start() {
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Reading ");
  lcd.setCursor(15, 0);
  lcd.print("C");
  lcd.setCursor(0, 1);
  lcd.print("Setpoint  ");
  lcd.setCursor(15, 1);
  lcd.print("C ");
}

void setLCD(int setpoint, float temp) {
  lcd.setCursor(9, 0);
  lcd.print(temp,1);
  lcd.setCursor(9, 1);
  lcd.print((float)setpoint,1);
}

float TempRead()
{
  byte i;
  byte present = 0;
  byte type_s;
  byte data[12];
  byte addr[8];
  float celsius;

  if ( !ds.search(addr)) {
    ds.reset_search();
    delay(250);
  }

  ds.reset();
  ds.select(addr);
  ds.write(0x44, 1);        // start conversion, with parasite power on at the end

  present = ds.reset();
  ds.select(addr);
  ds.write(0xBE);         // Read Scratchpad

  for ( i = 0; i < 9; i++) {           // we need 12 bytes
    data[i] = ds.read();
  }

  int16_t raw = (data[1] << 8) | data[0];
  
  if (type_s) {
    raw = raw << 3; // 9 bit resolution default
    if (data[7] == 0x10) {
      // "count remain" gives full 12 bit resolution
      raw = (raw & 0xFFF0) + 12 - data[6];
    }
  } 
  else {
    
  }

  celsius = (float)raw / 16.0;

  return celsius;
}
