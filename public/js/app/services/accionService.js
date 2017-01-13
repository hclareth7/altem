/**
 * Created by Full Stack JavaScrip on 14/06/2016.
 */
var servicesModule = angular.module('AppServices');
servicesModule.factory('accionService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllAcciones: function () {
            return $http.get(this.apiUrl + 'accion/');
        },
        getAccionById: function (accionId) {
            return $http.get(this.apiUrl + 'accion/' + accionId);

        },
        getAccionByEstrategiaId: function (estrategiaId){
            return $http.get(this.apiUrl + 'accion/acciones_estrategia/' + estrategiaId);

        },
        createAccion: function (accion) {
            return $http.post(this.apiUrl + 'accion/', accion);
        },
        updateAccion: function (id, accion) {
            console.log(accion);
            return $http.put(this.apiUrl + 'accion/' + id, accion);
        },
        deleteAccion: function (accionId) {
            return $http.delete(this.apiUrl + 'accion/' + accionId);
        },
        aplicarAccion: function (accion) {
            return $http.post(this.apiUrl + 'accion_aplicada/', accion);
        },
        getAccionAplicada: function (data) {
            return $http.post(this.apiUrl + 'get_accion_aplicada/', data);

        }

    };
}]);
