angular.module('app').service('UserService', [
	'$resource',
	'$q',
	function ($resource, $q) {
		var UserResource = $resource('/api/user/:id');
		
		function getUsers() {
			var defered = $q.defer();
			UserResource.query(function (data) {
				defered.resolve(data);
			}, function (error) {
				defered.reject(error);
			});
			console.log()
			return defered.promise;
		}
		
		function getUser(id) {
			var defered = $q.defer();
			UserResource.get({id: id}, function (data) {
				defered.resolve(data);
			}, function (error) {
				defered.reject(error);
			});
			return defered.promise;
		}

		function createUser(id, userData) {
			var defered = $q.defer();
			UserResource.save({id: id}, userData, function (data) {
				defered.resolve(data);
			}, function (error) {
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
			getAllUsers: getUsers,
			getUser: getUser,
			createUser: createUser
		};
	}
]);