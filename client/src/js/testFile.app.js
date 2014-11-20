angular.module('app',['ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: './js/module/partials/home.html'
		})
		.state('signUp', {
			url:'/signUp',
			controller: 'SignUpController',
			templateUrl: './js/module/partials/signUp.html'
		})
		.state('signIn', {
			url:'/signIn',
			controller: 'SignInController',
			templateUrl: './js/module/partials/signIn.html'
		})
		.state('app', {
			url:'/app',
			controller: 'MainCtrl',
			templateUrl: './js/module/partials/app.html'
		});
});