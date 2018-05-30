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

            $rootScope.getAllRoles = function () {
                usuarioService.getAllRoles().then(function (response) {
                    $scope.roles = response.data;
                }, function (response) {
                    console.log(response);
                });

            };

        }])

    .controller('usuarioCrearController', ['$scope', 'usuarioService', '$stateParams', '$location', 'toastr', '$rootScope',
        function ($scope, usuarioService, $stateParams, $location, toastr, $rootScope) {
            $scope.accion = "Guardar";
            $rootScope.titulo = "Agrega un nuevo usuario!";

            $rootScope.usuarios_asign = [];
            $scope.usuario = {};
            $scope.roles = [];

            $rootScope.getAllRoles();
            $scope.guardar = function () {
                usuarioService.createUsuario($scope.usuario).then(function (response) {
                    toastr.success('Exito', 'Usuario creado!');
                    $scope.getAllRoles();
                });
            };


        }])


    .controller('usuarioEditarController', ['$scope', 'usuarioService',
        '$stateParams', '$location', 'tipoRiesgoService', 'toastr', '$rootScope',
        function ($scope, usuarioService, $stateParams, $location, tipoRiesgoService, toastr, $rootScope) {
            $scope.accion = "Actualizar";
            $rootScope.titulo = "Editar";


            $scope.getUsuario = function (usuarioId) {
                usuarioService.getUsuarioById(usuarioId).then(function successCallBack(response) {
                    $scope.usuario = response.data;
                }, function errorCallBack(response) {
                    console.log(response);
                });
            };

            $rootScope.getAllRoles();
            $scope.getUsuario($stateParams.usuarioId);

            $scope.guardar = function () {

                usuarioService.updateUsuario($stateParams.usuarioId, $scope.usuario).then(function (response) {
                    toastr.success('Exito', 'Usuario actualizado!');
                }, function (response) {
                    console.log(response);

                });
            }


        }])


    .controller('usuarioDetalleController', ['$scope', 'usuarioService',
        '$stateParams', '$state', 'tipoRiesgoService', 'toastr', '$rootScope', 'filtroService',
        function ($scope, usuarioService, $stateParams, $state, tipoRiesgoService, toastr, $rootScope, filtroService) {
            $rootScope.titulo = "Detalle";
            $rootScope.gues_usuario = {};
            $scope.roles = [];

            $rootScope.getUsuario = function (codigo) {
                usuarioService.getUsuarioById(codigo).then(function (response) {
                    $rootScope.gues_usuario = response.data;
                }, function (response) {

                    console.log(response);
                });

            };

            $scope.getAllRoles = function () {
                usuarioService.getAllRoles().then(function (response) {
                    $scope.roles = response.data;
                }, function (response) {

                })
            };

            $scope.getUsuario($stateParams.usuarioId);
            $scope.getAllRoles();


        }])
    .controller('usuarioCriterioCrearController', ['$scope', 'usuarioService',
        '$stateParams', '$state', 'tipoRiesgoService', 'toastr', '$rootScope', 'criterioService',
        function ($scope, usuarioService, $stateParams, $state, tipoRiesgoService, toastr, $rootScope, criterioService) {

            $scope.base_datos_estudiantes = [];
            $scope.campos = [];
            $scope.selected_base_datos = {};
            $scope.criterio = {};
            $scope.getAllBasedatosEstudiantes = function () {
                criterioService.getAllBasedatosEstudiantes().then(function (response) {
                    $scope.base_datos_estudiantes = response.data;
                }, function (response) {
                    console.log(response.data);
                })
            };
            $scope.selectedBaseDatos = function (base_datos) {
                $scope.selected_base_datos = base_datos;
                $scope.getColumn($scope.selected_base_datos);
            };
            $scope.getColumn = function (base_datos_estudiantes) {
                criterioService.getColumn(base_datos_estudiantes).then(function (response) {
                    $scope.campos = response.data;
                }, function (response) {
                    console.log(response.data)
                });

            };
            $scope.guardarCriterio = function () {
                $scope.criterio.codigo = $stateParams.usuarioId;
                $scope.criterio.bases_datos_estudiantes_id = $scope.selected_base_datos.id;

                criterioService.createCriterio($scope.criterio).then(function (response) {
                    $rootScope.getUsuario($stateParams.usuarioId);
                    toastr.success('Exito', 'Criterio Creado!');
                }, function (response) {
                    console.log(response.data);
                });
            }

            $scope.getAllBasedatosEstudiantes();


        }]);

