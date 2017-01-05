#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"
#include "SimpleTimer.h"


//program variables
SimpleTimer timer;
float pwm;
float temperatureReading;
int temperatureSetpoint = 22;
int kp=15;
int ki=5;
int kd=2;
int regulatorType=0;
// main points in string data
int t;
int p;
int j;
int d;
int r;
// received data
String receivedData;
String receivedSetpointS="0";
String receivedKiS="0";
String receivedKpS="0";
String receivedKdS="0";
String receivedRegulatorTypeS="0";
//received data in INT
int receivedSetpointInt;
int receivedKiInt;
int receivedKpInt;
int receivedKdInt;
int receivedRegulatorTypeInt;



void bluetoothReceive(){
  receivedData = Serial.readStringUntil('\n');
  if(receivedData.length()>=10)
  {

    for(int i=0; i<receivedData.length();i++)
    {
      if(receivedData[i]=='t'){
        t=i;
      }
      else if(receivedData[i]=='p'){
        p=i;
      }
      else if(receivedData[i]=='i'){
        j=i;
      }
      else if(receivedData[i]=='d'){
        d=i;
      }
      else if(receivedData[i]=='r'){
        r=i;
      }
    }
        /*Serial.println("Znaczniki");
        Serial.println(t);
        Serial.println(p);
        Serial.println(j);
        Serial.println(d);
        Serial.println(r);*/
    /*for(int i=1;i<receivedData.length()+1;i++)
    {
      dtemperatureReading[i-1]=receivedData[i];
    }*/
    receivedSetpointS=receivedData.substring(t+1,p);
    receivedKpS=receivedData.substring(p+1,j);
    receivedKiS=receivedData.substring(j+1,d);
    receivedKdS=receivedData.substring(d+1,r);
    receivedRegulatorTypeS=receivedData.substring(r+1,receivedData.length()-1);

    receivedSetpointInt=receivedSetpointS.toInt();
    receivedKpInt=receivedKpS.toInt();
    receivedKiInt=receivedKiS.toInt();
    receivedKdInt=receivedKdS.toInt();
    receivedRegulatorTypeInt=receivedRegulatorTypeS.toInt();

    /*Serial.println("przetworzonedane");
    Serial.println(receivedSetpointS);
    Serial.println(receivedKpS);
    Serial.println(receivedKiS);
    Serial.println(receivedKdS);
    Serial.println(receivedRegulatorTypeS);*/
    
    
    temperatureSetpoint=receivedSetpointInt;
    kp= receivedKpInt;
    ki=receivedKiInt;
    kd=receivedKdInt;
    regulatorType=receivedRegulatorTypeInt;
    
  }
  else {}
}

void bluetoothSend(){
  temperatureReading = TempRead();

  //Serial.print("I send: ");
  Serial.print("t");
  Serial.print(temperatureReading);
  Serial.print("s");
  Serial.print(temperatureSetpoint);
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
  //Serial.print(receivedData);
  Serial.println("/n");
  
  setLCD(temperatureSetpoint,temperatureReading,pwm);
}

void regulation(){
  pwm=PID(temperatureSetpoint, temperatureReading,millis(), kp , ki, kd); //  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2)
  Motor_Control(pwm);
}


void setup(void) {
  setLCD_start();
  Serial.begin(9600);
  //Serial1.begin(9600);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
  timer.setInterval(500,regulation);
  timer.setInterval(1000,bluetoothSend);
  timer.setInterval(2000,bluetoothReceive);
}

void loop(void) {
  timer.run();
  analogWrite(9, 255);
  analogWrite(10, 255);
  
}

  //Wykresy
  /*Serial.print(zadanaTemp);
  Serial.print("\t");
  Serial.print(temp);
  Serial.print("\t");
  Serial.print(pwm);
  Serial.println("");

  delay(1000);*/



