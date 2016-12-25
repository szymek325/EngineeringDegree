#include "Arduino.h"
#include "motor_driver.h"


//PELTIER OUT3=GROUND OUT4=VPP zeby sie zgadzalo
// Speed to PWM- do 255 max

int pred_zadana=0;

void Motor_Control(int Speed)
{
  if(Speed>0)
  {
    pred_zadana=absF(Speed);
    Peltier_Heat(Speed);
  }
  else if(Speed<0)
  {
    pred_zadana=absF(Speed);
    Peltier_Cool(Speed);
  }
  else Peltier_Brake;
}


void Peltier_Cool(int Speed)
{
  digitalWrite(IN2, HIGH);
  digitalWrite(IN1, LOW);
  analogWrite(ENA, Speed);
}

void Peltier_Heat(int Speed)
{
  digitalWrite(IN2, LOW);
  digitalWrite(IN1,  HIGH);
  analogWrite(ENA, Speed);
}
void Peltier_Brake()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
}

void Fan(int Speed)
{
  analogWrite(ENB, Speed);
}

float absF(float value)
{
  if(value<0)
  {
    value=value*(-1);
  }

  return value;
}



