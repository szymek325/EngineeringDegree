angular.module('starter.controllers', [])

.controller('TempCtrl', function($scope, $interval, $ionicModal, receivedData, bluetoothInformation) {
	// INITIAL VALUES
	$scope.currentSetpoint="value";
	$scope.currentTemperature="value"
	$scope.pwmSignal="value"

	$scope.labels1 = [0];
	$scope.series1 = ['Actual Temperature'];
	$scope.data1=[[20],[20]];
	$scope.colors = ['#ff6384','#ff6384'];

	$scope.labels2 = [0];
	$scope.series2 = ['PWM'];
	$scope.data2=[0];
	$scope.color2 = ['#ff6384'];

	var interval1=$interval(receiveData, 2000);
	var timeX=0;
	var logs=[0];	
	
	function receiveData(){
		timeX=timeX+2;
		receivedData.getData();
		if(receivedData.getIsThereData())
		{
			$scope.currentTemperature = receivedData.getTemperature();
			$scope.currentSetpoint = receivedData.getSetpoint();
			$scope.pwmSignal=receivedData.getPwm();

			$scope.labels1.push(timeX);
			$scope.data1[0].push($scope.currentTemperature);
			$scope.data1[1].push($scope.currentSetpoint);

			$scope.labels2.push(timeX);
			$scope.data2.push($scope.pwmSignal);

			logs.push($scope.currentTemperature);
			$scope.tempData=JSON.stringify(logs);
		}
	}

	$scope.resetChart= function(){
		$scope.data1=[[receivedData.getTemperature()],[receivedData.getSetpoint()]];
		$scope.labels1=[timeX];
		$scope.data2=[receivedData.getPwm()];
		$scope.labels2=[timeX];
	}

	$scope.options1 = {
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

	$scope.options2 = {
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

	$scope.sendSetpoint= function(){
		dataToSend=$scope.newSetpoint;
		bluetoothSerial.write("t"+dataToSend+"\n", function (data){
			console.log("Sending process was"+data+". This: "+dataToSend+" was send");alert("Temperature Setpoint was send")}, function (data){
				console.log("Nothing was send");alert("Data was not send")});
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
				console.log("List: "+data);
				$scope.$apply(function () {
					$scope.pairedDevices=data})},function () {
					console.log("No devices found");
				});
			bluetoothSerial.discoverUnpaired(function (data) {
				console.log("Discover Unpaired: "+data);
				$scope.$apply(function () {
					$scope.discoveredDevices=data});$ionicLoading.hide();},function () {
					console.log("No devices found");
					$ionicLoading.hide();
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