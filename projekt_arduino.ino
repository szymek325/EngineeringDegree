#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"
#include "SimpleTimer.h"

float temperatureSetpoint = 24;
SimpleTimer timer;
String odebraneDane;
String dTemp="000";
int Temp;
float temp;
String lights="0000";
float pwm;
int odczyt;

void bluetoothReceive(){
  odebraneDane = Serial.readStringUntil('\n');
  //Serial.print("I received: ");
  //Serial.println(odebraneDane);
  if(odebraneDane.length()>=1)
  {
    for(int i=1;i<odebraneDane.length()+1;i++)
    {
      dTemp[i-1]=odebraneDane[i];
    }
    //Serial.print("przerobioneDane: ");
    //Serial.println(dTemp);                
    Temp=dTemp.toInt();
    //Serial.print("w Incie: ");
    //Serial.println(Temp);
    temperatureSetpoint=Temp;
  }
  else {}
}

void bluetoothSend(){
  temp = TempRead();

  /*Serial1.print("t");
  Serial1.print(temp);
  Serial1.print("s");
  Serial1.print(temperatureSetpoint);
  Serial1.print("p");
  Serial1.print(pwm);
  Serial1.print("l");
  Serial1.print(lights);  
  Serial1.println("/n");*/

  //Serial.print("I send: ");
  Serial.print("t");
  Serial.print(temp);
  Serial.print("s");
  Serial.print(temperatureSetpoint);
  Serial.print("p");
  Serial.print(pwm);
  Serial.print("l");
  Serial.print(lights);
  Serial.println("/n");
  
  setLCD(temperatureSetpoint,temp,pwm);
}

void regulation(){
  pwm=PID(temperatureSetpoint, temp,millis(), 30 , 5, 0); //  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2)
  Motor_Control(pwm);
  //Serial.print("PWM calculated: ");
  //Serial.println(pwm);
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
  
  //digitalWrite(12,LOW);
  //digitalWrite(13,HIGH);
  //analogWrite(11,255);
}



  //Motor_Control(pwm); /////zmienione na POTRZEBY TESTU
  //Fan(200);
  
  /*pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);

  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(14, INPUT);
  pinMode(15, INPUT);*/

  //Wykresy
  /*Serial.print(zadanaTemp);
  Serial.print("\t");
  Serial.print(temp);
  Serial.print("\t");
  Serial.print(pwm);
  Serial.println("");

  delay(1000);*/



