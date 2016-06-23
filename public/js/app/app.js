/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var satApp = angular.module("satApp", [
    'ui.router',
	'AppControllers',
	'AppServices',
    'toastr',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'angular-click-outside',
	'acute.select'
]);
satApp.provider('modalState', function ($stateProvider) {
	var provider = this;
	this.$get = function () {
		return provider;
	};
	this.state = function (stateName, options) {
		var modalInstance;
		$stateProvider.state(stateName, {
			url: options.url,
			onEnter: function ($uibModal, $state) {
				modalInstance = $uibModal.open(options);
				modalInstance.result['finally'](function () {
					modalInstance = null;
					if ($state.$current.name === stateName) {
						$state.go('^');
					}
				});
			},
			onExit: function () {
				if (modalInstance) {
					modalInstance.close();
				}
			}
		});
	};
});

satApp.config(['$stateProvider', '$urlRouterProvider', 'toastrConfig', '$locationProvider', 'modalStateProvider', function ($stateProvider, $urlRouterProvider, toastrConfig, $locationProvider, modalStateProvider) {
	angular.extend(toastrConfig, {
		autoDismiss: false,
		containerId: 'toast-container',
		maxOpened: 0,
		newestOnTop: true,
		positionClass: 'toast-top-right animation-fade',
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
		})
		.state('main.estrategia.detalle', {
			url: '/detalle/:estrategiaId',
			templateUrl: '/js/app/views/estrategia/detalle.html',
			controller: 'estrategiaDetalleController'
		})
		//Riesgos
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
		})
		.state('main.riesgo.detalle',{
			url: '/detalle/:riesgoId',
			templateUrl: '/js/app/views/riesgo/detalle.html',
			controller: 'riesgoDetalleController'
		})
		//Tipo Riesgos
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
		//Accion

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
		});
//Modal Accion
	modalStateProvider.state('main.estrategia.detalle.crear', {
			url: '/accion/crear',
			templateUrl: 'modal-accion.html',
			controller: 'accionCrearController'
		});
	modalStateProvider	.state('main.estrategia.detalle.editar', {
			url: '/accion/editar/:accionId',
			templateUrl: 'modal-accion.html',
			controller: 'accionEditarController'
		});
// Modal Filtro
	modalStateProvider.state('main.riesgo.detalle.crear', {
		url: '/filtro/crear',
		templateUrl: 'modal-filtro.html',
		controller: 'filtroCrearController'
	});
	modalStateProvider	.state('main.riesgo.detalle.editar', {
		url: '/filtro/editar/:filtroId',
		templateUrl: 'modal-filtro.html',
		controller: 'filtroEditarController'
	});

}])
