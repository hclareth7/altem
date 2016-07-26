/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('loginController', ['$scope', 'loginService', 'toastr', '$state', '$rootScope', 'jwtHelper', function ($scope, loginService, toastr, $state, $rootScope, jwtHelper) {
            $scope.login=function (usuario) {

                loginService.auth(usuario).then(function (response) {
                    var token=response.data.token;

                    if(!localStorage.getItem(TOKEN_KEY)){
                        localStorage.setItem(TOKEN_KEY,token);
                        $state.go('main');
                        console.log(response.data);
                    }

                },function (response) {
                    $scope.usuario={};
                    toastr.error('Error', 'Datos de usuario invalidos');
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
