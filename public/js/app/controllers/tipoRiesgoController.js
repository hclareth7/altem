var controllerModule = angular.module('AppControllers');

controllerModule
	.controller('tipoRiesgoController', ['$scope', 'tipoRiesgoService',
    '$stateParams', 'toastr', '$rootScope',
    function ($scope, tipoRiesgoService, $stateParams, toastr, $rootScope) {

			$rootScope.tiporiesgos = [];
			$scope.getAllTipoRiesgos = function () {
				tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
					$rootScope.tiporiesgos = response.data;
				});

			};

			$scope.getAllTipoRiesgos();
			$rootScope.barra = function () {
				$rootScope.titulo = "NO";
			};

			$scope.remove = function (id) {
				tipoRiesgoService.deleteTipoRiesgo(id).then(function (respuesta) {
					_.remove($scope.tiporiesgos, function (e) {
						return e.id == id;
					});
					toastr.warning('Exito', 'Tipo de riesgo eliminado');
					$scope.getAllTipoRiesgos();
				});
			}

    }])
	.controller('tipoRiesgoEditarController', ['$scope', 'tipoRiesgoService',
    '$stateParams', '$location', 'toastr', '$rootScope',
	function ($scope, tipoRiesgoService, $stateParams, $location, toastr, $rootScope) {
			$scope.accion = "Actualizar";
			$rootScope.titulo = "Editar";

			$scope.getTipoRiesgo = function (tipoRiesgoId) {
				tipoRiesgoService.getTipoRiesgoById(tipoRiesgoId).then(function successCallBack(response) {
					$scope.tiporiesgo = response.data;
					//console.log(response.data);

				}, function errorCallBack(response) {
					console.log(response);
					$location.path('/app/tipo-riesgo');
				});
			};

			$scope.getTipoRiesgo(parseInt($stateParams.tiporiesgoId));
			$scope.guardar = function () {
				tipoRiesgoService.updateTipoRiesgo($scope.tiporiesgo.id, $scope.tiporiesgo).then(function (response) {

					tipoRiesgoService.getAllTipoRiesgo().then(function (respose2) {
						$rootScope.tiporiesgos = respose2.data;
						toastr.success('Exito', 'Tipo de riesgo Actualizado');
						$location.path('/app/tipo-riesgo');
					});

				});
			}

	}])
	.controller('tipoRiesgoCrearController', ['$scope', 'tipoRiesgoService', '$stateParams', '$location', 'toastr', '$rootScope',
		function ($scope, tipoRiesgoService, $stateParams, $location, toastr, $rootScope) {
			$scope.accion = "Guardar";
			$rootScope.titulo = "Crear";


			$scope.guardar = function () {

				tipoRiesgoService.createTipoRiesgo($scope.tiporiesgo).then(function (response) {

					tipoRiesgoService.getAllTipoRiesgo().then(function (respose2) {
						$rootScope.tiporiesgos = respose2.data;
						$scope.tiporiesgo = {};
						toastr.success('Exito', 'Tipo de riesgo creado');

					});


				});
			};

	}]);
