angular.module('app').controller('SignInController', [
	'$scope',
	'$state',
	function ($scope, $state) {
	
		$scope.submit = function () {
			console.log('submit');
			$state.go('app');
		};
	}
]);