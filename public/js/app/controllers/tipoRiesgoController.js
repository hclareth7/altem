var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('tipoRiesgoController', ['$scope', 'tipoRiesgoService',
    '$stateParams','toastr',
    function ($scope, tipoRiesgoService, $stateParams,toastr) {

            $scope.tiporiesgos = [];
            $scope.getAllTipoRiesgos = function () {
                tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
                    console.log(response.data);
                    $scope.tiporiesgos = response.data;
                });

            };

            $scope.getAllTipoRiesgos();

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
    '$stateParams', '$location', 'toastr',
	function ($scope, tipoRiesgoService, $stateParams, $location, toastr) {
            $scope.accion = "Actualizar";
            $scope.titulo = "Editar";

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
                    toastr.success('Exito', 'Tipo de riesgo Actualizado');
                    console.log("scope tipo de riesgo", $scope.tiporiesgo);
                });
            }

	}])
    .controller('tipoRiesgoCrearController', ['$scope', 'tipoRiesgoService', '$stateParams', '$location', 'toastr',
		function ($scope, tipoRiesgoService, $stateParams, $location, toastr) {
            $scope.accion = "Guardar";
            $scope.titulo = "Crear";


            $scope.guardar = function () {

                tipoRiesgoService.createTipoRiesgo($scope.tiporiesgo).then(function (response) {
                    console.log("scope tipo riesgo", $scope.tiporiesgo);
                    toastr.success('Exito', 'Tipo de riesgo creado');

                });
            };

	}]);
