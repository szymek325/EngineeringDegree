angular.module('starter.controllers', [])

.controller('TempCtrl', function($scope, $interval, $ionicModal, receivedData, bluetoothInformation) {
	// INITIAL VALUES
	$scope.currentSetpoint="value";
	$scope.currentTemperature="value"
	$scope.pwmSignal="value"
	$scope.type='button button-block button-positive';
	$scope.startStop="Start";
	$scope.labels = [0];
	$scope.series = ['Actual Temperature'];
	$scope.data=[[20],[20]];
	$scope.colors = ['#ff6384','#ff6384'];
	
	var logs=[0];	
	receiveButton=true;
	var interval1=$interval(receiveData, 1000);
	var timeX=0;
	
	function receiveData(){
		receivedData.getData();
		if(receivedData.getIsThereData())
		{
			$scope.currentTemperature = receivedData.getTemperature();
			$scope.currentSetpoint = receivedData.getSetpoint();
			$scope.pwmSignal=receivedData.getPwm();

			timeX=timeX+1;

			$scope.labels.push(timeX);
			$scope.data[0].push($scope.currentTemperature);
			$scope.data[1].push($scope.currentSetpoint);

			logs.push($scope.currentTemperature);
			$scope.tempData=JSON.stringify(logs);
		}
	}

	$scope.resetChart= function(){
		$scope.data=[[$scope.currentTemperature],[$scope.currentSetpoint]];
		$scope.labels=[timeX];
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
					maxTicksLimit:5,
				} 
			}],	
		},
	}

	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope}).then(function(modal) {
			$scope.modal = modal;
		})

	})

.controller('LightCtrl', function($scope) {
	// INITIAL VALUES
	$scope.newSetpoint=22;

	$scope.sendSetpoint= function(){
		dataToSend=$scope.newSetpoint;
		bluetoothSerial.write("t"+dataToSend+"\n", function (data){
			console.log("Sending process was"+data+". This: "+dataToSend+" was send");}, function (data){
				console.log("Nothing was send");});
	}

	$scope.Add= function(){
		$scope.newSetpoint=$scope.newSetpoint+1;
	}

	$scope.Substract= function(){
		$scope.newSetpoint=$scope.newSetpoint-1;
	}

	$scope.Add2= function(){
		$scope.newSetpoint=$scope.newSetpoint+2;
	}

	$scope.Substract2= function(){
		$scope.newSetpoint=$scope.newSetpoint-2;
	}

})

.controller('BlueCtrl', function($scope, $timeout, $interval, $ionicLoading, bluetoothInformation) {
	// INITIAL VALUES
	$scope.addresses = [];
	$scope.textConnect='Connect';
	$scope.typeConnect='button button-block button-calm';

	//bluetoothInformation.isBluetoothON();

	$scope.checkConnection=function(){
		if(!bluetoothInformation.connectionState()){
			$scope.$apply(function () {
				console.log("You are connected to device");
				$scope.textConnect = 'Disconnect';
				$scope.typeConnect='button button-block button-assertive';
			})
		}
		else{
			$scope.$apply(function () {
				console.log("You are not connected");
				$scope.textConnect = 'Connect';
				$scope.typeConnect='button button-block button-calm';
			})
		}
	}

	$scope.findDevices = function(){
		if(bluetoothInformation.isBluetoothON())
		{
			$ionicLoading.show();
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
					$scope.discoveredDevices=data});$ionicLoading.hide();},function () {
					console.log("No devices found");
					$ionicLoading.hide();
			//$scope.addresses.push(data);
			//$scope.addresses.push(data);
			});
		}	
	}

	$scope.connectMac = function(data){
		if(!bluetoothInformation.connectionState()){
			bluetoothSerial.connect(data.address, function (){
				console.log("You have been connected to device:"); alert("You have been connected"); $scope.checkConnection()}, function (){
					console.log("Connection wasn't possible"),alert("Connection wasn't possible"),$scope.checkConnection()
				});
		}
		else{
			bluetoothSerial.disconnect(function (){
				console.log("You have been disconnected"); alert("You have been disconnected"); $scope.checkConnection()}, function (){
					console.log("Disconnection wasn't possible"),alert("Disconnection wasn't possible"),$scope.checkConnection()
				});
		};
	}

});