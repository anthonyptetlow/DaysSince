angular.module('app',['ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('profile', {
			url:'/',
			controller: 'MainCtrl',
			templateUrl: './js/module/partials/content.html'
		});
});