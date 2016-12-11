#include "Arduino.h"

//PELTIER
const int IN2 = 6;
const int IN1 = 7;
const int ENA = 5;
const int ENB = 3;

void Motor_Control(int Speed);

void Peltier_Cool(int Speed);

void Peltier_Heat(int Speed);

void Peltier_Brake();

void Fan(int Speed);

float absF(float value);



