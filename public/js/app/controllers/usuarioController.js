var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('usuarioController', ['$scope', 'usuarioService', '$stateParams', 'toastr', '$rootScope', 'filtroService', '$confirm', '$uibModal',
        function ($scope, usuarioService, $stateParams, toastr, $rootScope, filtroService, $confirm, $uibModal) {

            $rootScope.usuarios = [];
            $scope.getAllUsuarios = function () {
                usuarioService.getAllUsuario().then(function (response) {

                    $rootScope.usuarios = response.data;
                });

            };
            $scope.getAllUsuarios();
            $rootScope.barra = function () {
                $rootScope.titulo = "NO";
            };

        }])

    .controller('usuarioEditarController', ['$scope', 'usuarioService',
        '$stateParams', '$location', 'tipoRiesgoService', 'toastr', '$rootScope',
        function ($scope, usuarioService, $stateParams, $location, tipoRiesgoService, toastr, $rootScope) {
            $scope.accion = "Actualizar";
            $rootScope.titulo = "Editar";

            $scope.tiporiesgos = [];
            $scope.getAllTipoRiesgos = function () {
                tipoRiesgoService.getAllTipoRiesgo().then(function (response) {
                    //console.log(response.data);
                    $scope.tiporiesgos = response.data;
                });
            };
            $scope.getUsuario = function (riesgoId) {
                riesgoService.getUsuarioById(riesgoId).then(function successCallBack(response) {
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
    .controller('usuarioCrearController', ['$scope', 'usuarioService', '$stateParams', '$location', 'toastr', '$rootScope',
        function ($scope, usuarioService, $stateParams, $location, toastr, $rootScope) {
            $scope.accion = "Guardar";
            $rootScope.titulo = "Crear";
            $rootScope.usuarios_asign=[];
            $scope.usuario={};

            $scope.guardar = function () {

                //console.log($scope.riesgo.estrategias);
                usuarioService.createUsuario($scope.usuario).then(function (response) {

                    usuarioService.getAllUsuario().then(function (respose2) {
                        $rootScope.usuarios = respose2.data;
                        $scope.usuario = {};
                        toastr.success('Exito', 'Usuario creado');
                        $rootScope.usuarios_asign=[];
                    });
                });
            };
        }])


    .controller('usuarioDetalleController', ['$scope', 'usuarioService',
        '$stateParams', '$state', 'tipoRiesgoService', 'toastr', '$rootScope', 'filtroService',
        function ($scope, usuarioService, $stateParams, $state, tipoRiesgoService, toastr, $rootScope, filtroService) {
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
