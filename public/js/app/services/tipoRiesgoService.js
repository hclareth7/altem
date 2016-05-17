var servicesModule = angular.module('AppServices');
servicesModule.factory('tipoRiesgoService', ['$http', function ($http) {
	return {
		apiUrl: apiUrl,
		getAllTipoRiesgo: function () {
			return $http.get(this.apiUrl + 'tipo_riesgo/');
		},
		getTipoRiesgoById: function (tipoRiesgoId) {
			return $http.get(this.apiUrl + 'tipo_riesgo/' + tipoRiesgoId);

		},
		createTipoRiesgo: function (tipoRiesgo) {
			return $http.post(this.apiUrl + 'tipo_riesgo/', tipoRiesgo);
		},
		updateTipoRiesgo: function (id, tipoRiesgo) {
			return $http.put(this.apiUrl + 'tipo_riesgo/' + id, tipoRiesgo);
		},
		deleteTipoRiesgo: function (tipoRiesgoId) {
			return $http.delete(this.apiUrl + 'tipo_riesgo/' + tipoRiesgoId);
		}
	};
    }]);
