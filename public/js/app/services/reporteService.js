var servicesModule = angular.module('AppServices');
servicesModule.factory('reporteService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getEstudianteRiesgoPrograma: function (condiciones) {
            return $http.post(this.apiUrl + 'reporte/estudiante_riesgo_programa', condiciones);
        },
        getConfigAnio: function () {
            return $http.get(this.apiUrl + 'reporte/config/anio');
        }
    };
}]);
