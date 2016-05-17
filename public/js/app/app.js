/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var satApp = angular.module("satApp", [
    'ui.router',
	'AppControllers',
	'AppServices',
    'ngAnimate',
    'toastr',
	'ui.bootstrap'
]);

satApp.filter('capitalize', function () {
	return function (input) {
		return (!!input) ? input.charAt(0).toUpperCase() : '';
	}
});

satApp.config(['$stateProvider', '$urlRouterProvider', 'toastrConfig', function ($stateProvider, $urlRouterProvider, toastrConfig) {
	angular.extend(toastrConfig, {
		autoDismiss: false,
		containerId: 'toast-container',
		maxOpened: 0,
		newestOnTop: true,
		positionClass: 'toast-top-right',
		preventDuplicates: false,
		preventOpenDuplicates: false,
		target: 'body'
	});

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
		.state('main.riesgo', {
			url: '/riesgo',
			templateUrl: '/js/app/views/riesgo/base.html',
			controller: 'riesgoController'
		})
		.state('main.riesgo.editar', {
			url: '/editar/:riesgoId',
			templateUrl: '/js/app/views/riesgo/crear.html',
			controller: 'riesgoEditarController'
		})
		.state('main.riesgo.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/riesgo/crear.html',
			controller: 'riesgoCrearController'
		}) //Tipo Riesgos
		.state('main.tiporiesgo', {
			url: '/tipo-riesgo',
			templateUrl: '/js/app/views/tiporiesgo/base.html',
			controller: 'tipoRiesgoController'
		})
		.state('main.tiporiesgo.editar', {
			url: '/editar/:tiporiesgoId',
			templateUrl: '/js/app/views/tiporiesgo/crear.html',
			controller: 'tipoRiesgoEditarController'
		})
		.state('main.tiporiesgo.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/tiporiesgo/crear.html',
			controller: 'tipoRiesgoCrearController'
		})
		//Estudiante
		.state('main.estudiante', {
			url: '/estudiante',
			templateUrl: '/js/app/views/estudiante/base.html',
			controller: 'estudianteController'
		})
		.state('main.estudiante.intervencion', {
			url: '/intervencion/:estudianteId',
			templateUrl: '/js/app/views/estudiante/intervencion.html',
			controller: 'estudianteIntervencionController'
		})
		.state('main.personal', {
			url: '/estudiante/personal/:estudianteId',
			templateUrl: '/js/app/views/estudiante/personal.html',
			controller: 'estudiantePersonalController'
		})



}])
