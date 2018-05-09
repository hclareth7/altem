var servicesModule = angular.module('AppServices');
servicesModule.factory('usuarioService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllUsuario: function () {
            return $http.get(this.apiUrl + 'usuario/');
        },
        getUsuarioById: function (usuarioId) {
            return $http.get(this.apiUrl + 'usuario/' + usuarioId);
        },
        createUsuario: function (usuario) {
            return $http.post(this.apiUrl + 'usuario/', usuario);
        },
        updateUsuario: function (id, usuario) {
            return $http.put(this.apiUrl + 'usuario/' + id, usuario);
        },
        updateRole: function (data) {
            return $http.post(this.apiUrl + 'assign_role/', data);
        },
        deleteUsuario: function (usuarioId) {
            return $http.delete(this.apiUrl + 'usuario/' + usuarioId);
        },
        getAllRoles: function () {
            return $http.get(this.apiUrl + 'role/');
        }



    };
}]);
