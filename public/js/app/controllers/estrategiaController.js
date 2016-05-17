var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('estrategiaController', ['$scope', 'estrategiaService',
    '$stateParams', 'toastr', '$state', '$rootScope',
    function ($scope, estrategiaService, $stateParams, toastr, $state, $rootScope) {
			$rootScope.estrategias = [];
			$scope.getAllEstrategiass = function () {
				estrategiaService.getAllEstrategias().then(function (response) {
					//console.log(response.data);
					$rootScope.estrategias = response.data;
				});

			};

			$scope.getAllEstrategiass();

			$rootScope.barra = function () {
				$rootScope.titulo = "NO";
			};
			$scope.remove = function (id) {
				estrategiaService.deleteEstrategia(id).then(function (respuesta) {
					_.remove($scope.estrategias, function (e) {
						return e.id == id;
					});
					toastr.warning('Exito', 'Estrategia eliminada');
				});
			};

			$rootScope.barra();


    }])
	//CREAR
	.controller('estrategiaCrearController', ['$scope', 'estrategiaService', '$stateParams', '$location', 'riesgoService', 'toastr', '$rootScope',
		function ($scope, estrategiaService, $stateParams, $location, riesgoService, toastr, $rootScope) {
			$scope.accion = "Guardar";
			$rootScope.titulo = "Crear";

			$scope.riesgos = [];
			$scope.getAllRiesgos = function () {
				riesgoService.getAllRiesgo().then(function (response) {

					$scope.riesgos = response.data;
				});

			};

			$scope.getAllRiesgos();
			//
			console.log($scope.riesgos);
			$scope.guardarEstrategia = function () {
				estrategiaService.createEstrategia($scope.estrategia).then(function (response) {
					estrategiaService.getAllEstrategias().then(function (response2) {
						$rootScope.estrategias = response2.data;
						toastr.success('Exito', 'Estrategia creada');
					});
					$scope.estrategia = {};
				});
			};

	}])
	//EDITAR
	.controller('estrategiaEditarController', ['$scope', 'estrategiaService',
    '$stateParams', '$location', 'riesgoService', 'toastr', '$state', '$rootScope',
	function ($scope, estrategiaService, $stateParams, $location, riesgoService, toastr, $state, $rootScope) {
			$scope.accion = "Actualizar";
			$rootScope.titulo = "Editar";


			$scope.getAllRiesgos = function () {
				$scope.riesgos = [];
				riesgoService.getAllRiesgo().then(function (response) {
					$scope.riesgos = response.data;
				});
			};

			$scope.getEstrategia = function (estrategiaId) {
				estrategiaService.getEstrategiaById(estrategiaId).then(function (response) {
					$scope.estrategia = response.data;

				}, function (response) {
					console.log(response);
					$location.path('/app/estrategia');
				});
			};

			$scope.getAllRiesgos();
			$scope.getEstrategia(parseInt($stateParams.estrategiaId));
			$scope.guardarEstrategia = function () {
				estrategiaService.updateEstrategia($scope.estrategia.id, $scope.estrategia)
					.then(function (response) {
						estrategiaService.getAllEstrategias().then(function (response2) {
							$rootScope.estrategias = response2.data;
							toastr.success('Exito', 'Estrategia actualizada');
							$location.path('/app/estrategia');
						});


					});
			};


	}])



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
