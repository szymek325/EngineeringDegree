

angular.module('starter.controllers', [])

.controller('TempCtrl', function($scope, $interval) {
	$scope.currentSetpoint="value";
	$scope.currentTemperature="value"
	$scope.pwmSignal="value"
	receiveButton=true;
	$scope.type='button button-block button-positive';
	$scope.startStop="Start"
	//$interval(receiveData, 5000); 
	var interval1;
	var dataReceived="    ";
	var dataToSend;

	var timeX=0;
	//var maxX=0;
	//var minX=0;
	//var forLabels=22;

	$scope.labels = [20];
	$scope.series = ['Actual Temperature'];
	$scope.data=[[20],[20]];
	$scope.colors = ['#ff6384','#ff6384'];

	$scope.receiveButton= function(){
		if(receiveButton)
		{
			console.log("Receiving process started");
			interval1=$interval(receiveData, 1000);
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

	function receiveData(){
		console.log("Receiving");
		bluetoothSerial.readUntil("/n",function (data) {
			console.log("Raw data received: "+data);
			if(data.length<12){

			}
			else{

				var temperatureReceived=data.substring(data.indexOf('t')+1, data.indexOf('s'));
				//temperatureReceived=data.substring(1, 6);
				//setpointReceived=data.substring(7, 12);
				console.log(temperatureReceived.length+2);
				var setpointReceived=data.substring(data.indexOf('s')+1, data.indexOf('p'));
				console.log(setpointReceived);
				var pwmReceived=data.substring(data.indexOf('p')+1, data.indexOf('l'));
				var lightsReceived=data.substring(data.indexOf('l')+1, data.indexOf('/'));
				$scope.currentTemperature = temperatureReceived;
				$scope.currentSetpoint = setpointReceived;
				$scope.pwmSignal=pwmReceived;
			}

			//forLabels=parseInt(setpointReceived);
			//console.log(forLabels);
			//maxX=forLabels+3;
			//minX=forLabels-3;
			//console.log(maxX);
			//console.log("Temperature data: "+dataReceived);



			console.log("Temperature data: "+$scope.currentTemperature);
			timeX=timeX+0.03;
			$scope.labels.push(timeX);
			$scope.data[0].push($scope.currentTemperature);
			$scope.data[1].push($scope.currentSetpoint);
			//console.log($scope.labels)
		},console.log());
		bluetoothSerial.clear(console.log(), console.log());


		//bluetoothSerial.readUntil('/n',function (data) {console.log(data); dataReceived=data}, console.log("nic nie otrzymalem"));
		//$scope.currentTemperature=dataReceived.substring(1, 5);
	}

	$scope.resetChart= function(){
		$scope.data=[[$scope.currentTemperature],[$scope.currentSetpoint]];
		$scope.labels=[0];
	}

	$scope.options = {
		animation:false,
		scales: {
			yAxes: [
			{
				id: 'y-axis-1',
				type: 'linear',
				display: true,
				position: 'left',
			}],
			xAxes: [{
				//type: 'time',
				ticks: {
					autoSkip:true,
					maxTicksLimit:20,
				//afterTickToLabelConversion: function(data){
				//	var xLabels = data.ticks;
				//	xLabels.forEach(function (labels, i) {
				//		if (i % 2 == 1){
				//			xLabels[i] = '';
				//		}
				//	});
				} 
			}],	
		},
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
	$scope.newSetpoint=22;


	$scope.textAll='ON';
	$scope.typeAll='button button-block button-positive';
	buttonBoolAll=false;

	$scope.text1='ON';
	$scope.type1='button button-block button-positive';
	buttonBool1=false;

	$scope.text2='ON';
	$scope.type2='button button-block button-positive';
	buttonBool2=false;

	$scope.text3='ON';
	$scope.type3='button button-block button-positive';
	buttonBool3=false;

	$scope.text4='ON';
	$scope.type4='button button-block button-positive';
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
			$scope.type1='button button-block button-assertive';
		}
		else{
			$scope.text1='ON';
			$scope.type1='button button-block button-positive';
		};
	};

	$scope.Click2 = function(){
		buttonBool2=!buttonBool2;
		console.log(buttonBool2);
		if(buttonBool2){
			$scope.text2 = 'OFF';
			$scope.type2='button button-block button-assertive';
		}
		else{
			$scope.text2='ON';
			$scope.type2='button button-block button-positive';
		};
	};

	$scope.Click3 = function(){
		buttonBool3=!buttonBool3;
		console.log(buttonBool3);
		if(buttonBool3){
			$scope.text3 = 'OFF';
			$scope.type3='button button-block button-assertive';
		}
		else{
			$scope.text3='ON';
			$scope.type3='button button-block button-positive';
		};
	};

	$scope.Click4 = function(){
		buttonBool4=!buttonBool4;
		console.log(buttonBool4);
		if(buttonBool4){
			$scope.text4 = 'OFF';
			$scope.type4='button button-block button-assertive';
		}
		else{
			$scope.text4='ON';
			$scope.type4='button button-block button-positive';
		};
	};

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

	$scope.Add= function(){
		$scope.newSetpoint=$scope.newSetpoint+1;
	}

	$scope.Substract= function(){
		$scope.newSetpoint=$scope.newSetpoint-1;
	}

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
		bluetoothSerial.isConnected(function(data){console.log("Connection is: "+data),$scope.$apply(function () {$scope.disButton()})}, function(){$scope.$apply(function () {$scope.conButton()})});
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
		//console.log(data);
		//console.log('ConnectButton state is: '+buttonConnect);
		if(buttonConnect){
			bluetoothSerial.connect(data.address, function (){
				console.log("You have been connected to device:"); alert("You have been connected"); $scope.checkConnection()}, function (){
					console.log("Connection wasn't possible");alert("Connection wasn't possible")
				});
			//$timeout(function() { $scope.checkConnection()}, 3000);
		}
		else{
			bluetoothSerial.disconnect(function (){
				console.log("You have been disconnected"); alert("You have been disconnected"); $scope.checkConnection()}, function (){
					console.log("Disconnection wasn't possible");alert("Disconnection wasn't possible")
				});
			//$timeout(function() { $scope.checkConnection()}, 3000);
		};
	};


})

.controller("ExampleController", function($scope) {

	



});