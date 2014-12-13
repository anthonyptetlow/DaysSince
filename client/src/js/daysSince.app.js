angular.module('app',['ngResource', 'ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: './js/module/partials/home.html'
		})
		.state('app', {
			url:'/app',
			controller: 'MainCtrl',
			templateUrl: './js/module/partials/app.html'
		});
});