var servicesModule = angular.module('AppServices');
servicesModule.factory('tipoTiesgoService', ['$http', function ($http) {
        return {
            apiUrl: apiUrl,
            getAllTipoRiesgo: function () {
                return $http.get(this.apiUrl + 'tipo_riesgo/');
            },
            getTipoRiesgoById: function (tipoRiesgoId) {
                return $http.get(this.apiUrl + 'tipo_riesgo/' + tipoRiesgoId);

            },
            createTipoRiesgo: function (tipoRiesgo) {
                return $http.put(this.apiUrl + 'tipo_riesgo/', riesgo);
            }
        };
    }]);
