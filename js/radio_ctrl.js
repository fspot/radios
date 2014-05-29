app.controller('RadioCtrl', function($scope, $interval, Radio) {
	$scope.getSelected = function() { return Radio.selected; };
	$scope.getNotification = function() { return Radio.notification; };
	$scope.dismissNotification = function() { Radio.delNotifyAlarm(); };
	$scope.deleteRadio = function(radio) {
		if (confirm("Êtes-vous sûr de vouloir supprimer cette radio ?"))
			Radio.deleteRadio(radio);
	};
	$scope.currentTime = function() { return Radio.audioElement.currentTime; };
	$scope.realCurrentTime = function() { return Radio.realCurrentTime(); };
	$scope.increaseCurrentTime = function() { Radio.increaseCurrentTime(); };
	$scope.decreaseCurrentTime = function() { Radio.decreaseCurrentTime(); };

	$scope.toggle = function(radio) {
		$scope.dismissNotification();
		if (Radio.selected !== null && radio !== Radio.selected && Radio.selected.isPlaying) {
			$scope.toggle(Radio.selected);
		}
		radio.isPlaying = !radio.isPlaying;
		if (radio.isPlaying) {
			Radio.launchRadio(radio);
		} else {
			Radio.pause();
			Radio.selected = null;
		}
	};

	$scope.togglePause = function(radio) {
		$scope.dismissNotification();
		if (radio.isPlaying) Radio.pause();
		else Radio.play();
	};

	$scope.toggleVolume = function() {
		$scope.dismissNotification();
		if ($scope.volume.off)       { $scope.volume.off = false; $scope.volume.down = true; }
		else if ($scope.volume.down) { $scope.volume.down = false; $scope.volume.up = true; }
		else                         { $scope.volume.up = false; $scope.volume.off = true; }
		Radio.setVolume($scope.volume);
	};

	$scope.humanizeSeconds = function(seconds) {
		var hours = Math.floor(seconds / 3600);
		var minutes = Math.floor((seconds - 3600 * hours) / 60);
		seconds = Math.floor(seconds - 3600 * hours - 60 * minutes);
		var minsAndSecs = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
		if (hours === 0)
			return minsAndSecs;
		else
			return '' + hours + ':' + minsAndSecs;
	};

	$scope.playPauseButtonContent = function() {
		if ($scope.timeTravel) return $scope.humanizeSeconds($scope.currentTime());
		else if ($scope.getSelected() && $scope.getSelected().isPlaying) return "Pause";
		else return "Play";
	};

	$scope.search = "";
	$scope.radios = Radio.allRadios;
	$scope.volume = Radio.volume;
	$scope.timeTravel = false;

	if (! $scope.interval) $scope.interval = $interval(function() {}, 1000);
	$scope.$on('$destroy', function() { $interval.cancel($scope.interval); });
});

app.filter('radiofilter', function () {
	return function (items, scope) {
		var result = [];
		angular.forEach(items, function (value, idx) {
			var isSubstring = (value.name.toLowerCase().indexOf(scope.search.toLowerCase()) > -1);
			if (value === scope.getSelected() || isSubstring) {
				result.push(value);
			}
		});
		return result;
	}
});
