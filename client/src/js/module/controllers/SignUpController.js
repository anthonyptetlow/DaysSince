angular.module('app').controller('SignUpController', ['$scope', function ($scope) {
	
	$scope.submitted = false;

	$scope.submit = function () {
		$scope.submitted = true;
	};

}]);