

angular.module('starter.controllers', [])



.controller('TempCtrl', function($scope) {

  $scope.ConfirmTemp= function(){
    alert("String");
  };

})

.controller('LightCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.textAll='ON';
  $scope.typeAll='button button-block button-positive';
  buttonBoolAll=false;

  $scope.text1='ON';
  $scope.type1='button button-positive';
  buttonBool1=false;

  $scope.text2='ON';
  $scope.type2='button button-positive';
  buttonBool2=false;

  $scope.text3='ON';
  $scope.type3='button button-positive';
  buttonBool3=false;

  $scope.text4='ON';
  $scope.type4='button button-positive';
  buttonBool4=false;


  $scope.ClickAll = function(){
    buttonBool1=buttonBoolAll;
    $scope.Click1();
    buttonBool2=buttonBoolAll;
    $scope.Click2();
    buttonBool3=buttonBoolAll;
    $scope.Click3();
    buttonBool4=buttonBoolAll;
    $scope.Click4();
    buttonBoolAll=!buttonBoolAll;
    console.log(buttonBoolAll);
    if(buttonBoolAll){
      $scope.textAll = 'OFF';
      $scope.typeAll='button button-block button-assertive';
    }
    else{
      $scope.textAll='ON';
      $scope.typeAll='button button-block button-positive';
    };
  };

  $scope.Click1 = function(){
    buttonBool1=!buttonBool1;
    console.log(buttonBool1);
    if(buttonBool1){
      $scope.text1 = 'OFF';
      $scope.type1='button button-assertive';
    }
    else{
      $scope.text1='ON';
      $scope.type1='button button-positive';
    };
  };

  $scope.Click2 = function(){
    buttonBool2=!buttonBool2;
    console.log(buttonBool2);
    if(buttonBool2){
      $scope.text2 = 'OFF';
      $scope.type2='button button-assertive';
    }
    else{
      $scope.text2='ON';
      $scope.type2='button button-positive';
    };
  };

  $scope.Click3 = function(){
    buttonBool3=!buttonBool3;
    console.log(buttonBool3);
    if(buttonBool3){
      $scope.text3 = 'OFF';
      $scope.type3='button button-assertive';
    }
    else{
      $scope.text3='ON';
      $scope.type3='button button-positive';
    };
  };

  $scope.Click4 = function(){
    buttonBool4=!buttonBool4;
    console.log(buttonBool4);
    if(buttonBool4){
      $scope.text4 = 'OFF';
      $scope.type4='button button-assertive';
    }
    else{
      $scope.text4='ON';
      $scope.type4='button button-positive';
    };
  };

})


.controller('BlueCtrl', function($scope) {

  $scope.textConnect='Connect';
  $scope.typeConnect='button button-block button-positive';
  buttonConnect=true;

  bluetoothSerial.isEnabled(console.log(1), bluetoothSerial.enable(console.log(1), console.log(0)));


  $scope.disButton=function(){
    $scope.textConnect = 'Disconnect';
    $scope.typeConnect='button button-block button-assertive';
    buttonConnect=!buttonConnect;
  };

  $scope.conButton=function(){
    $scope.textConnect = 'Connect';
    $scope.typeConnect='button button-block button-positive';
    buttonConnect=!buttonConnect;
  };

  $scope.connectMac = function(){

    console.log(buttonConnect);
    if(buttonConnect){
      bluetoothSerial.connect('20:16:10:20:46:17', $scope.disButton(),console.log(0));
    }
    else{
      bluetoothSerial.disconnect($scope.conButton(),console.log(0));
    };
  };


});
