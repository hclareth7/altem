/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('reporteController', ['$scope', 'toastr', 'jwtHelper', '$rootScope', 'reporteService', '$state', '$uibModal',

        function ($scope, toastr, jwtHelper, $rootScope, reporteService, $state, $uibModal) {
            //var user =jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY));
            console.log("Reporte");


            $scope.open = function () {
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'configReporte.html',
                    controller: 'configReporteCtrl'
                });
            };

            $scope.openGraphic = function () {
                var modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'graficaReporte.html',
                    size:'lg',
                    windowClass: '',
                    controller: 'graficaReporteCtrl'
                });
            };


            $rootScope.condiciones = {
                anio: new Date().getFullYear(),
                periodo: '1'
            };

            $rootScope.getReporte = function () {

                reporteService.getEstudianteRiesgoPrograma($scope.condiciones)
                    .then(function (response) {
                        $scope.reportes = response.data;
                        // console.log($scope.reportes);
                    }, function (error) {
                        console.log(error);
                    });
            };

            $rootScope.getReporte();

        }])
    .controller('configReporteCtrl', ['$uibModalInstance', '$scope', 'reporteService', '$rootScope',
        function ($uibModalInstance, $scope, reporteService, $rootScope) {

            $scope.periodos = [
                {periodo: 1},
                {periodo: 2}
            ];

            $rootScope.getConfigAnio = function () {
                reporteService.getConfigAnio().then(function (response) {
                    $scope.anios = response.data;

                }, function (error) {
                    console.log(error);
                })
            };
            $rootScope.getConfigAnio();
            $scope.ok = function () {
                $rootScope.getReporte();
                $uibModalInstance.dismiss('cancel');
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }])
    .controller('graficaReporteCtrl', [ '$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            console.log("Grafica");


        }]).controller('reporteGraficaTiporiesgo', ['$scope', 'reporteService', '$rootScope'
    , function ($scope, reporteService, $rootScope) {
        console.log("Tipo de riesgo");
        $scope.labels = ['Academico', 'Económico', 'Económico', 'Institucional'];

        $scope.colors = ['#f96868','#3aa99e','#f2a654','#f96868'];

        $scope.data = [
            [0, 59, 40, 10]
        ];



    }])
    .controller('reporteGraficaEstrategia', ['$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            $scope.labels = ['Asesoría Psicológica', 'Monitorías Académicas', 'Ligas de Cálculo I', 'Ligas de Algoritmo', 'Curso de 20 semanas en Cálculo', 'Talleres ', 'Curso de Asistencia Académica'];
            $scope.series = ['Series A'];
            $scope.colors = ['#f2a654'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40]
            ];

        }])
    .controller('reporteGraficaRiesgo', ['$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            $scope.labels = ['RAC001', 'RAC002', 'RAC003', 'RAC004', 'RAC005', 'RAC006', 'RAC007', 'RAC008', 'RAC009', 'RAC0010', 'RAC0011', 'RAC0012', 'RAC0013', 'REC001'];
            $scope.series = ['Series A'];
            $scope.colors = [ '#46be8a'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40,56, 56, 52,56, 55,0,13,53]
            ];



        }])
    .controller('reporteGraficaEvaluaciones', ['$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];
            $scope.colors = ['#62a8ea', '#36ab7a'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];



        }])
    .controller('reporteGraficaEvaluaciones', ['$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];
            $scope.colors = ['#62a8ea', '#36ab7a'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];



        }])
    .controller('reporteGraficaOtros', ['$scope', 'reporteService', '$rootScope'
        , function ($scope, reporteService, $rootScope) {

            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];
            $scope.colors = ['#62a8ea', '#36ab7a'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 100],
                [28, 48, 40, 19, 86, 27, 90]
            ];



        }])




