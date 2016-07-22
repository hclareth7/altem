/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
/**
 * Created by Full Stack JavaScrip on 14/06/2016.
 */
var servicesModule = angular.module('AppServices');
servicesModule.factory('loginService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        auth: function (usuario) {
            return $http({
                method: "POST",
                skipAuthorization: true,
                url: apiUrl + "login/",
                data: usuario
            });
        }

    };
}]);
