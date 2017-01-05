

angular.module('starter.services', [])

.service('receivedData', function() {
  // INITIAL VALUES
  var temperatureReceived;
  var setpointReceived;
  var pwmReceived;
  var kpReceived;
  var kiReceived;
  var kdReceived;
  var regulatorReceived;
  //var lightsReceived;
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
    getKp: function () {
      return kpReceived;
    },
    getKi: function () {
      return kiReceived;
    },
    getKd: function () {
      return kdReceived;
    },
    getRegulator: function () {
      return regulatorReceived;
    },
    //getlights: function () {
    //  return lightsReceived;
    //},
    getIsThereData: function () {
      return isThereData;
    },
    getData: function () {
      bluetoothSerial.readUntil("/n",function (data) {
        console.log(data);
        if(data.includes("t"))
        {
          if(data.includes("n"))
          {
            isThereData=1;

            temperatureReceived=data.substring(data.indexOf('t')+1, data.indexOf('s'));
            setpointReceived=data.substring(data.indexOf('s')+1, data.indexOf('p'));
            pwmReceived=data.substring(data.indexOf('p')+1, data.indexOf('k'));
            kpReceived=data.substring(data.indexOf('k')+1, data.indexOf('i'));
            kiReceived=data.substring(data.indexOf('i')+1, data.indexOf('d'));
            kdReceived=data.substring(data.indexOf('d')+1, data.indexOf('r'));
            regulatorReceived=data.substring(data.indexOf('r')+1, data.indexOf('/'));
            //lightsReceived=data.substring(data.indexOf('l')+1, data.indexOf('/'));

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