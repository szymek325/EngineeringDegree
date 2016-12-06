#include "motor_driver.h"

//PELTIER OUT3=GROUND OUT4=VPP zeby sie zgadzalo
// Speed to PWM- do 255 max

void Motor_Control(int Speed)
{
  if(Speed>0)
  {
    Peltier_Heat(Speed);
  }
  else if(Speed<0)
  {
    Peltier_Cool(Speed);
  }
  else Peltier_Brake;
}


void Peltier_Cool(int Speed)
{
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, Speed);
}

void Peltier_Heat(int Speed)
{
  digitalWrite(IN3, LOW);
  digitalWrite(IN4,  HIGH);
  analogWrite(ENB, Speed);
}
void Peltier_Brake()
{
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void Fan(int Speed)
{
  analogWrite(ENA, Speed);
}




