angular.module('starter.controllers', [])

.controller('TempCtrl', function($scope, $interval, $ionicModal, receivedData, bluetoothInformation, $ionicLoading) {
	// INITIAL VALUES
	$scope.currentSetpoint="value";
	$scope.currentTemperature="value";
	$scope.pwmSignal="value";
	$scope.kpValue="value";
	$scope.kiValue="value";
	$scope.kdValue="value";
	$scope.regulatorType="value";
	$scope.hysteresisValue="value";
	$scope.powerValue="Value";

	$scope.labels1 = [0];
	$scope.series1 = [['Actual Temperature'],['Setpoint']];
	$scope.data1=[[20],[20]];
	$scope.colors = ['#ff6384','#ff6384'];

	$scope.labels2 = [0];
	$scope.series2 = ['PWM'];
	$scope.data2=[0];
	$scope.color2 = ['#ff6384'];

	chartPermission=1;
	$scope.chartStartStop='Start';
	$scope.chartButtonStyle='button button-block button-positive'

	var interval1=$interval(receiveData, 1000);
	var timeX=new Date().toTimeString().split(" ")[0];
	var oneTimeOnly=0;
	var interval2;
	var counter=0;

	function receiveData(){
		receivedData.getData();
		if(receivedData.getIsThereData())
		{
			counter=counter+1;
			$scope.currentTemperature = receivedData.getTemperature();
			$scope.currentSetpoint = receivedData.getSetpoint();
			$scope.pwmSignal=receivedData.getPwm();
			$scope.kpValue=receivedData.getKp();
			$scope.kiValue=receivedData.getKi();
			$scope.kdValue=receivedData.getKd();
			$scope.hysteresisValue=receivedData.getHysteresis();
			$scope.powerValue=receivedData.getPower()
			if(receivedData.getRegulator()=='1'){
				$scope.regulatorType='Hysteresis';
			}
			else{
				$scope.regulatorType='PID';
			}

			if(counter==3){
				updateCharts();
				counter=0;
			}
		}
	}

	function updateCharts(){
		timeX=new Date().toTimeString().split(" ")[0];
		if(receivedData.getIsThereData()){

			if($scope.labels1.length>=150){
				console.log($scope.labels1.length);
				$scope.labels1=$scope.labels1.slice(1,150);
				$scope.data1[0]=$scope.data1[0].slice(1,150);
				$scope.data1[1]=$scope.data1[1].slice(1,150);

				$scope.labels2=$scope.labels2.slice(1,150);
				$scope.data2=$scope.data2.slice(1,150);
			}

			$scope.labels1.push(timeX);
			$scope.data1[0].push($scope.currentTemperature);
			$scope.data1[1].push($scope.currentSetpoint);

			$scope.labels2.push(timeX);
			$scope.data2.push($scope.pwmSignal);
		}
	}

	$scope.resetChart= function(){
		$scope.data1=[[receivedData.getTemperature()],[receivedData.getSetpoint()]];
		$scope.labels1=[timeX];
		$scope.data2=[receivedData.getPwm()];
		$scope.labels2=[timeX];
	}


	$scope.openModal = function(index) {
		if (index == 1) $scope.oModal1.show();
		else $scope.oModal2.show();
	}

	$scope.closeModal = function(index) {
		if (index == 1) $scope.oModal1.hide();
		else $scope.oModal2.hide();
	}

	$ionicModal.fromTemplateUrl('templates/datalog.html', {
		id: '1',
		scope: $scope}).then(function(modal) {
			$scope.oModal1 = modal;
		})

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
				ticks: {
					autoSkip:true,
					maxTicksLimit:4,
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
				ticks: {
					autoSkip:true,
					maxTicksLimit:4,
				} 
			}],	
		},
	}


})

.controller('ControlCtrl', function($scope, $ionicModal) {
	// INITIAL VALUES
	var regulator=1;
	$scope.data={'regulatorType':'PID'};
	$scope.data1={'newSetpoint':'22'};
	$scope.data2={'kp':'15'};
	$scope.data3={'ki':'5'};
	$scope.data4={'kd':'2'};
	$scope.data5={'hyst':'0.25'}
	$scope.data6={'power':'255'}

	$scope.sendSetpoint= function(){
		console.log($scope.data.regulatorType);
		if($scope.data.regulatorType=='PID'){
			regulator=0;
		}
		else{
			regulator=1;
		}
		console.log(regulator);
		bluetoothSerial.write("t"+$scope.data1.newSetpoint+"p"+$scope.data2.kp+"i"+$scope.data3.ki+"d"+$scope.data4.kd+"r"+regulator+"h"+$scope.data5.hyst+"m"+$scope.data6.power+"/n", function (data){
			console.log("Sending process was"+data+". This:  was send");alert("Temperature Setpoint was send")}, function (data){
				console.log("Nothing was send");alert("Data was not send")});
		
	}

	$scope.defaultSettings1= function(){
		$scope.data2={'kp':'15'};
		$scope.data3={'ki':'5'};
		$scope.data4={'kd':'2'};
	}

	$scope.defaultSettings2= function(){
		$scope.data5={'hist':'0.25'}
		$scope.data6={'power':'255'}
	}

	$scope.openModal = function(index) {
		if (index == 1) $scope.oModal1.show();
		else $scope.oModal2.show();
	}

	$scope.closeModal = function(index) {
		if (index == 1) $scope.oModal1.hide();
		else $scope.oModal2.hide();
	}

	$ionicModal.fromTemplateUrl('templates/pidsettings.html', {
		id: '1',
		scope: $scope}).then(function(modal) {
			$scope.oModal1 = modal;
		})

		$ionicModal.fromTemplateUrl('templates/hysteresissettings.html', {
			id: '2',
			scope: $scope}).then(function(modal) {
				$scope.oModal2 = modal;
			})
		})


.controller('BlueCtrl', function($scope, $timeout, $interval, $ionicLoading, bluetoothInformation) {
	// INITIAL VALUES
	$scope.addresses = [];
	$scope.textConnect='Connect';
	$scope.typeConnect='button button-block button-calm';


	$timeout(function() {
		bluetoothInformation.isBluetoothON();
	}, 500);



	$scope.checkConnection=function(){
		bluetoothInformation.checkConnectionState();
		var bluetoothState=bluetoothInformation.getConnectionState();
		console.log("connectionstate "+bluetoothState);
		if(bluetoothState){
			$scope.$apply(function () {
				console.log("You are not connected");
				$scope.textConnect = 'Connect';
				$scope.typeConnect='button button-block button-calm';

			})
		}
		else{
			$scope.$apply(function () {
				console.log("You are connected to device");
				$scope.textConnect = 'Disconnect';
				$scope.typeConnect='button button-block button-assertive';
			})

		}
	}

	$scope.checkConnection1=function(){
		$scope.$apply(function () {
			console.log("You are not connected");
			$scope.textConnect = 'Connect';
			$scope.typeConnect='button button-block button-calm';
		})
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
		$ionicLoading.show();
		bluetoothInformation.checkConnectionState();
		if(bluetoothInformation.getConnectionState()){
			bluetoothSerial.disconnect(function (){
				console.log("You have been disconnected"); alert("You have been disconnected"); $scope.checkConnection1();$ionicLoading.hide()}, function (){
					console.log("Disconnection wasn't possible");alert("Disconnection wasn't possible");$scope.checkConnection();$ionicLoading.hide()
				});
		}
		else{
			bluetoothSerial.connect(data.address, function (){
				console.log("You have been connected to device:"); alert("You have been connected");$scope.checkConnection();$ionicLoading.hide()}, function (){
					console.log("Connection wasn't possible");alert("Connection wasn't possible");$scope.checkConnection1();$ionicLoading.hide()
				});

		};
		bluetoothInformation.checkConnectionState();
	}

})
