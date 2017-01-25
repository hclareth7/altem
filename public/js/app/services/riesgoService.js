var servicesModule = angular.module('AppServices');
servicesModule.factory('riesgoService', ['$http', function ($http) {
	return {
		apiUrl: apiUrl,
		getAllRiesgo: function () {
			return $http.get(this.apiUrl + 'riesgo/');
		},
		getRiesgoById: function (riesgoId) {
			return $http.get(this.apiUrl + 'riesgo/' + riesgoId);

		},
		createRiesgo: function (riesgo) {
			return $http.post(this.apiUrl + 'riesgo/', riesgo);
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
