var servicesModule = angular.module('AppServices');
servicesModule.factory('criterioService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllBasedatosEstudiantes: function () {
            return $http.get(this.apiUrl + 'base_datos_estudiantes/');
        },
        getColumn: function (base_datos_estudiantes) {
            return $http.post(this.apiUrl + 'base_datos_estudiantes/column/', base_datos_estudiantes);

        },
        getCriterioById: function (criterioId) {
            return $http.get(this.apiUrl + 'criterio' + criterioId);

        },
        createCriterio: function (criterio) {
            return $http.post(this.apiUrl + 'criterio/', criterio);
        },
        updateCriterio: function (id, criterio) {
            console.log(filtro);
            return $http.put(this.apiUrl + 'Criterio/' + id, criterio);
        },
        deleteCriterio: function (criterioId) {
            return $http.delete(this.apiUrl + 'filtro/' + criterioId);
        }

    };
}]);
