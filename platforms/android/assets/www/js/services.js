

angular.module('starter.services', [])

.service('receivedData', function() {

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
});
