app.controller('AlarmCtrl', function($scope, $interval, Alarm, Radio) {
	$scope.newAlarm = function() {
		Alarm.addAlarm($scope.alarmWhen, $scope.alarmDuration, $scope.radioChoice);
		$scope.alarmWhen = "";
		$scope.alarmDuration = "";
	};

	$scope.delAlarm = function(alarm) {
		Alarm.cancelAlarm(alarm);
	};

	$scope.humanizeWhen = function(when) {
		var seconds = Alarm.whenInSeconds(when);
		var minutes = Math.round(seconds / 60);
		var hours = Math.floor(seconds / 3600);
		if (hours === 0)
			return minutes + ' minutes';
		else
			return hours + 'h' + ('0' + (minutes - 60 * hours)).slice(-2);
	};

	$scope.radios = Radio.allRadios;
	$scope.radioChoice = $scope.radios[0];
	$scope.alarms = Alarm.alarms;

	if (! $scope.interval)
		$scope.interval = $interval(function() {
			angular.forEach($scope.alarms, function (alarm, idx) {
				alarm.order -= 10;
			});
		}, 10 * 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel($scope.interval);
	});
});
