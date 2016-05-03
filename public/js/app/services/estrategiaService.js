var servicesModule = angular.module('AppServices');
servicesModule.factory('estrategiaService', ['$http', function ($http) {
    return {
        apiUrl: apiUrl,
        getAllEstrategia: function () {
            return $http.get(this.apiUrl + 'estrategia/');
        },
        getEstrategiaById: function (estrategiaId) {
            return $http.get(this.apiUrl + 'estrategia/' + estrategiaId);

        },
        createEstrategia: function (estrategia) {
            return $http.post(this.apiUrl + 'estrategia/', estrategia);
        },
        updateEstrategia: function (id, estrategia) {
            return $http.put(this.apiUrl + 'estrategia/' + id, {
                estrategia
            }, {
                params: {
                    estrategia
                }
            });
        },
        deleteEstrategia: function (estrategiaId) {
            return $http.delete(this.apiUrl + 'estrategia/' + estrategiaId);
        }

    };
    }]);
