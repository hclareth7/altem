/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('mainController', ['$scope', 'toastr', 'jwtHelper', '$rootScope', 'loginService', '$state', 'PermissionStore', 'RoleStore',
        function ($scope, toastr, jwtHelper, $rootScope, loginService, $state, PermissionStore, RoleStore) {
            //var user =jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY));
            // console.log(user);
            console.log($rootScope.usuario);
            $scope.cerrarSesion = function () {
                localStorage.removeItem(TOKEN_KEY);
                PermissionStore.clearStore();
                RoleStore.clearStore();
                $state.go('login');
            };

        
    }])
