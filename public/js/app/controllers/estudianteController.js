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
	.controller('estudiantePersonalController', ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$state', '$rootScope', '$uibModal', 'archivoPersonalService',
		function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope, $uibModal, archivoPersonalService) {

			
			$scope.getEstudiante = function (estudianteId) {
			estudianteService.getEstudianteById(estudianteId).then(function (response) {
				$rootScope.estudiante = response.data;
			});

		};

		$scope.getEstudiante($stateParams.estudianteId);
			$rootScope.getRiesgosByEstudiantes = function () {
				estudianteService.getRiesgosByEstudiante($stateParams.estudianteId).then(function (response) {
					$scope.riesgos = response.data;
					$rootScope.idArchivo=response.data.id;
				});
			};
			$rootScope.getRiesgosByEstudiantes();


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

			$scope.agregarRiesgo = function (id_riesgo, codigo_usuario, id_estudiante, programa_estudiante) {

				$scope.archivo = {
					fecha_reporte: new Date(),
					riesgos_id: id_riesgo,
					estudiantes_altem_codigo: id_estudiante.toLowerCase(),
					programa_estudiante: programa_estudiante,
					usuarios_codigo: codigo_usuario,
					estado: 0
				};
				archivoPersonalService.createArchivo($scope.archivo).then(function (response) {
					$rootScope.getRiesgosByEstudiantes();
					toastr.success('Exito', 'Riesgo agregado');
				}, function (error) {
					console.log(error);
				});


			};

	}])

	.controller('riesgoCrearController',
		['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope','riesgoService',
			function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope,riesgoService) {

				$scope.getAllRiesgos = function () {
					riesgoService.getAllRiesgo().then(function (response) {

						$scope.riesgos = response.data;
					});

				};
				$scope.getAllRiesgos();
				$scope.agregarRiesgo = function (id_riesgo) {
					$scope.archivo = {
						fecha_reporte: new Date(),
						riesgos_id: id_riesgo,
						estudiantes_altem_codigo: $rootScope.estudiante.id.toLowerCase(),
						programa_estudiante: $rootScope.estudiante.programa,
						usuarios_codigo: $rootScope.usuario.codigo,
						estado: 0
					};

					archivoPersonalService.createArchivo($scope.archivo).then(function (response) {
						$rootScope.getRiesgosByEstudiantes();
						toastr.warning('Exito', 'Riesgo agregado');
					}, function (error) {
						console.log(error);
					});
					console.log($scope.archivo);
				};

			}])
	.controller('estrategiaCrearController',
		['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope', 'estrategiaService','intervencionesService',
			function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope, estrategiaService,intervencionesService) {
				$scope.estrategias=[];
				$scope.cargarEstrategias=function (Riesgoid) {

					estrategiaService.getEstrategiaByRiesgoId(Riesgoid).then(function (response) {
						$scope.estrategias=response.data;
						console.log($scope.estrategias);
					},function (error) {
						console.log(error);
					})
				};
				$scope.cargarEstrategias(parseInt($stateParams.riesgoId));
				
				$scope.agregarEstrategia=function () {
					toastr.success('Exito', 'Estrategia agregada');
				};




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



