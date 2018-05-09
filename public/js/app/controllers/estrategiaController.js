var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('estrategiaController', ['$scope', 'estrategiaService',
        '$stateParams', 'toastr', '$state', '$rootScope', 'accionService', '$confirm',
        function ($scope, estrategiaService, $stateParams, toastr, $state, $rootScope, accionService, $confirm) {
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
                $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                    estrategiaService.deleteEstrategia(id).then(function (respuesta) {
                        _.remove($scope.estrategias, function (e) {
                            return e.id == id;
                        });
                        toastr.warning('Exito', 'Estrategia eliminada');
                    });
                });


            };

            $scope.removeAccion = function (id) {
                $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                    accionService.deleteAccion(id).then(function (respuesta) {
                        _.remove($rootScope.acciones, function (e) {
                            return e.id == id;
                        });
                        toastr.warning('Exito', 'Estrategia eliminada');
                    });
                });
            };

            $rootScope.barra();

            $rootScope.getActiveClass = function (state) {
                return ($state.current.name === state) ? 'active' : '';
            };


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
            $rootScope.estrategia = {};
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
    //DETALLE

    .controller('estrategiaDetalleController', ['$scope', 'estrategiaService',
        '$stateParams', 'toastr', '$state', '$rootScope', 'accionService', '$uibModal',
        function ($scope, estrategiaService, $stateParams, toastr, $state, $rootScope, accionService, $uibModal) {
            //$scope.accion = "Actualizar";
            $rootScope.titulo = "Detalle";

            $scope.getEstrategia = function (estrategiaId) {
                estrategiaService.getEstrategiaById(estrategiaId).then(function (response) {
                    $rootScope.estrategia = response.data;
                }, function (response) {
                    //console.log(response);
                    $location.path('/app/estrategia');
                });
                accionService.getAccionByEstrategiaId(estrategiaId).then(function (response) {
                    $rootScope.acciones = response.data;
                    //console.log($rootScope.acciones);
                });
            };

            $scope.getEstrategia(parseInt($stateParams.estrategiaId));

            $rootScope.barra();


        }])
/*.controller('ModalAccionCtrl', ['$scope', '$uibModalInstance', 'estrategia', 'accionService', '$rootScope','toastr',
    function ($scope, $uibModalInstance, estrategia, accionService, $rootScope,toastr) {
        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.estrategia = estrategia;


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.guardarEstrategia = function () {
            $scope.accion.estrategias_id = $scope.estrategia.id;
            accionService.createAccion($scope.accion).then(function (response) {
                accionService.getAccionByEstrategiaId($scope.estrategia.id).then(function (response2) {
                    $rootScope.acciones = response2.data;
                    toastr.success('Exito', 'Accion agregada');
                });
                $scope.accion = {};
            });
        };

    }]);
*/

//Servicios

