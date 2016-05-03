var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('riesgoController', ['$scope', 'riesgoService',
    '$stateParams', 'toastr',
    function ($scope, riesgoService, $stateParams, toastr) {

            $scope.riesgos = [];
            $scope.getAllRiesgos = function () {
                riesgoService.getAllRiesgo().then(function (response) {
                    console.log(response.data);
                    $scope.riesgos = response.data;
                });

            };

            $scope.getAllRiesgos();

            $scope.remove = function (id) {
                riesgoService.deleteRiesgo(id).then(function (respuesta) {
                    _.remove($scope.riesgos, function (e) {
                        return e.id == id;
                    });
                    toastr.warning('Exito', 'Riesgo eliminado');
                });
            }

    }])
    .controller('riesgoEditarController', ['$scope', 'riesgoService',
    '$stateParams', '$location', 'tipoRiesgoService', 'toastr',
	function ($scope, riesgoService, $stateParams, $location, tipoRiesgoService, toastr) {
            $scope.accion = "Actualizar";
            $scope.titulo = "Editar";

            $scope.tiporiesgos = [];
            $scope.getAllTipoRiesgos = function () {
                tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
                    //console.log(response.data);
                    $scope.tiporiesgos = response.data;
                });

            };
            $scope.getRiesgo = function (riesgoId) {
                riesgoService.getRiesgoById(riesgoId).then(function successCallBack(response) {
                    $scope.riesgo = response.data;
                    //console.log(response.data);

                }, function errorCallBack(response) {
                    console.log(response);
                    $location.path('/app/riesgo');
                });
            };
            $scope.getAllTipoRiesgos();
            $scope.getRiesgo(parseInt($stateParams.riesgoId));
            $scope.guardar = function () {
                riesgoService.updateRiesgo($scope.riesgo.id, $scope.riesgo).then(function (response) {
                    toastr.success('Exito', 'Riesgo actualizado');
                    console.log("scope estrategia", $scope.riesgo);
                });
            }

	}])
    .controller('riesgoCrearController', ['$scope', 'riesgoService', '$stateParams', '$location', 'tipoRiesgoService', 'toastr',
		function ($scope, riesgoService, $stateParams, $location, tipoRiesgoService, toastr) {
            $scope.accion = "Guardar";
            $scope.titulo = "Crear";

            $scope.tiporiesgos = [];
            $scope.getAllTipoRiesgos = function () {
                tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
                    console.log(response.data);
                    $scope.tiporiesgos = response.data;
                    toastr.success('Exito', 'Riesgo creado');
                });

            };

            $scope.getAllTipoRiesgos();
            $scope.guardar = function () {

                riesgoService.createRiesgo($scope.riesgo).then(function (response) {
                    console.log("scope riesgo", $scope.riesgo);
                });
            };

	}]);
