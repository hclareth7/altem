var servicesModule = angular.module('AppServices');
servicesModule.factory('reporteService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getEstudianteRiesgoPrograma: function () {
            return $http.get(this.apiUrl + 'reporte/estudiante_riesgo_programa');
        },
        getConfigAnio: function () {
            return $http.get(this.apiUrl + 'reporte/config/anio');
        },

        getTiposRiesgo: function (){
            return $http.get(this.apiUrl + 'reporte/config/tipos')

        },

        getFactoresRiesgo: function (){
            return $http.get(this.apiUrl + 'reporte/config/factores')

        },

        getFactoresRiesgoByTipo: function (id) {
            return $http.get(this.apiUrl + 'reporte/config/factores/' + id);

        },

        getFilteredRiesgos: function (condiciones){
            return $http.post(this.apiUrl + 'reporte/config/send', condiciones);
        }


    };
}]);
