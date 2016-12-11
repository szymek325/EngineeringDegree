#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"

void setup(void) {
  
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);

  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

  setLCD_start();
  Serial.begin(9600);
}


void loop(void) {
  float zadanaTemp = 23;
  float temp = TempRead();
  setLCD(zadanaTemp,temp);

  float pwm=PID(zadanaTemp, temp,millis(), 20 , 2, 3);
  Motor_Control(pwm); /////zmienione na POTRZEBY TESTU
  Fan(200);



  Serial.print(zadanaTemp);
  Serial.print("\t");
  Serial.print(temp);
  Serial.println("\t");
  //Serial.print(pwm);
  //Serial.println("");

  delay(1000);
  }








