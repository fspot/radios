app.controller('AlarmCtrl', function($scope, Alarm, Radio) {
	$scope.newAlarm = function() {
		Alarm.addAlarm($scope.alarmWhen, $scope.alarmDuration, $scope.radioChoice);
		$scope.alarmWhen = "";
		$scope.alarmDuration = "";
	};

	$scope.delAlarm = function(alarm) {
		Alarm.cancelAlarm(alarm);
	};

	$scope.radios = Radio.allRadios;
	$scope.radioChoice = $scope.radios[0];
	$scope.alarms = Alarm.alarms;
});
