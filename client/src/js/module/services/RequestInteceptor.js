angular.module('app').factory('RequestInteceptor', [
	function () {
		return {
			request: function (conf) {
				if (conf.url.indexOf('/api/') === 0 && conf.method === 'GET') {
					conf.url += (conf.url.indexOf('?') > 0 ? '&' : '?') + new Date().getTime();
				}
				return conf;
			}
		};
	}
]);

angular.module('app').config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('RequestInteceptor');
}]);

