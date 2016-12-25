#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"
#include "SimpleTimer.h"

float temperatureSetpoint = 28;
SimpleTimer timer;
String odebraneDane;
String dTemp="000";
int Temp;
float temp;

void bluetoothReceive(){
  odebraneDane = Serial1.readStringUntil('\n');
  Serial.print("I received: ");
  Serial.println(odebraneDane);
  for(int i=1;i<odebraneDane.length()+1;i++)
  {
    dTemp[i-1]=odebraneDane[i];
  }
  Serial.println("przerobioneDane:");
  Serial.println(dTemp);                
  Temp=dTemp.toInt();
  Serial.println("w Incie:");
  Serial.println(Temp);
  temperatureSetpoint=Temp;
}

void bluetoothSend(){
  float temp = TempRead();
  Serial1.print("t");
  Serial1.print(temp);
  Serial1.print("s");
  Serial1.print(temperatureSetpoint);
  Serial1.println("0010/n");
  setLCD(temperatureSetpoint,temp);
}

void setup(void) {
  setLCD_start();
  Serial.begin(9600);
  Serial1.begin(9600);
  timer.setInterval(1000,bluetoothSend);
  timer.setInterval(3000,bluetoothReceive);
}

void loop(void) {
  timer.run();
  
  
  
  float pwm=PID(temperatureSetpoint, temp,millis(), 15 , 5, 2); //  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2)

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



