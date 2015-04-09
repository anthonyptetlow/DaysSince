angular.module('app', ['ngResource', 'ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './js/module/partials/signIn.html',
			resolve: {
				test: function () {
					return 'testString';
				}
			}
		})
		.state('app', {
			url: '/app',
			controller: 'MainCtrl',
			templateUrl: './js/module/partials/home.html',
			resolve: {
				entryList: function (EntryService) {
					return EntryService.getEntries();
				}
			}
		});
});

angular.module('app').controller('MainCtrl', [
	'$scope',
	'EntryService',
	'entryList',
	function ($scope, EntryService, entryList) {

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
			EntryService.deleteEntry(id)
			.then(function getEntries() {
				return EntryService.getEntries();
			})
			.then(function updateEntries (entries) {
				$scope.entryList = entries;
			});
		};

		$scope.resetEntry = function (id) {
			EntryService.addEvent(id)
			.then(function () {
				return EntryService.getEntries();
			})
			.then(function (entries) {
				$scope.entryList = entries;
			});
		};

		$scope.getDaysSince = function (entry){
			var lastDate = entry.dates[entry.dates.length - 1],
				noMillisSince = new Date() - new Date(lastDate);
			return Math.floor(noMillisSince / (1000 * 60 * 60 * 24));
		};
	}
]);

// angular.module('app').directive('MainDir', [function () {
// 	return {
// 		restrict: 'A',
// 		link: function (scope, element, attrs) {
// 			console.log('MainDir');
// 		}
// 	};
// }]);

angular.module('app').service('EntryService', [
	'$resource',
	'$q',
	function ($resource, $q) {
		var EntryResource = $resource('/api/entries/:id', {}, {
			'addEvent': { method: 'PUT', url: '/api/entries/:id/addEvent' }
		});

		function getEntries() {
			var defered = $q.defer();
			EntryResource.query(function (entry) {
				defered.resolve(entry);
			}, function (error) {
				defered.reject(error);
			});
			return defered.promise;
		}

		function getEntry(id) {
			var defered = $q.defer();
			EntryResource.get({id: id}, function (entry) {
				defered.resolve(entry);
			}, function (error) {
				defered.reject(error);
			});
			return defered.promise;
		}

		function createEntry(entry) {
			var newEntry = new EntryResource(entry);
			return newEntry.$save();
		}

		function deleteEntry(id) {
			return getEntry(id).then(function (entry) {
				return entry.$remove({id: id});
			});
		}

		function addEventToEntry(id) {
			var defered = $q.defer();
			EntryResource.addEvent({id: id}, {}, function(data) {
				defered.resolve(data);
			}, function (error) {
				defered.reject(error);
			});
			return defered.promise;
		}
		return {
			getEntries: getEntries,
			getEntry: getEntry,
			createEntry: createEntry,
			deleteEntry: deleteEntry,
			addEvent: addEventToEntry
		};
	}
]);

angular.module('app').factory('RequestInteceptor', [
	'$q',
	function ($q) {
		return {
			request: function (conf) {
				if (conf.url.indexOf('/api/') === 0 && conf.method === 'GET') {
					conf.url += (conf.url.indexOf('?') > 0 ? '&' : '?') + new Date().getTime();
				}
				return conf;
			},
			response: function (response) {
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				if (rejection.status === 401) {
					window.location.hash = '#/';
				}
				return $q.reject(rejection);
			}
		};
	}
]);

angular.module('app').config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('RequestInteceptor');
}]);
