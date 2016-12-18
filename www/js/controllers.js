

document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {var myVar = setInterval($scope.receiveData(), 1000);}

angular.module('starter.controllers', [])



.controller('TempCtrl', function($scope) {
	var dataReceived="    ";
	var dataToSend;

	$scope.sendSetpoint= function(){
		//alert("Wysłano");
		dataToSend=document.getElementById("setpointData").value;
		console.log("Sending");
		bluetoothSerial.write("t"+dataToSend+"\n", console.log("Send"), console.log("Not Send"));
		//bluetoothSerial.readUntil('\n',$scope.currentSetpoint, console.log("dupa"));
		
	}
	$scope.receiveData= function(){
		//alert("Wysłano");
		console.log("Receiving");
		bluetoothSerial.readUntil("/n",function (data) {
			console.log(data);
			dataReceived=data.substring(1, 5);
			console.log(dataReceived);
			$scope.currentTemperature=dataReceived;
			console.log($scope.currentTemperature)
		},console.log());
		bluetoothSerial.clear(console.log(), console.log());
		//bluetoothSerial.readUntil('/n',function (data) {console.log(data); dataReceived=data}, console.log("nic nie otrzymalem"));
		//$scope.currentTemperature=dataReceived.substring(1, 5);
	}
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


	$scope.checkConnection=function(){
		bluetoothSerial.isConnected($scope.disButton(), $scope.conButton());
	};

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
		console.log('Checking ConnectButton state:');
		console.log(buttonConnect);

		if(buttonConnect){
			bluetoothSerial.connect('20:16:10:20:46:17', console.log('connecting'),console.log("connection not avaiable"));
			$timeout(function() { $scope.checkConnection()}, 3000);
		}
		else{
			bluetoothSerial.disconnect(console.log('disconencted'),console.log('can not disconnect'));
			$timeout(function() { $scope.checkConnection()}, 3000);
		};
	};


});
