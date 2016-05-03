var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('estrategiaController', ['$scope', 'estrategiaService',
    '$stateParams', 'toastr', '$state', '$rootScope',
    function ($scope, estrategiaService, $stateParams, toastr, $state, $rootScope) {
			$scope.estrategias = [];
			$scope.getAllEstrategias = function () {
				estrategiaService.getAllEstrategia().then(function (response) {
					//console.log(response.data);
					$scope.estrategias = response.data;
				});

			};

			$scope.getAllEstrategias();

			$rootScope.barra = function () {
				$rootScope.titulo = "NO";

				console.log($rootScope.urlestado);
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
					console.log(response.data);
					$scope.riesgos = response.data;
				});

			};

			$scope.getAllRiesgos();
			$scope.guardarEstrategia = function () {

				estrategiaService.createEstrategia($scope.estrategia).then(function (response) {
					toastr.success('Exito', 'Estrategia creada');
					console.log("scope estrategia", $scope.estrategia);
				});
			};

	}])
	//EDITAR
	.controller('estrategiaEditarController', ['$scope', 'estrategiaService',
    '$stateParams', '$location', 'riesgoService', 'toastr', '$state', '$rootScope',
	function ($scope, estrategiaService, $stateParams, $location, riesgoService, toastr, $state, $rootScope) {
			$rootScope.accion = "Actualizar";
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
				estrategiaService.updateEstrategia($scope.estrategia.id,$scope.estrategia)
					.then(function (response) {
						toastr.success('Exito', 'Estrategia actualizada');
						$location.path('/app/estrategia');
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
