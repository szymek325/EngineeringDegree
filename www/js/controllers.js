

angular.module('starter.controllers', [])


.controller('TempCtrl', function($scope, $interval) {
	$scope.currentSetpoint="value";
	$scope.currentTemperature="value"
	$scope.newSetpoint=22;
	receiveButton=true;
	$scope.type='button button-block button-positive';
	$scope.startStop="Start"
	//$interval(receiveData, 5000); 
	var interval1;

	var dataReceived="    ";
	var dataToSend;

	$scope.sendSetpoint= function(){
		//alert("Wysłano");
		dataToSend=$scope.newSetpoint;
		bluetoothSerial.write("t"+dataToSend+"\n", function (data){
			console.log("Sending process was"+data+". This: "+dataToSend+" was send");
		}, function (data){
			console.log("Nothing was send");
		});
		//bluetoothSerial.readUntil('\n',$scope.currentSetpoint, console.log("dupa"));
		
	}


	$scope.receiveButton= function(){
		if(receiveButton)
		{
			console.log("Receiving process started");
			interval1=$interval(receiveData, 5000);
			receiveButton=!receiveButton;
			$scope.type='button button-block button-assertive';
			$scope.startStop="Stop"
		}
		else{
			console.log("Receiving process has been terminated");
			$interval.cancel(interval1);
			receiveButton=!receiveButton;
			$scope.type='button button-block button-positive';
			$scope.startStop="Start"
		}
		
	}

	$scope.Add= function(){
		$scope.newSetpoint=$scope.newSetpoint+1;
	}

	$scope.Substract= function(){
		$scope.newSetpoint=$scope.newSetpoint-1;
	}


	function receiveData(){
		console.log("Receiving");
		bluetoothSerial.readUntil("/n",function (data) {
			console.log("Raw data received: "+data);
			dataReceived=data.substring(1, 5);
			//console.log("Temperature data: "+dataReceived);
			$scope.currentTemperature = dataReceived
			console.log("Temperature data: "+$scope.currentTemperature);
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

.controller('BlueCtrl', function($scope, $timeout) {

	$scope.addresses = [];
	$scope.textConnect='Connect';
	$scope.typeConnect='button button-block button-calm';
	buttonConnect=true;

	bluetoothSerial.isEnabled(function (){
		console.log("Bluetooth is ON")},function (){
			console.log("Bluetooth is OFF. Please ENABLE");
			bluetoothSerial.enable(function (){
				console.log("Bluetooth was ENABLED")},function (){
					console.log("Bluetooth wasn't ENABLED");
					console.log("Application is closing now");
					navigator.app.exitApp();
				})
		});


	$scope.checkConnection=function(){
		bluetoothSerial.isConnected($scope.disButton(), $scope.conButton());
	};

	$scope.disButton=function(){
		console.log("You are connected to device");
		$scope.textConnect = 'Disconnect';
		$scope.typeConnect='button button-block button-assertive';
		buttonConnect=!buttonConnect;
	};

	$scope.conButton=function(){
		console.log("You are not connected");
		$scope.textConnect = 'Connect';
		$scope.typeConnect='button button-block button-calm';
		buttonConnect=!buttonConnect;
	};


	$scope.findDevices = function(){
		bluetoothSerial.list(function (data) {
			console.log("List: ");
			console.log(data);
			$scope.$apply(function () {
				$scope.pairedDevices=data})},function () {
				console.log("No devices found");
			//$scope.addresses.push(data);
			//$scope.addresses.push(data);
		});
		bluetoothSerial.discoverUnpaired(function (data) {
			console.log("Discover Unpaired: ");
			console.log(data);
			$scope.$apply(function () {
				$scope.discoveredDevices=data})},function () {
				console.log("No devices found");
			//$scope.addresses.push(data);
			//$scope.addresses.push(data);
		});
	};

	$scope.connectMac = function(data){
		console.log(data);
		//console.log('ConnectButton state is: '+buttonConnect);
		if(buttonConnect){
			bluetoothSerial.connect(data.address, function (){
				console.log("You have been connected to device:"); alert("You have been connected")},function (){
					console.log("Connection wasn't possible");alert("Connection wasn't possible")
				});
			//$timeout(function() { $scope.checkConnection()}, 3000);
		}
		else{
			bluetoothSerial.disconnect(console.log('disconencted'),console.log('can not disconnect'));
			//$timeout(function() { $scope.checkConnection()}, 3000);
		};
	};


})

.controller("ExampleController", function($scope) {

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Average Spent Effort', 'Average Estimated Effort', 'Average Remainning Effort'];
	$scope.data = [
	[65, 59, 80, 81, 56, 55, 40],
	[28, 48, 40, 19, 86, 27, 90],
	[18, 38, 40, 49, 81, 43, 77]
	];

	$scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];


     
});