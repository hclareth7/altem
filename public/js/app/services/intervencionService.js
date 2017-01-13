var servicesModule = angular.module('AppServices');
servicesModule.factory('intervencionesService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllEstrategias: function () {
            return $http.get(this.apiUrl + 'estrategia/');
        },
        getEstrategiaById: function (estrategiaId) {
            return $http.get(this.apiUrl + 'estrategia/' + estrategiaId);
        },
        createIntervencion: function (intervencion) {
            return $http.post(this.apiUrl + 'intervencion/', intervencion);
        },
       
        deleteIntervencion: function (data) {
            return $http.post(this.apiUrl + 'eliminar_intervencion' , data);
        }

    };
}]);
