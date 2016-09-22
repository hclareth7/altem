var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('estudianteController', ['$scope', 'estudianteService', '$stateParams', 'toastr', '$state', '$rootScope', 'filtroService',
		function ($scope, estudianteService, $stateParams, toastr, $state, $rootScope, filtroService) {

			

			$rootScope.estudiantes = [];
			$scope.getAllEstudiantes = function () {
				estudianteService.getAllEstudiantes().then(function (response) {
					$rootScope.estudiantes = response.data;
					
				});
			};
			$scope.getColumsEstudiantes = function(obj){
				var keys = [];
				for(var key in obj){
					keys.push(key);
				}
				return keys;
			};
			filtroService.getAllFiltros().then(function (response) {
				$scope.filtros = response.data;
			});
			$scope.getFiltrosByEstudiantes = function (id) {
				estudianteService.getEstudiantesByFiltro(id).then(function (response) {
					$rootScope.estudiantes = response.data;
				});
			};



			$scope.getAllEstudiantes();

			$rootScope.barra = function () {
				$rootScope.titulo = "NO";
			};
			$rootScope.barra();

	}])
	.controller('estudianteIntervencionController',
		['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$rootScope',
		function ($scope, estudianteService, $stateParams, $location, toastr, $rootScope) {




	}])
	.controller('estudiantePersonalController', ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$state', '$rootScope', '$uibModal','riesgoService',
		function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope, $uibModal,riesgoService) {

			
			$scope.getEstudiante = function (estudianteId) {
			estudianteService.getEstudianteById(estudianteId).then(function (response) {
				$scope.estudiante = response.data;
			});

		};
		$scope.getEstudiante($stateParams.estudianteId);
			estudianteService.getRiesgosByEstudiante($stateParams.estudianteId).then(function (response) {
				$scope.riesgos=response.data;
			});


		$scope.getEdad = function (fecha_na) {
			var ANIO_ACTUAL = new Date().getFullYear();
			var FECHA_NA = new Date(fecha_na).getFullYear();

			return ANIO_ACTUAL - FECHA_NA;
		};

		$scope.showPanel = function () {
			$scope.isPanel = true;


		};

		$scope.closePanel = function () {
			$scope.isPanel = false;

		};

		$scope.open = function () {

			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				windowTemplateUrl: 'windows.html',
				templateUrl: 'modal.html',
				controller: 'ModalInstanceCtrl',
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});
		};

	}])

	.controller('riesgoCrearController',
		['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$rootScope',
			function ($scope, estudianteService, $stateParams, $location, toastr, $rootScope) {

				console.log("holalalal");


			}])

	.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
		$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.cars = [
			{
				id: 1,
				name: 'Estrategia 1',
				descripcion: 'sfdjgkljsdlfgjlskfd'
			},
			{
				id: 2,
				name: 'Estrategia 2',
				descripcion: 'fdgjksfdhkjgsfd'

			},
			{
				id: 3,
				name: 'Estrategia 3',
				descripcion: 'fdgsdfgsjdflkgjslfdk'

			}
                ];
		$scope.selectedCar = [];


	}]);
/**




**/

//Servicios
/**
controllerModule.service('CargarSelectRiesgos',[ '$scope','riesgoService',function ($scope,riesgoService) {
	var cargar = function () {
		$scope.riesgos = [];
		$scope.getAllRiesgos = function () {
			riesgoService.getAllRiesgo().then(function (response) {
				console.log(response.data);
				$scope.riesgos = response.data;
			});

		};
		$scope.getAllRiesgos();
	};

	return cargar;
}])**/



