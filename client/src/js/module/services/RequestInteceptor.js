angular.module('app').factory('RequestInteceptor', [
	'$q',
	'$window',
	function ($q, $window) {
		return {
			request: function (conf) {
				console.log(conf);
				if (conf.url.indexOf('/api/') === 0 && conf.method === 'GET') {
					conf.url += (conf.url.indexOf('?') > 0 ? '&' : '?') + new Date().getTime();
				}
				return conf;
			},
			response: function (response) {
				if (response.status === 401) {
					console.log(response);
				}
	            return response || $q.when(response);
			},
			responseError: function(rejection) {
				if (rejection.status === 401) {
	                console.log("Response Error 401", rejection);
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

