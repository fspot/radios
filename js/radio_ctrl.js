app.controller('RadioCtrl', function($scope, Radio) {
	$scope.getSelected = function() { return Radio.selected; };
	$scope.getNotification = function() { return Radio.notification; };
	$scope.dismissNotification = function() { Radio.delNotifyAlarm(); };
	$scope.deleteRadio = function(radio) { Radio.deleteRadio(radio); };

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

	$scope.search = "";
	$scope.radios = Radio.allRadios;
	$scope.volume = Radio.volume;
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
