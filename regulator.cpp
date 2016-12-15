#include "regulator.h"

float output=0;
float derivative=0;
float integral=0;
float error=0;
float previousTime=0;
float previousError=0;
float dt=0;
//float epsilon=0.6;


float maximum=255;
float minimum=-255;

float PID(float setpointTemperature, float currentTemperature,float actualTime, float kp, float ki, float kd){
  error=setpointTemperature-currentTemperature;
  
  dt=(float)(actualTime-previousTime);
  dt=dt/60000; //skalowanie 1 milisekunda = 1/60000 min
  integral= integral+(error*dt);
  if(integral>20){
    integral=20;
  }
  else if(integral<-20){
    integral=-20;
  }
  derivative=(error-previousError)/dt;
  
  output= kp*error+ki*integral+kd*derivative;
  previousError=error;
  previousTime=actualTime;
  
  if(output>maximum)
  {
    output=maximum;
  }
  else if( output<minimum)
  {
    output=minimum;
  }

  return output;
}





