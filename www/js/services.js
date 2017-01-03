

angular.module('starter.services', [])

.service('receivedData', function() {
  // INITIAL VALUES
  var temperatureReceived;
  var setpointReceived;
  var pwmReceived;
  var lightsReceived;
  var isThereData;

  return {
    getTemperature: function () {
      return temperatureReceived;
    },
    getSetpoint: function () {
      return setpointReceived;
    },
    getPwm: function () {
      return pwmReceived;
    },
    getlights: function () {
      return lightsReceived;
    },
    getIsThereData: function () {
      return isThereData;
    },
    getData: function () {
      bluetoothSerial.readUntil("/n",function (data) {
        if(data.includes("t"))
        {
          if(data.includes("n"))
          {
            isThereData=1;

            temperatureReceived=data.substring(data.indexOf('t')+1, data.indexOf('s'));
            setpointReceived=data.substring(data.indexOf('s')+1, data.indexOf('p'));
            pwmReceived=data.substring(data.indexOf('p')+1, data.indexOf('l'));
            lightsReceived=data.substring(data.indexOf('l')+1, data.indexOf('/'));

            bluetoothSerial.clear(console.log(),console.log());
          }
          else{
            isThereData=0;
          }
        }
        else{
          isThereData=0;
          bluetoothSerial.clear(console.log(),console.log())
        }
      },function () {console.log("failure")});
    }
  }
})

.service('bluetoothInformation', function() {
  // INITIAL VALUES
  var temperatureReceived;
  var bluetoothOnOffStatus;
  var bluetoothConnectionStatus;

  return {
    isBluetoothON: function () {
      bluetoothSerial.isEnabled(function (){
        console.log("Bluetooth is ON"), bluetoothOnOffStatus=1;},function (){
          console.log("Bluetooth is OFF. Please ENABLE");
          bluetoothOnOffStatus=0;
          bluetoothSerial.enable(function (){
            console.log("Bluetooth was ENABLED"); bluetoothOnOffStatus=1},function (){
              console.log("Bluetooth wasn't ENABLED");
              console.log("Application is closing now");
              bluetoothOnOffStatus=0;
              navigator.app.exitApp();
            })
        })
      return bluetoothOnOffStatus;
    },
    connectionState: function () {
      bluetoothSerial.isConnected(function(){bluetoothConnectionStatus=1}, function(){bluetoothConnectionStatus=0});

      return bluetoothConnectionStatus;
    }
  }
});