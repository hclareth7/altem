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


	.controller('estudiantePersonalController',
		['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$state', '$rootScope', '$uibModal', 'archivoPersonalService', 'accionService',
			function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope, $uibModal, archivoPersonalService, accionService) {

			
			$scope.getEstudiante = function (estudianteId) {
			estudianteService.getEstudianteById(estudianteId).then(function (response) {
				$rootScope.estudiante = response.data;
			});

		};

		$scope.getEstudiante($stateParams.estudianteId);
			$rootScope.getRiesgosByEstudiantes = function () {


				estudianteService.getRiesgosByEstudiante($stateParams.estudianteId).then(function (response) {
					$scope.riesgos = response.data;
					$rootScope.idArchivo = response.data[0].id;
					$rootScope.codigoEstudiante = response.data[0].estudiantes_altem_codigo;
					console.log($rootScope.idArchivo);
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
			//$rootScope.now = new Date();


				$scope.agregarAccion = function (intevencionId, accionId) {
					var accion = {
						fecha_aplicacion: new Date(),
						intervenciones_id: intevencionId,
						acciones_id: accionId,
						estado: 0
					};
					accionService.aplicarAccion(accion).then(function (response) {
						toastr.success('Exito', 'Accion iniciada');
						$rootScope.getRiesgosByEstudiantes();
					}, function (error) {
						console.log(error);
					});
				};
	}])

	.controller('riesgoCrearController',
		['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope', 'riesgoService', '$uibModalInstance', '$confirm', 'accionService',
			function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope, riesgoService, $uibModalInstance, $confirm, accionService) {
				$rootScope.getAllRiesgos = function () {
					var data = {
						codigo_estudiante: $rootScope.codigoEstudiante
					};
					riesgoService.riesgoByArchivo(data).then(function (response) {

						$scope.riesgos = response.data;
					});

				};
				$rootScope.getAllRiesgos();
				$scope.agregarRiesgo = function (id_riesgo) {
					$scope.archivo = {
						fecha_reporte: new Date(),
						riesgos_id: id_riesgo,
						estudiantes_altem_codigo: $rootScope.estudiante.ID.toLowerCase(),
						programa_estudiante: $rootScope.estudiante.PROGRAMA,
						usuarios_codigo: $rootScope.usuario.codigo,
						estado: 0
					};

					archivoPersonalService.createArchivo($scope.archivo).then(function (response) {
						$rootScope.getRiesgosByEstudiantes();
						$rootScope.getAllRiesgos();
						toastr.warning('Exito', 'Riesgo agregado');
					}, function (error) {
						console.log(error);
					});
					console.log($scope.archivo);
				};


				$scope.eliminarArchivo = function (idRiesgo) {
					var data = {
						idriesgo: idRiesgo,
						codigo_estudiante: $rootScope.codigoEstudiante
					};
					$uibModalInstance.dismiss();
					$confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
						archivoPersonalService.deleteArchivo(data).then(function (response) {
							$rootScope.getRiesgosByEstudiantes();
							$rootScope.getAllRiesgos();
							window.history.back();
							toastr.warning('Exito', 'Riesgo Eliminado');
						}, function (error) {
							console.log(error.data.status);
							if (error.data.status) {

							}
						});

					});
				};




			}])
	.controller('estrategiaCrearController',
		['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope', 'estrategiaService', 'intervencionesService', '$confirm', '$uibModalInstance',
			function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope, estrategiaService, intervencionesService, $confirm, $uibModalInstance) {



				$scope.estrategias=[];
				$rootScope.cargarEstrategias = function (data) {

					estrategiaService.getEstrategiaByRiesgoId(data).then(function (response) {
						$scope.estrategias=response.data;

					},function (error) {
						console.log(error);
					})
				};
				var idRiesgo = parseInt($stateParams.riesgoId);
				var idPersonal = $rootScope.idArchivo;
				var data1 = {
					id: idRiesgo,
					idpersonal: idPersonal
				};

				$rootScope.cargarEstrategias(data1);

				$scope.agregarEstrategia = function (idEstrategia) {

					$scope.intervencion = {
						fecha_inicio: new Date(),
						estado: 0,
						estrategias_id: idEstrategia,
						archivo_personal_id: $rootScope.idArchivo,
						usuarios_codigo: $rootScope.usuario.codigo
					};
					intervencionesService.createIntervencion($scope.intervencion).then(function (response) {
						$rootScope.getRiesgosByEstudiantes();
						$rootScope.cargarEstrategias(data1);
						toastr.success('Exito', 'Estrategia agregada');
					}, function (error) {
						console.log(error);
					})
				};


				$scope.eliminarIntervencion = function (idEstrategia) {
					var data = {
						idestrategia: idEstrategia,
						idarchivo: $rootScope.idArchivo
					};
					$uibModalInstance.dismiss();
					$confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
						intervencionesService.deleteIntervencion(data).then(function (response) {
							$rootScope.getRiesgosByEstudiantes();
							$rootScope.cargarEstrategias(data1);
							window.history.back();
							toastr.warning('Exito', 'Estrategia Eliminada');

						}, function (error) {
							console.log(error);
						});

					});
				};
			}])

	.controller('accionConfigController',
		['$scope', 'accionService', '$stateParams', '$location', 'toastr', '$rootScope',
			function ($scope, accionService, $stateParams, $location, toastr, $rootScope) {
				$scope.getAccionById = function () {
					var data = {
						intervencionId:$stateParams.intervencionId,
						accionId:$stateParams.accionId
					};
					accionService.getAccionAplicada(data).then(function (response) {
						$scope.configaccion=response.data;
					}, function (error) {
						console.log(error);
					});
				};


				$scope.value = 'En Progreso';

				$scope.comentarios = [];
				$scope.agregarConmentatio = function (comen) {
					comen.fecha = new Date();
					comen.autor = $rootScope.usuario.nombre;
					comen.contenido = comen.text;
					$scope.comentarios.push(comen);
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



