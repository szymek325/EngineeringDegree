#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"

float previousZadana=0;

void setup(void) {
  setLCD_start();
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);

  Serial.begin(9600);
}


void loop(void) {
  float zadanaTemp = 24;
  float temp = TempRead();
  setLCD(zadanaTemp,temp);

  int pwm=PID(zadanaTemp, temp, 40, 0.1, 0.1);
  int pwmKP=PID(zadanaTemp, temp, 40, 0, 0);
  Motor_Control(pwm);
  Fan(255);



  Serial.print(zadanaTemp);
  Serial.print("\t");
  Serial.print(temp);
  Serial.print("\t");
    Serial.print(pwm);
  Serial.println("");

  
  previousZadana=zadanaTemp;
  delay(1000);
  }








