var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('estudianteController', ['$scope', 'estudianteService'

        , '$stateParams', 'toastr', '$state', '$rootScope'

        , function ($scope, estudianteService, $stateParams, toastr, $state, $rootScope) {
            $rootScope.estudiantes = [];
            $scope.getAllEstudiantes = function () {
                estudianteService.getAllEstudiantes().then(function (response) {
                    $rootScope.estudiantes = response.data;

                });

            };

            $scope.getAllEstudiantes();

            $rootScope.barra = function () {
                $rootScope.titulo = "NO";
            };
            $rootScope.barra();

	}])
    .controller('estudianteIntervencionController', ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$rootScope'

        , function ($scope, estudianteService, $stateParams, $location, toastr, $rootScope) {




	}])
    .controller('estudiantePersonalController', ['$scope', 'estudianteService'

        , '$stateParams', '$location', 'toastr', '$state', '$rootScope', '$uibModal'

        , function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope, $uibModal) {

            $scope.getEstudiante = function (estudianteId) {
                estudianteService.getEstudianteById(estudianteId).then(function (response) {
                    $scope.estudiante = response.data;
                });


            };
            $scope.getEstudiante($stateParams.estudianteId);

            $scope.getEdad = function (fecha_na) {
                var ANIO_ACTUAL =new Date().getFullYear();
                var FECHA_NA = new Date(fecha_na).getFullYear();
                console.log(ANIO_ACTUAL - FECHA_NA);
                return ANIO_ACTUAL - FECHA_NA;
            };

           //console.log($scope.getEdad('1991-11-25'));


            $scope.isPanel = false;
            $scope.closeThis = function () {
                $scope.isPanel = false;

            };


}]);
/**
$scope.open = function (size) {

				var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					windowTemplateUrl: 'windows.html',
					templateUrl: 'modal.html',
					controller: 'ModalInstanceCtrl',
					size: size,
					resolve: {
						items: function () {
							return $scope.items;
						}
					}
				});
			};

controllerModule.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);

**/

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
