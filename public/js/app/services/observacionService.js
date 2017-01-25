/**
 * Created by Full Stack JavaScrip on 24/01/2017.
 */
var servicesModule = angular.module('AppServices');
servicesModule.factory('observacionService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllObservacion: function () {
            return $http.get(this.apiUrl + 'observacion/');
        },
        getObservacionById: function (observacionId) {
            return $http.get(this.apiUrl + 'observacion/' + observacionId);

        },
        createObservacion: function (observacion) {
            return $http.post(this.apiUrl + 'observacion/', observacion);
        },
        updateObservacion: function (id, observacion) {
            console.log(filtro);
            return $http.put(this.apiUrl + 'observacion/' + id, observacion);
        },
        deleteObservacion: function (observacionId) {
            return $http.delete(this.apiUrl + 'observacion/' + observacionId);
        }

    };
}]);
