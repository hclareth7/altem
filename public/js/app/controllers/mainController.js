/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('mainController', ['$scope', 'toastr', 'jwtHelper', '$rootScope', function ($scope, toastr, jwtHelper, $rootScope) {
        var user =jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY));
        //console.log(user);

        
    }])
