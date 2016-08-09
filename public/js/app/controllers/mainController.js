/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('mainController', ['$scope', 'toastr', 'jwtHelper', '$rootScope', 'loginService', '$state', 'PermissionStore', 'RoleStore',
        function ($scope, toastr, jwtHelper, $rootScope, loginService, $state, PermissionStore, RoleStore) {
            //var user =jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY));
            // console.log(user);
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

                    console.log(response.data);
                }, function (response) {
                    console.log(response.data);
                });
            };
            $scope.cerrarSesion = function () {
                localStorage.removeItem(TOKEN_KEY);
                PermissionStore.clearStore();
                RoleStore.clearStore();
                $state.go('login');
            };
            $scope.getUser();
        
    }])
