var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('riesgoController',
        ['$scope', 'riesgoService', '$stateParams', 'toastr', '$rootScope', 'filtroService', '$confirm', '$uibModal','$state',
        function ($scope, riesgoService, $stateParams, toastr, $rootScope, filtroService, $confirm, $uibModal,$state) {

            $rootScope.riesgos = [];
            $scope.getAllRiesgos = function () {
                riesgoService.getAllRiesgo().then(function (response) {

                    $rootScope.riesgos = response.data;
                });

            };
            $scope.getAllRiesgos();
            $rootScope.barra = function () {
                $rootScope.titulo = "NO";
            };
            $scope.remove = function (id) {
                $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                    riesgoService.deleteRiesgo(id).then(function (response) {
                        if (response.data != 23000) {
                            _.remove($scope.riesgos, function (e) {
                                return e.id == id;
                            });
                            toastr.warning('Exito', 'Riesgo eliminado');
                        } else {
                            toastr.error('Error', 'Esta intentando eliminar un registro con datos dependientes.');
                        }
                    });

                });
            };
            $scope.removeFiltro = function (id) {
                $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {

                    filtroService.deleteFiltro(id).then(function (response) {
                        if (response.data != 23000) {
                            _.remove($rootScope.filtros, function (e) {
                                return e.id == id;
                            });
                            toastr.warning('Exito', 'Estrategia eliminada');
                        } else {
                            toastr.error('Error', 'Esta intentando eliminar un registro con datos dependientes.');
                        }
                    });


                });
            };

            $scope.openAsignEstrategia = function () {
                if ($rootScope.estrategias_asign) {
                    if ($rootScope.estrategias_asign != 0) {
                        $confirm({text: 'Se borraran las estrategias que agrego,  ¿Seguro que desea seguir?'}).then(function () {
                            var modal = $uibModal.open({
                                templateUrl: 'modal-asignar-estrategia.html',
                                size: 'lg',
                                controller: 'asignarEstrategiaController',
                            });
                        });
                    } else {
                        var modal = $uibModal.open({
                            templateUrl: 'modal-asignar-estrategia.html',
                            size: 'lg',
                            controller: 'asignarEstrategiaController',
                        });
                    }
                } else {
                    var modal = $uibModal.open({
                        templateUrl: 'modal-asignar-estrategia.html',
                        size: 'lg',
                        controller: 'asignarEstrategiaController',
                    });
                }
            };

            $rootScope.getActiveClass = function (state) {
                return ($state.current.name === state) ? 'active' : '';
            };


        }])
    .controller('asignarEstrategiaController', ['$scope', '$rootScope', 'estrategiaService', function ($scope, $rootScope, estrategiaService) {
        $scope.estrategias = [];
        $rootScope.estrategias_asign = [];
        estrategiaService.getAllEstrategias().then(function (response) {
            $scope.estrategias = response.data;
        }, function (error) {
            console.log(error);
        });

        $scope.asignarEstrategia = function (id_estrategia) {
            var estrategia = _.find($scope.estrategias, function (obj) {
                return obj.id === id_estrategia;
            });
            estrategia.estado = 0;

            _.remove($scope.estrategias, function (e) {
                return e.id == id_estrategia;
            });
            $scope.estrategias.push(estrategia);
            $rootScope.estrategias_asign.push(estrategia);

        };


        $scope.eliminarEstrategiaAsig = function (id_estrategia) {
            var estrategia = _.find($scope.estrategias, function (obj) {
                return obj.id === id_estrategia;
            });
            estrategia.estado = 1;

            _.remove($scope.estrategias_asign, function (e) {
                return e.id == id_estrategia;
            });
            //$scope.estrategias.push(estrategia);
            //$rootScope.estrategias_asign.push(estrategia);
           // console.log($rootScope.estrategias_asign);
        };

    }])
    .controller('riesgoEditarController', ['$scope', 'riesgoService',
        '$stateParams', '$location', 'tipoRiesgoService', 'toastr', '$rootScope',
        function ($scope, riesgoService, $stateParams, $location, tipoRiesgoService, toastr, $rootScope) {
            $scope.accion = "Actualizar";
            $rootScope.titulo = "Editar";

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
                    $rootScope.estrategias_asign=$scope.riesgo.estrategias;
                }, function errorCallBack(response) {
                    $location.path('/app/riesgo');
                });
            };
            $scope.getAllTipoRiesgos();
            $scope.getRiesgo(parseInt($stateParams.riesgoId));

            $scope.guardar = function () {
                $scope.riesgo.estrategias = $rootScope.estrategias_asign;
                riesgoService.updateRiesgo($scope.riesgo.id, $scope.riesgo).then(function (response) {

                    riesgoService.getAllRiesgo().then(function (respose2) {
                        $rootScope.riesgos = respose2.data;
                        toastr.success('Exito', 'Riesgo actualizado');
                        $location.path('/app/riesgo');
                    });
                });
            }


        }])
    .controller('riesgoCrearController', ['$scope', 'riesgoService', '$stateParams', '$location', 'tipoRiesgoService', 'toastr', '$rootScope',
        function ($scope, riesgoService, $stateParams, $location, tipoRiesgoService, toastr, $rootScope) {
            $scope.accion = "Guardar";
            $rootScope.titulo = "Crear";
            $rootScope.estrategias_asign=[];
            $scope.tiporiesgos = [];
            $scope.riesgo={};
            $scope.getAllTipoRiesgos = function () {
                tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
                    $scope.tiporiesgos = response.data;

                });

            };

            $scope.getAllTipoRiesgos();


            $scope.guardar = function () {

                $scope.riesgo.estrategias = $rootScope.estrategias_asign;

                console.log($scope.riesgo.estrategias);
                riesgoService.createRiesgo($scope.riesgo).then(function (response) {

                    riesgoService.getAllRiesgo().then(function (respose2) {
                        $rootScope.riesgos = respose2.data;
                        $scope.riesgo = {};
                        toastr.success('Exito', 'Riesgo creado');
                        $rootScope.estrategias_asign=[];
                    });
                });
            };
        }])
    .controller('riesgoDetalleController', ['$scope', 'riesgoService',
        '$stateParams', '$state', 'tipoRiesgoService', 'toastr', '$rootScope', 'filtroService',
        function ($scope, riesgoService, $stateParams, $state, tipoRiesgoService, toastr, $rootScope, filtroService) {
            $rootScope.titulo = "Detalle";

            $scope.getRiesgo = function (riesgoId) {
                riesgoService.getRiesgoById(riesgoId).then(function (response) {
                    $rootScope.riesgo = response.data;
                }, function (response) {
                    //console.log(response);
                    //$location.path('/app/estrategia');
                    $state.go('main.riesgo');
                });
                filtroService.getFiltroByRiesgoId(riesgoId).then(function (response) {
                    $rootScope.filtros = response.data;
                    //console.log($rootScope.acciones);
                });
            };

            $scope.getRiesgo(parseInt($stateParams.riesgoId));

            $rootScope.barra();
        }])
