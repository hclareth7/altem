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
	'acute.select',
	'angular-confirm',
	'angular-jwt',
	'permission',
	'permission.ui',
	'ngSanitize',
	'ngCsv'

]);

satApp.provider('modalState', function ($stateProvider) {
	var provider = this;
	this.$get = function () {
		return provider;
	};
	this.state = function (stateName, options) {
		//console.log(options);
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
			},
			data:options.data
		});
	};
});

satApp.config(['$stateProvider', '$urlRouterProvider', 'toastrConfig', '$locationProvider', 'modalStateProvider','$httpProvider',
	function ($stateProvider, $urlRouterProvider, toastrConfig, $locationProvider, modalStateProvider,$httpProvider) {

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

		$httpProvider.interceptors.push(function (toastr, $location, $q, jwtHelper) {
			return {
				request: function (conf) {
					var token = window.localStorage.getItem(TOKEN_KEY);
					if (token && !jwtHelper.isTokenExpired(token)) {

						conf.headers.Authorization = 'Bearer ' + token;
					} else {

						window.localStorage.removeItem(TOKEN_KEY);
						$location.path("/login");

					}
					return conf;
				}
			}
		});

		$urlRouterProvider.otherwise('/login');


	$stateProvider
		.state('main', {
			url: '/app',
			templateUrl: '/js/app/views/main.html',
			controller: 'mainController'
		})
		.state('login', {
			url: '/login',
			cache: false,
			templateUrl: '/js/app/views/login.html',
			controller: 'loginController',
			authenticate: false
		})
		//Estrategias
		.state('main.estrategia', {
			url: '/estrategia',
			templateUrl: '/js/app/views/estrategia/base.html',
			controller: 'estrategiaController'
		})
		.state('main.estrategia.editar', {
			url: '/editar/:estrategiaId',
			templateUrl: '/js/app/views/estrategia/crear.html',
			controller: 'estrategiaEditarController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
		})
		.state('main.estrategia.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/estrategia/crear.html',
			controller: 'estrategiaCrearController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
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
			controller: 'riesgoEditarController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
		})
		.state('main.riesgo.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/riesgo/crear.html',
			controller: 'riesgoCrearController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
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
			controller: 'tipoRiesgoController',

		})
		.state('main.tiporiesgo.editar', {
			url: '/editar/:tiporiesgoId',
			templateUrl: '/js/app/views/tiporiesgo/crear.html',
			controller: 'tipoRiesgoEditarController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
		})
		.state('main.tiporiesgo.crear', {
			url: '/crear',
			templateUrl: '/js/app/views/tiporiesgo/crear.html',
			controller: 'tipoRiesgoCrearController',
			data: {
				permissions: {
					only: ['ADMIN']
				}
			}
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

		modalStateProvider.state('main.personal.archivo', {
			url: '/archivo/crear',
			templateUrl: 'modal-archivo.html',
			controller: 'archivoCrearController'
		});
//Modal Accion
	modalStateProvider.state('main.estrategia.detalle.crear', {
			url: '/accion/crear',
			templateUrl: 'modal-accion.html',
		controller: 'accionCrearController',
		data: {
			permissions: {
				only: ['ADMIN']
			}
		}
		});
	modalStateProvider	.state('main.estrategia.detalle.editar', {
			url: '/accion/editar/:accionId',
			templateUrl: 'modal-accion.html',
		controller: 'accionEditarController',
		data: {
			permissions: {
				only: ['ADMIN']
			}
		}
		});
// Modal Filtro
	modalStateProvider.state('main.riesgo.detalle.crear', {
		url: '/filtro/crear',
		templateUrl: 'modal-filtro.html',
		controller: 'filtroCrearController',
		data: {
			permissions: {
				only: ['ADMIN']
			}
		}
	});
	modalStateProvider	.state('main.riesgo.detalle.editar', {
		url: '/filtro/editar/:filtroId',
		templateUrl: 'modal-filtro.html',
		controller: 'filtroEditarController',
		data: {
			permissions: {
				only: ['ADMIN']
			}
		}
	});
}]);

satApp.run(['$confirmModalDefaults', 'PermissionStore', '$rootScope', 'jwtHelper',
	function ($confirmModalDefaults, PermissionStore, $rootScope, jwtHelper) {


	$confirmModalDefaults.templateUrl = 'alertas.html';
	$confirmModalDefaults.defaultLabels.title = 'Mensaje del sistema';
	$confirmModalDefaults.defaultLabels.ok = 'Si';
	$confirmModalDefaults.defaultLabels.cancel = 'No';
}]);