angular.module('app').service('EntryService', [
	'$resource',
	'$q',
	function ($resource, $q) {
		var EntryResource = $resource('/api/entries/:id', {}, {
	        'addEvent': { method:'PUT', url:'/api/entries/:id/addEvent' }
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
				console.log(entry);
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