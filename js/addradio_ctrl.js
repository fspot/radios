app.controller('AddRadioCtrl', function($scope, $location, Radio) {
	$scope.newRadio = function() {
		Radio.addRadio($scope.radioName, $scope.radioUrl);
		$scope.radioName = "";
		$scope.radioUrl = "";
		$location.path("/");
	};
});
