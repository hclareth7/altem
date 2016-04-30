var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('riesgoController', ['$scope', 'riesgoService',
    '$stateParams',
    function ($scope, riesgoService, $stateParams) {

			$scope.riesgos = [];
			$scope.getAllRiesgos = function () {
				estrategiaService.getAllRiesgo().then(function (response) {
					console.log(response.data);
					$scope.riesgos = response.data;
				});

			};

			$scope.getAllRiesgos();

    }])
	.controller('riesgoDetalleController', ['$scope', 'riesgoService',
    '$stateParams', '$location',
	function ($scope, riesgoService, $stateParams, $location) {

			$scope.getZona = function (zonaId) {
				zonaService.getZonaById(zonaId).then(function successCallBack(response) {
					$scope.zona = response.data;
					console.log(response.data);

				}, function errorCallBack(response) {
					console.log(response);
					$location.path('/app/riesgo');
					console.log($location);
				});
			};

			$scope.getZona(parseInt($stateParams.zonaId));

	}])
	.controller('riesgoCrearController', ['$scope', 'riesgoService', '$stateParams', '$location', 'riesgoService',
		function ($scope, riesgoService, $stateParams, $location, riesgoService) {
			$scope.riesgos = [];
			$scope.getAllRiesgos = function () {
				riesgoService.getAllRiesgo().then(function (response) {
					console.log(response.data);
					$scope.riesgos = response.data;
				});

			};
			$scope.getAllRiesgos();
			$scope.guardarRiesgo = function () {

				riesgoService.createRiesgo($scope.riesgo).then(function (response) {
					console.log("scope riesgo", $scope.riesgo);
				});
			};

				}])
