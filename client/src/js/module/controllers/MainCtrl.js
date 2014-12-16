angular.module('app').controller('MainCtrl', ['$scope', 'EntryService', 'entryList', function ($scope, EntryService, entryList) {

	$scope.entryList = entryList;	

	$scope.entry = {}; 
	$scope.addEntry = function () {
		if (angular.isDefined($scope.entry.title)) {
			EntryService.createEntry($scope.entry)
				.then(function (){
					return EntryService.getEntries();
				})
				.then(function (entries) {
					$scope.entryList = entries;
					$scope.entry = {};
				});
		}
	};

	$scope.deleteEntry = function (id) {
		EntryService.deleteEntry(id).then(function getEntries() {
			return EntryService.getEntries();
		})
		.then(function updateEntries (entries) {
			$scope.entryList = entries;
		});
	};

	$scope.getDaysSince = function (entry){
		var lastDate = entry.dates[entry.dates.length - 1],
			noMillisSince = new Date() - new Date(lastDate);
		console.log(noMillisSince);
		return Math.floor(noMillisSince / (1000*60*60*24));
	};
}]);