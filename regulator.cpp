#include "regulator.h"

float output=0;
float derivative=0;
float integral=0;
float error=0;
//float epsilon=0.6;
//float dt=0.01;

float pre_error=0;

float maximum=255;
float minimum=-255;

float PID(float setpoint, float currentT, float kp, float ki, float kd){
  error=setpoint-currentT;
  derivative=error-pre_error;
  integral= integral+error;
  
  output= kp*error+ki*integral+kd*derivative;

  if(output>255)
  {
    output=maximum;
  }
  else if( output<-255)
  {
    output=minimum;
  }

  pre_error=error;

  return output;
}

float absF(float value)
{
  if(value<0)
  {
    value=value*(-1);
  }

  return value;
}




