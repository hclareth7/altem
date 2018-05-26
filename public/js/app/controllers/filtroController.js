var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('filtroController', ['$scope', 'riesgoService',
        '$stateParams', 'toastr', '$state', '$rootScope', function ($scope, riesgoService, $stateParams, toastr, $state, $rootScope) {
            console.log("");

        }])
    .controller('filtroCrearController', ['$scope', '$uibModalInstance', 'filtroService', '$rootScope', 'toastr','estudianteService',
        function ($scope, $uibModalInstance, filtroService, $rootScope, toastr,estudianteService) {
            $scope.textTitulo="Crear";

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            estudianteService.getEstudianteColumnas().then(function (response) {
                $scope.campos=response.data;
            });


            $scope.guardarFiltro = function () {
                $scope.filtro.nombre=$rootScope.riesgo.nombre;
                $scope.filtro.riesgos_id = $rootScope.riesgo.id;
                filtroService.createFiltro($scope.filtro).then(function (response) {
                    filtroService.getFiltroByRiesgoId($rootScope.riesgo.id).then(function (response2) {
                        $rootScope.filtros = response2.data;
                        console.log($rootScope.filtros);
                        toastr.success('Exito', 'Filtro agregado');
                    });
                    $scope.filtro = {};
                });
            };


            $rootScope.dbChange = function (idb){

                idb = parseInt(idb);
                console.log("Entro en el dbChange");

                $scope.campos = [];
                switch(idb){

                    case 0:
                        console.log("Seleccionado Estudiante");
                        estudianteService.getEstudianteColumnas().then(function (response){
                            angular.forEach(response.data, function(value){
                                $scope.campos.push(value)
                            });
                        });
                        break;

                    case 1:
                        console.log("Seleccionado Asistencia");
                        filtroService.getEstadosAsistencia().then(function (response){
                            angular.forEach(response.data, function(value){
                                $scope.campos.push(value)
                            });
                        });
                        break;

                    default:
                        $scope.campos = null;


                }

            }

        }])
    .controller('filtroEditarController', ['$scope', '$uibModalInstance', 'filtroService', '$rootScope', 'toastr', '$stateParams','$state','estudianteService',
        function ($scope, $uibModalInstance, filtroService, $rootScope, toastr, $stateParams,$state,estudianteService) {
            $scope.textTitulo="Editar";
            $scope.ok = function () {
                $uibModalInstance.close();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.getFiltro = function (filtroId) {
                filtroService.getFiltroById(filtroId).then(function (response) {
                    $scope.filtro = response.data;

                }, function (response) {
                    $state.go('main.riesgo.detalle');
                });
            };
            $scope.guardarFiltro = function () {
                filtroService.updateFiltro($scope.filtro.id, $scope.filtro).then(function (response) {
                    filtroService.getFiltroByRiesgoId($rootScope.riesgo.id).then(function (response2) {
                        $rootScope.filtros = response2.data;
                        toastr.success('Exito', 'Filtro actualizado');
                        $state.go('main.riesgo.detalle');
                    });
                });
            };
            $scope.getFiltro(parseInt($stateParams.filtroId));
            estudianteService.getEstudianteColumnas().then(function (response) {
                $scope.campos=response.data;
            });

        }]);