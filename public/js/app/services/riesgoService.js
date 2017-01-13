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
		getRiesgosFiltrados: function () {
			var riesgos = [
				{
					id: 1,
					nombre: 'RAC001',
					tipo_riesgo: 'Academico',
					descripcion: 'El estudiante presenta un promedio inferior a 3.2.',
					estrategias_aplicada: [
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						},
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						},
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						}
					]
				},
				{
					id: 2,
					nombre: 'RAC002',
					tipo_riesgo: 'Academico',
					descripcion: 'El estudiante presenta un promedio inferior a 3.2.',
					estrategias_aplicada: [
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						},
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						},
						{
							nombre: 'Seguimiento por consejería',
							autor: 'Juan Consejeto SAT',
							fecha_inicio: '2014-08-25 10:25:40',
							fecha_fin: 'N/A',
							descripcion: 'A partir de la identificación de las dificultades académicas del estudiante, se establece un plan de acción, con compromisos y metas asignadas, que tribute a la mejora académica.'

						}
					]
				}

			];
			return riesgos;
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
