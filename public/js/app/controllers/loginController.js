/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('loginController', ['$scope', 'loginService', 'toastr', '$state', '$rootScope', 'jwtHelper', 'PermissionStore', 'RoleStore',
        function ($scope, loginService, toastr, $state, $rootScope, jwtHelper,PermissionStore, RoleStore) {
            $scope.login=function (usuario) {

                loginService.auth(usuario).then(function (response) {
                    var token=response.data.token;
                    if(!localStorage.getItem(TOKEN_KEY)){
                        localStorage.setItem(TOKEN_KEY, token);
                        $scope.getUser();
                        //$state.go('main');
                    }

                },function (response) {
                    $scope.usuario={};
                    toastr.error('Error', 'Datos de usuario invalidos');
                });
            };


        $rootScope.usuario = {};
        $scope.getUser = function () {
            loginService.getaAuthUser().then(function (response) {
                $rootScope.usuario = response.data;
                var permissions = $rootScope.usuario.permissions;

                PermissionStore.defineManyPermissions(permissions, function (permissionName) {

                    return _.include(permissions, permissionName);
                });
                var rol = $rootScope.usuario.rol;

                RoleStore.defineRole(rol, permissions);
                $state.go('main');

            }, function (response) {
                if(response.status==401){

                    localStorage.removeItem(TOKEN_KEY);
                    PermissionStore.clearStore();
                    RoleStore.clearStore();
                    $state.go('login');
                    // $state.go('login');

                    toastr.error('El usuario no está [AUTORIZADO]','Error');
                }

                console.log(response.data);
            });
        };


        $scope.verifyToken = function () {
            var token = localStorage.getItem(TOKEN_KEY);
            if (token && !jwtHelper.isTokenExpired(token)) {
                $state.go("main");
            }
        };
        $scope.verifyToken();


    }])
