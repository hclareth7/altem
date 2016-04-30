/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var satApp = angular.module("satApp", [
    'ui.router',
	'AppControllers',
	'AppServices'
]);

satApp.filter('capitalize', function () {
	return function (input) {
		return (!!input) ? input.charAt(0).toUpperCase() : '';
	}
});


satApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('main', {
			url: '/app',
			templateUrl: '/js/app/views/main.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/js/app/views/login.html'
		}) //Estrategias
		.state('main.estrategia', {
			url: '/estrategia',
			templateUrl: '/js/app/views/estrategia/base.html',
			controller: 'estrategiaController'
		})
		.state('main.estrategia.editar', {
			url: '/editar/:estrategiaId',
			templateUrl: '/js/app/views/estrategia/crear.html',
			controller: 'estrategiaEditarController'
		})
		.state('main.estrategia.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/estrategia/crear.html',
			controller: 'estrategiaCrearController'
		}) //Riesgos

}])
