var servicesModule = angular.module('AppServices');
servicesModule.factory('riesgoService', ['$http', function ($http) {
        return {
            apiUrl: apiUrl,
            getAllRiesgo: function () {
                return $http.get(this.apiUrl + 'riesgo/');
            },
            getRiesgoById: function (riesgoId) {
                return $http.get(this.apiUrl + 'riesgo/' + riesgoId);

            },
            createRiesgo: function (riesgo) {
                return $http.put(this.apiUrl + 'riesgo/', riesgo);
            }
        };
    }]);
