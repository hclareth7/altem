var servicesModule = angular.module('AppServices');
servicesModule.factory('usuarioService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllUsuario: function () {
            return $http.get(this.apiUrl + 'usuario/');
        },
        getUsuarioById: function (riesgoId) {
            return $http.get(this.apiUrl + 'usuario/' + riesgoId);
        },
        createUsuario: function (usuario) {
            return $http.post(this.apiUrl + 'usuario/', usuario);
        },
        updateRiesgo: function (id, riesgo) {
            return $http.put(this.apiUrl + 'riesgo/' + id, riesgo);
        },
        deleteRiesgo: function (riesgoId) {
            return $http.delete(this.apiUrl + 'riesgo/' + riesgoId);
        },
        riesgoByArchivo:function (data) {
            return $http.post(this.apiUrl + 'riesgo_by_archivo/',data);
        }
    };
}]);
