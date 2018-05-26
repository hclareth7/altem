var servicesModule = angular.module('AppServices');
servicesModule.factory('filtroService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getEstadosAsistencia: function (){
          return $http.get(this.apiUrl + 'estados_asistencia/')
        },
        getAllFiltros: function () {
            return $http.get(this.apiUrl + 'filtro/');
        },
        getFiltroById: function (filtroId) {
            return $http.get(this.apiUrl + 'filtro/' + filtroId);

        },
        getFiltroByRiesgoId: function (filtroId) {
            return $http.get(this.apiUrl + 'filtro/filtros_riesgo/' + filtroId);

        },
        createFiltro: function (filtro) {
            return $http.post(this.apiUrl + 'filtro/', filtro);
        },
        updateFiltro: function (id, filtro) {
            console.log(filtro);
            return $http.put(this.apiUrl + 'filtro/' + id, filtro);
        },
        deleteFiltro: function (filtroId) {
            return $http.delete(this.apiUrl + 'filtro/' + filtroId);
        }

    };
}]);
