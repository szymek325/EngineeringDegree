EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:freetronics_schematic
LIBS:L293D
LIBS:DFRobotMotorDriver
LIBS:HC-06
LIBS:dcmotor
LIBS:DS18B20
LIBS:PeltierCell
LIBS:schemat-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L LCD16X2 DS?
U 1 1 58812F74
P 6650 6000
F 0 "DS?" H 5850 6400 50  0000 C CNN
F 1 "LCD16X2" H 7350 6400 50  0000 C CNN
F 2 "WC1602A" H 6650 5950 50  0000 C CIN
F 3 "" H 6650 6000 50  0000 C CNN
	1    6650 6000
	1    0    0    1   
$EndComp
$Comp
L ARDUINO_UNO SHIELD?
U 1 1 588136B5
P 4000 3850
F 0 "SHIELD?" H 3550 5000 60  0001 C CNN
F 1 "ARDUINO_UNO" H 4050 2900 60  0000 C CNN
F 2 "ARDUINO UNO" H 4000 3650 50  0001 C CNN
F 3 "" H 4000 3850 60  0000 C CNN
	1    4000 3850
	1    0    0    -1  
$EndComp
$Comp
L L293D U?
U 1 1 58814048
P 6800 2550
F 0 "U?" H 7250 1900 60  0001 C CNN
F 1 "L293D" H 6950 2700 60  0000 C CNN
F 2 "" H 6950 2700 60  0001 C CNN
F 3 "" H 6950 2700 60  0001 C CNN
	1    6800 2550
	1    0    0    -1  
$EndComp
$Comp
L DFRobotMotorDriver U?
U 1 1 58814ED6
P 3550 1900
F 0 "U?" H 4200 1150 60  0001 C CNN
F 1 "DFRobotMotorDriver" H 4050 1800 60  0000 C CNN
F 2 "" H 3400 1250 60  0001 C CNN
F 3 "" H 3400 1250 60  0001 C CNN
	1    3550 1900
	1    0    0    -1  
$EndComp
$Comp
L DCMotor U?
U 1 1 588150C9
P 6050 2600
F 0 "U?" H 6550 1950 60  0001 C CNN
F 1 "DCMotor" H 6250 3000 60  0000 C CNN
F 2 "" H 7050 2100 60  0001 C CNN
F 3 "" H 7050 2100 60  0001 C CNN
	1    6050 2600
	0    -1   -1   0   
$EndComp
$Comp
L Peltier_Element PE?
U 1 1 588150DF
P 5400 1400
F 0 "PE?" H 5400 1525 50  0000 C CNN
F 1 "Peltier_Element" H 5400 1350 50  0000 C CNN
F 2 "" H 5400 1330 50  0000 C CNN
F 3 "" V 5400 1425 50  0000 C CNN
	1    5400 1400
	-1   0    0    1   
$EndComp
$Comp
L PowerSupply U?
U 1 1 58815670
P 2000 3450
F 0 "U?" H 2450 2800 60  0001 C CNN
F 1 "PowerSupply" H 1600 4050 60  0000 C CNN
F 2 "" H 2150 3600 60  0001 C CNN
F 3 "" H 2150 3600 60  0001 C CNN
	1    2000 3450
	1    0    0    -1  
$EndComp
Text GLabel 2900 3600 0    60   Input ~ 0
5V
Text GLabel 2900 3750 0    60   Input ~ 0
GND
Text GLabel 2050 3400 3    60   Input ~ 0
12V2
Text GLabel 1550 3400 3    60   Input ~ 0
12V1
Text GLabel 1750 3400 3    60   Input ~ 0
GND
Text GLabel 2250 3400 3    60   Input ~ 0
GND
Text GLabel 5800 5450 0    60   Input ~ 0
GND
Text GLabel 5800 5300 0    60   Input ~ 0
5V
$Comp
L R_Variable R?
U 1 1 58815DD9
P 5600 5050
F 0 "R?" V 5700 4950 50  0000 L CNN
F 1 "R_Variable" V 5500 5000 50  0000 L CNN
F 2 "" V 5530 5050 50  0000 C CNN
F 3 "" H 5600 5050 50  0000 C CNN
	1    5600 5050
	0    1    1    0   
$EndComp
Text GLabel 5350 5050 0    60   Input ~ 0
5V
Text GLabel 5850 5050 2    60   Input ~ 0
GND
Text GLabel 6300 5350 1    60   Input ~ 0
GND
Text GLabel 7300 5300 1    60   Input ~ 0
5V
Text GLabel 7450 5350 1    60   Input ~ 0
GND
Text GLabel 4500 5300 1    60   Input ~ 0
GND
Text GLabel 4400 5500 1    60   Input ~ 0
5V
Wire Wire Line
	4400 5500 4400 5750
Wire Wire Line
	4500 5300 4500 5750
Wire Wire Line
	4950 4850 4950 4650
Wire Wire Line
	4700 4850 4950 4850
Wire Wire Line
	4700 4850 4700 5750
Wire Wire Line
	5150 4550 4950 4550
Wire Wire Line
	5150 4800 5150 4550
Wire Wire Line
	4600 4800 5150 4800
Wire Wire Line
	4600 4800 4600 5750
Wire Wire Line
	6200 4450 4950 4450
Wire Wire Line
	6400 4350 4950 4350
Wire Wire Line
	7450 5500 7400 5500
Wire Wire Line
	7450 5350 7450 5500
Wire Wire Line
	7300 5300 7300 5500
Wire Wire Line
	4950 3950 7200 3950
Wire Wire Line
	7200 3950 7200 5500
Wire Wire Line
	4950 4050 7100 4050
Wire Wire Line
	7100 4050 7100 5500
Wire Wire Line
	4950 4150 7000 4150
Wire Wire Line
	7000 4150 7000 5500
Wire Wire Line
	4950 4250 6900 4250
Wire Wire Line
	6900 4250 6900 5500
Wire Wire Line
	6300 5500 6300 5350
Wire Wire Line
	6400 4350 6400 5500
Wire Wire Line
	6200 4450 6200 5500
Wire Wire Line
	6100 5150 6100 5500
Wire Wire Line
	5700 5150 6100 5150
Wire Wire Line
	6000 5300 5800 5300
Wire Wire Line
	5450 5050 5350 5050
Wire Wire Line
	5750 5050 5850 5050
Wire Wire Line
	6000 5300 6000 5500
Wire Wire Line
	5800 5500 5900 5500
Wire Wire Line
	5800 5450 5800 5500
Wire Wire Line
	3050 3750 2900 3750
Wire Wire Line
	3050 3600 3050 3650
Wire Wire Line
	2900 3600 3050 3600
Wire Wire Line
	1250 3850 3050 3850
Wire Wire Line
	1250 3400 1250 3850
Wire Wire Line
	1050 3950 3050 3950
Wire Wire Line
	1050 3400 1050 3950
$Comp
L DS18B20 U?
U 1 1 588173AC
P 8450 4700
F 0 "U?" H 8950 4050 60  0001 C CNN
F 1 "DS18B20" H 9050 4700 60  0000 C CNN
F 2 "" H 9450 4200 60  0001 C CNN
F 3 "" H 9450 4200 60  0001 C CNN
	1    8450 4700
	-1   0    0    1   
$EndComp
Wire Wire Line
	4950 3750 7850 3750
Wire Wire Line
	7850 3750 7850 4200
Text GLabel 8050 4100 1    60   Input ~ 0
GND
Wire Wire Line
	8050 4200 8050 4100
Text GLabel 7400 3900 0    60   Input ~ 0
5V
$Comp
L R R?
U 1 1 588179AA
P 7650 3900
F 0 "R?" V 7730 3900 50  0000 C CNN
F 1 "4K7" V 7650 3900 50  0000 C CNN
F 2 "" V 7580 3900 50  0000 C CNN
F 3 "" H 7650 3900 50  0000 C CNN
	1    7650 3900
	0    1    1    0   
$EndComp
Wire Wire Line
	7800 3900 7850 3900
Connection ~ 7850 3900
Wire Wire Line
	7500 3900 7400 3900
Wire Wire Line
	7650 4200 7650 4050
Wire Wire Line
	7650 4050 7450 4050
Wire Wire Line
	7450 4050 7450 3900
Connection ~ 7450 3900
Text GLabel 3050 2350 0    60   Input ~ 0
12V1
Text GLabel 3250 2450 0    60   Input ~ 0
GND
Wire Wire Line
	3050 2350 3300 2350
Wire Wire Line
	3250 2450 3300 2450
Wire Wire Line
	3300 2250 3250 2250
Text GLabel 3250 2250 0    60   Input ~ 0
5V
Text GLabel 3250 1900 0    60   Input ~ 0
PWM1
Wire Wire Line
	3300 1900 3250 1900
Text GLabel 4950 3450 2    60   Input ~ 0
PWM1
Text GLabel 5250 3350 2    60   Input ~ 0
IN4
Text GLabel 5050 3250 2    60   Input ~ 0
IN3
Wire Wire Line
	4950 3350 5250 3350
Wire Wire Line
	4950 3250 5050 3250
Wire Wire Line
	3300 2000 2950 2000
Text GLabel 2950 2000 0    60   Input ~ 0
IN4
Text GLabel 3150 2100 0    60   Input ~ 0
IN3
Wire Wire Line
	3300 2100 3150 2100
Wire Wire Line
	4750 1650 5200 1650
Wire Wire Line
	5200 1650 5200 1400
Wire Wire Line
	5600 1400 5600 1850
Wire Wire Line
	5600 1850 4750 1850
Text GLabel 6350 1850 0    60   Input ~ 0
5V
Text GLabel 6350 2900 0    60   Input ~ 0
GND
Text GLabel 7600 1850 2    60   Input ~ 0
GND
Text GLabel 7600 2900 2    60   Input ~ 0
5V
Wire Wire Line
	7600 1850 7500 1850
Wire Wire Line
	6350 1850 6450 1850
Wire Wire Line
	6350 2900 6450 2900
Wire Wire Line
	7600 2900 7500 2900
Text GLabel 5300 3550 2    60   Input ~ 0
PWM2
Wire Wire Line
	4950 3550 5300 3550
Text GLabel 5000 3650 2    60   Input ~ 0
PWM3
Wire Wire Line
	4950 3650 5000 3650
Text GLabel 7550 3150 2    60   Input ~ 0
PWM3
Wire Wire Line
	7500 3150 7550 3150
Text GLabel 6350 3150 0    60   Input ~ 0
12V2
Text GLabel 7600 1650 2    60   Input ~ 0
5V
Wire Wire Line
	7600 1650 7500 1650
Wire Wire Line
	6350 3150 6450 3150
Text GLabel 6350 1650 0    60   Input ~ 0
PWM2
Wire Wire Line
	6350 1650 6450 1650
$Comp
L DCMotor U?
U 1 1 58816A79
P 7950 2150
F 0 "U?" H 8450 1500 60  0001 C CNN
F 1 "DCMotor" H 8150 2550 60  0000 C CNN
F 2 "" H 8950 1650 60  0001 C CNN
F 3 "" H 8950 1650 60  0001 C CNN
	1    7950 2150
	0    1    1    0   
$EndComp
Wire Wire Line
	6450 2050 6200 2050
Wire Wire Line
	6200 2050 6200 2250
Wire Wire Line
	6200 2250 6050 2250
Wire Wire Line
	6450 2650 6200 2650
Wire Wire Line
	6200 2650 6200 2550
Wire Wire Line
	6200 2550 6050 2550
Wire Wire Line
	7500 2650 7800 2650
Wire Wire Line
	7800 2650 7800 2500
Wire Wire Line
	7800 2500 7950 2500
Wire Wire Line
	7950 2200 7800 2200
Wire Wire Line
	7800 2200 7800 2050
Wire Wire Line
	7800 2050 7500 2050
$Comp
L HC-06 U?
U 1 1 58819DAB
P 2100 3550
F 0 "U?" H 1250 3950 60  0001 C CNN
F 1 "HC-06" H -350 6200 60  0000 C CNN
F 2 "" H 1900 3500 60  0001 C CNN
F 3 "" H 1900 3500 60  0001 C CNN
	1    2100 3550
	-1   0    0    1   
$EndComp
$EndSCHEMATC
