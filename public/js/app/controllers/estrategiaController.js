var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('estrategiaController', ['$scope', 'estrategiaService',
    '$stateParams', 'toastr',
    function ($scope, estrategiaService, $stateParams, toastr) {
            $scope.estrategias = [];
            $scope.getAllEstrategias = function () {
                estrategiaService.getAllEstrategia().then(function (response) {
                    //console.log(response.data);
                    $scope.estrategias = response.data;
                });

            };

            $scope.getAllEstrategias();
            //

            $scope.remove = function (id) {
                estrategiaService.deleteEstrategia(id).then(function (respuesta) {
                    _.remove($scope.estrategias, function (e) {
                        return e.id == id;
                    });
                    toastr.warning('Exito', 'Estrategia eliminada');
                });
            }

    }])
    .controller('estrategiaEditarController', ['$scope', 'estrategiaService',
    '$stateParams', '$location', 'riesgoService', 'toastr',
	function ($scope, estrategiaService, $stateParams, $location, riesgoService, toastr) {
            $scope.accion = "Actualizar";
            $scope.titulo = "Editar";

            $scope.riesgos = [];
            $scope.getAllRiesgos = function () {
                riesgoService.getAllRiesgo().then(function (response) {
                    //console.log(response.data);
                    $scope.riesgos = response.data;
                });

            };
            $scope.getEstrategia = function (estrategiaId) {
                estrategiaService.getEstrategiaById(estrategiaId).then(function successCallBack(response) {
                    $scope.estrategia = response.data;
                    toastr.success('Exito', 'Estrategia actualizada');
                    //console.log(response.data);

                }, function errorCallBack(response) {
                    console.log(response);
                    $location.path('/app/estrategia');
                });
            };
            $scope.getAllRiesgos();
            $scope.getEstrategia(parseInt($stateParams.estrategiaId));
            $scope.guardarEstrategia = function () {
                estrategiaService.updateEstrategia($scope.estrategia).then(function (response) {
                    console.log("scope estrategia", $scope.estrategia);
                });
            }

	}])
    .controller('estrategiaCrearController', ['$scope', 'estrategiaService', '$stateParams', '$location', 'riesgoService', 'toastr',
		function ($scope, estrategiaService, $stateParams, $location, riesgoService, toastr) {
            $scope.accion = "Guardar";
            $scope.titulo = "Crear";

            $scope.riesgos = [];
            $scope.getAllRiesgos = function () {
                riesgoService.getAllRiesgo().then(function (response) {
                    console.log(response.data);
                    $scope.riesgos = response.data;
                });

            };

            $scope.getAllRiesgos();
            $scope.guardarEstrategia = function () {

                estrategiaService.createEstrategia($scope.estrategia).then(function (response) {
                    toastr.success('Exito', 'Estrategia creada');
                    console.log("scope estrategia", $scope.estrategia);
                });
            };

	}]);





//Servicios
/**
controllerModule.service('CargarSelectRiesgos',[ '$scope','riesgoService',function ($scope,riesgoService) {
	var cargar = function () {
		$scope.riesgos = [];
		$scope.getAllRiesgos = function () {
			riesgoService.getAllRiesgo().then(function (response) {
				console.log(response.data);
				$scope.riesgos = response.data;
			});

		};
		$scope.getAllRiesgos();
	};

	return cargar;
}])**/
