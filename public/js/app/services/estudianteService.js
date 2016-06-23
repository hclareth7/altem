var servicesModule = angular.module('AppServices');
servicesModule.factory('estudianteService', ['$http', function ($http) {
	return {
		apiUrl: apiUrl,
		getAllEstudiantes: function () {
			//return $http.get(this.apiUrl + 'estudiante/');
			return $http.get(this.apiUrl + 'estudiante/');
		},
		getEstudianteById: function (estudianteId) {
			return $http.get(this.apiUrl + 'estudiante/' + estudianteId);
		},getColumnas: function () {
			return $http.get(this.apiUrl + 'estudiante_colums');
		},getEstudiantesByFiltro: function (riesgoId) {
			return $http.get(this.apiUrl + 'estudiante_filtro/'+riesgoId);
		}


	};
}]);
