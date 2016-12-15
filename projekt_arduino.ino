#include "LCD.h"
#include "temperatura.h"
#include "motor_driver.h"
#include "regulator.h"

float zadanaTemp = 25;

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
  pinMode(14, INPUT);
  pinMode(15, INPUT);

  setLCD_start();
  Serial.begin(9600);
}


void loop(void) {

  float temp = TempRead();
  setLCD(zadanaTemp,temp);

  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2); //  float pwm=PID(zadanaTemp, temp,millis(), 15 , 5, 2)
  Motor_Control(pwm); /////zmienione na POTRZEBY TESTU
  Fan(200);



  Serial.print(zadanaTemp);
  Serial.print("\t");
  Serial.print(temp);
  Serial.print("\t");
  Serial.print(pwm);
  Serial.println("");

  delay(1000);
  }








