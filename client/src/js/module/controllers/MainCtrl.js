angular.module('app').controller('MainCtrl', ['$scope', function ($scope) {
	$scope.entryList = [];


	$scope.addEntry = function () {
		$scope.entryList.push({title:'test title ' + $scope.entryList.length})
	};

}]);