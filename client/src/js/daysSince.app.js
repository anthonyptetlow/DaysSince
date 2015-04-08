angular.module('app', ['ngResource', 'ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './js/module/partials/signIn.html',
			resolve: {
				test: function () {
					console.log('Home page');
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
					console.log('getting entries');
					return EntryService.getEntries();
				}
			}
		});
});
