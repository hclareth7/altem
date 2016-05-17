var servicesModule = angular.module('AppServices');
servicesModule.factory('estudianteService', ['$http', function ($http) {


	var estudiantes = [
		{
			id: 1,
			codigo: "t00020904",
			nombres: "Homero J",
			apellidos: "Simpson",
			programa: "Ingenieria de sistemas",
			edad: 29,
			direccion: "Avenida SiempreViva (Evergeen) 742",
			correo: "hsimpson@gmail.com",
			telefono: "313 676 6738",
			estrato: 1,
			PGA: 3.5,
			nivel: 2,
			situacionAcademica: "Normal",
			tipo: "",
			notas: [],
			cursos: [],
			finaciacion: "ICETEX",
			horario: [],
			notasFinales: []
		},
		{
			id: 2,
			codigo: "t00022051",
			nombres: "Fredy ",
			apellidos: "Mendaza Vargas",
			programa: "Ingenieria de sistemas",
			edad: 29,
			direccion: "Avenida SiempreViva (Evergeen) 742",
			correo: "hsimpson@gmail.com",
			telefono: "313 676 6738",
			estrato: 1,
			PGA: 3.5,
			nivel: 2,
			situacionAcademica: "Normal",
			tipo: "",
			notas: [],
			cursos: [],
			finaciacion: "ICETEX",
			horario: [],
			notasFinales: []
		},
		{
			id: 3,
			codigo: "t00033039",
			nombres: "Luis Giovanny",
			apellidos: "Carreño Ortiz",
			programa: "Ingenieria de sistemas",
			edad: 29,
			direccion: "Avenida SiempreViva (Evergeen) 742",
			correo: "hsimpson@gmail.com",
			telefono: "313 676 6738",
			estrato: 1,
			PGA: 3.5,
			nivel: 2,
			situacionAcademica: "Normal",
			tipo: "",
			notas: [],
			cursos: [],
			finaciacion: "ICETEX",
			horario: [],
			notasFinales: []
		}
		, {
			id: 4,
			codigo: "t00019038",
			nombres: "Jorge Carlos Alberto",
			apellidos: "Franco Ibañez",
			programa: "Ingenieria de sistemas",
			edad: 29,
			direccion: "Avenida SiempreViva (Evergeen) 742",
			correo: "hsimpson@gmail.com",
			telefono: "313 676 6738",
			estrato: 1,
			PGA: 3.5,
			nivel: 2,
			situacionAcademica: "Normal",
			tipo: "",
			notas: [],
			cursos: [],
			finaciacion: "ICETEX",
			horario: [],
			notasFinales: []
		}
	];

	return {
		apiUrl: apiUrl,
		getAllEstudiantes: function () {
			//return $http.get(this.apiUrl + 'estudiante/');
			return estudiantes;
		},
		getEstudianteById: function (estudianteId) {
			//return $http.get(this.apiUrl + 'estudiante/' + estudianteId);
			var estudiante = _.find(estudiantes, function (e) {
				return e.id === estudianteId;
			});
			//console.log(estudiante);
			return estudiante;

		}

	};
}]);
