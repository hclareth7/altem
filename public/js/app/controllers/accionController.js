var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('accionController', ['$scope', 'estrategiaService',
        '$stateParams', 'toastr', '$state', '$rootScope', function ($scope, estrategiaService, $stateParams, toastr, $state, $rootScope) {
            console.log("");

        }])
    .controller('accionCrearController', ['$scope', '$uibModalInstance', 'accionService', '$rootScope', 'toastr',
        function ($scope, $uibModalInstance, accionService, $rootScope, toastr) {
            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.guardarAccion = function () {
                $scope.accion.estrategias_id = $rootScope.estrategia.id;
                accionService.createAccion($scope.accion).then(function (response) {
                    accionService.getAccionByEstrategiaId($rootScope.estrategia.id).then(function (response2) {
                        $rootScope.acciones = response2.data;
                        toastr.success('Exito', 'Accion agregada');
                    });
                    $scope.accion = {};
                });
            };

        }])

    .controller('accionEditarController', ['$scope', '$uibModalInstance', 'accionService', '$rootScope', 'toastr', '$stateParams','$state',
        function ($scope, $uibModalInstance, accionService, $rootScope, toastr, $stateParams,$state) {
           
            $scope.ok = function () {
                $uibModalInstance.close();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.getAccion = function (accionId) {
                accionService.getAccionById(accionId).then(function (response) {
                    $scope.accion = response.data;

                }, function (response) {
                    $state.go('main.estrategia.detalle');
                });
            };
            $scope.guardarAccion = function () {
                accionService.updateAccion($scope.accion.id, $scope.accion).then(function (response) {
                    accionService.getAccionByEstrategiaId($rootScope.estrategia.id).then(function (response2) {
                        $rootScope.acciones = response2.data;
                        toastr.success('Exito', 'Accion actualizada');
                        $state.go('main.estrategia.detalle');
                    });
                });
            };

            $scope.getAccion(parseInt($stateParams.accionId));

        }]);