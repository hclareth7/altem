/**
 * Created by Full Stack JavaScrip on 21/07/2016.
 */
var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('reporteController', ['$scope', 'toastr', 'jwtHelper', '$rootScope', 'reporteService', '$state', '$uibModal',

        function ($scope, toastr, jwtHelper, $rootScope, reporteService, $state, $uibModal) {
            //var user =jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY));

            // console.log(user);


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
                   windowClass:'modal-just-me',
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
    .controller('graficaReporteCtrl', ['$uibModalInstance', '$scope', 'reporteService', '$rootScope'
        , function ($uibModalInstance, $scope, reporteService, $rootScope) {
            sola
            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];
            $scope.colors=['#62a8ea','#36ab7a'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];


            $scope.ok = function () {
                $rootScope.getReporte();
                $uibModalInstance.dismiss('cancel');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);
