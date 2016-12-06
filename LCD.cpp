#include <ShiftLCD.h>

ShiftLCD lcd(6,4,5);

void setLCD_start() {
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("P ");
  lcd.setCursor(7, 0);
  lcd.print("C ");
  lcd.setCursor(11, 0);
  lcd.print("TIME ");
  lcd.setCursor(0, 1);
  lcd.print("Z  ");
  lcd.setCursor(7, 1);
  lcd.print("C ");

  //lcd.print(millis()/1000);
}

void setLCD(float zadana, float temp){
  lcd.setCursor(2, 0);
  lcd.print(temp);
  lcd.setCursor(2, 1);
  lcd.print(zadana);
  int czas=(millis()/1000);
  if(czas<10)
  {
    lcd.setCursor(15, 1);
    lcd.print(czas);
  }
  else if(czas<60)
  {
    lcd.setCursor(14, 1);
    lcd.print(czas);
  }
  else
  {
    lcd.setCursor(11, 1);
    float wynik=czas/60;
    int minuty=wynik;
    int sekundy=czas % 60;
    if(minuty<10){
      lcd.print(0);
      lcd.print(minuty);
      lcd.print(":");
      if(sekundy<10)
      {
        lcd.print(0);
        lcd.print(sekundy);        
      }
      else
      lcd.print(sekundy);
    }
    else{
      lcd.print(minuty);
      lcd.print(":");
      if(sekundy<10)
      {
        lcd.print(0);
        lcd.print(sekundy);        
      }
      else
      lcd.print(sekundy);
    }
    
    //lcd.print(minuty);
    //lcd.print(":");
    //lcd.print(sekundy);
  }



  //lcd.print(millis()/1000);
}





