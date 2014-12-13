angular.module('app').controller('MainCtrl', ['$scope', 'EntryService', 'entryList', function ($scope, EntryService, entryList) {

	$scope.entryList = entryList;	

	$scope.addEntry = function () {
		EntryService.createEntry({title:'test title ' + $scope.entryList.length})
			.then(function (){
				return EntryService.getEntries();
			})
			.then(function (newEntryList) {
				$scope.entryList = newEntryList;
			});
	};

}]);