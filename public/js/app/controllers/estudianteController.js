var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('estudianteController', ['$scope', 'estudianteService',
    '$stateParams', 'toastr', '$state', '$rootScope',
    function ($scope, estudianteService, $stateParams, toastr, $state, $rootScope) {
			$rootScope.estudiantes = [];
			$scope.getAllEstudiantes = function () {

				//console.log(response.data);
				$rootScope.estudiantes = estudianteService.getAllEstudiantes();


			};

			$scope.getAllEstudiantes();

			$rootScope.barra = function () {
				$rootScope.titulo = "NO";
			};
			$rootScope.barra();

	}])
	.controller('estudianteIntervencionController', ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$rootScope',
		function ($scope, estudianteService, $stateParams, $location, toastr, $rootScope) {




	}])
	.controller('estudiantePersonalController', ['$scope', 'estudianteService',
    '$stateParams', '$location', 'toastr', '$state', '$rootScope',
	function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope) {

			$scope.getEstudiante = function (estudianteId) {
				$scope.estudiante = estudianteService.getEstudianteById(estudianteId);

			};

			$scope.getEstudiante(parseInt($stateParams.estudianteId));




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
