var controllerModule = angular.module('AppControllers');

controllerModule
    .controller('estudianteController', ['$scope', 'estudianteService', '$stateParams', 'toastr', '$state', '$rootScope', 'filtroService', '$uibModal',
        function ($scope, estudianteService, $stateParams, toastr, $state, $rootScope, filtroService, $uibModal) {
            $rootScope.estudiantes = [];
            $scope.maxSize = 7;
            $scope.limit = 10;
            $scope.n_datos_p_pagina = $scope.limit;
            $scope.currentPage = 1;
            $scope.getAllEstudiantes = function (currentPage) {
                var data = {
                    de: (currentPage - 1) * $scope.limit,
                    a: $scope.limit
                };
                estudianteService.getAllEstudiantes(data).then(function (response) {
                    $rootScope.estudiantes = response.data;
                    if ($rootScope.estudiantes.length > 0) {
                        $scope.totalItems = $rootScope.estudiantes[0].total[0].total;
                    } else {
                        $scope.totalItems = 0;
                    }
                });
            };
            $scope.getColumsEstudiantes = function (obj) {
                var keys = [];
                for (var key in obj) {
                    keys.push(key);
                }
                return keys;
            };


            $scope.getFiltrosByEstudiantes = function (id) {

                estudianteService.getEstudiantesByFiltro(id).then(function (response) {
                    $rootScope.estudiantes = response.data;
                });
            };
            $scope.getAllEstudiantes(1);
            $rootScope.barra = function () {
                $rootScope.titulo = "NO";
            };
            $rootScope.barra();

            $scope.pageChanged = function (currentPage) {
                $scope.getAllEstudiantes(currentPage);
            };
            $scope.buscarEstudiante = function (string) {
                if (string == "") {
                    $scope.getAllEstudiantes(1);
                    $scope.desabilitar_pag = false;
                } else {
                    var data = {
                        de: ($scope.currentPage - 1) * $scope.limit,
                        a: $scope.limit,
                        string: string
                    }
                    estudianteService.getEstudiantesSearch(data).then(function (response) {
                        $rootScope.estudiantes = response.data;

                        if ($rootScope.estudiantes.length > 0) {
                            $scope.totalItems = $rootScope.estudiantes[0].total[0].total;
                        } else {
                            $scope.totalItems = 0;
                        }
                        $scope.desabilitar_pag = true;
                        console.log($scope.totalItems);
                    }, function (error) {
                        console.log(error);
                    });
                }
            };

            filtroService.getAllFiltros().then(function (response) {
                $scope.filtros = response.data;
            });

        }])

    .filter('reverse', function() {
        return function(items) {
            return items;
        };
    })

    .controller('cargarFiltroController', ['$scope', '$uibModalInstance', 'filtroService', function ($scope, $uibModalInstance, filtroService) {

    }])
    .controller('estudianteIntervencionController',
        ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$rootScope',
            function ($scope, estudianteService, $stateParams, $location, toastr, $rootScope) {


            }])
    .controller('estudiantePersonalController',
        ['$scope', 'estudianteService', '$stateParams', '$location', 'toastr', '$state', '$rootScope', '$uibModal', 'archivoPersonalService', 'accionService','$confirm',
            function ($scope, estudianteService, $stateParams, $location, toastr, $state, $rootScope, $uibModal, archivoPersonalService, accionService,$confirm) {


                $scope.getEstudiante = function (estudianteId) {
                    $rootScope.estudiante = {};
                    estudianteService.getEstudianteById(estudianteId).then(function (response) {
                        $rootScope.estudiante = response.data;
                    });

                };

                $scope.getEstudiante($stateParams.estudianteId);
                $rootScope.getRiesgosByEstudiantes = function () {
                    //$scope.archivoPersonal=[];

                    estudianteService.getRiesgosByEstudiante($stateParams.estudianteId).then(function (response) {
                        var archivo = response.data;
                        archivo.forEach(function (item, index) {
                            if (item.intervenciones) {
                                item.intervenciones.forEach(function (item1, index1) {
                                    item1.acciones_aplicadas.forEach(function (item2, index2) {
                                        if (item1.estrategias_id === item1.estrategias.id && item1.id === item2.intervenciones_id) {
                                            item1.estrategias.acciones.forEach(function (item3, index3) {
                                                if (item3.id === item2.acciones_id) {
                                                    item3.estado = item2.estado;
                                                }

                                            });
                                        }

                                    });
                                });
                            }
                        });

                        $scope.archivoPersonal = archivo;
                        console.log($scope.archivoPersonal);
                        //$rootScope.idArchivo = response.data[0].id;
                        $rootScope.codigoEstudiante = parseInt($stateParams.estudianteId);
                        //console.log($stateParams.estudianteId);
                    });
                };
                $rootScope.getRiesgosByEstudiantes();

                $scope.getEdad = function (fecha_na) {
                    var ANIO_ACTUAL = new Date().getFullYear();
                    var FECHA_NA = new Date(fecha_na).getFullYear();

                    return ANIO_ACTUAL - FECHA_NA;
                };

                $scope.showPanel = function () {
                    $scope.isPanel = true;


                };

                $scope.closePanel = function () {
                    $scope.isPanel = false;

                };

                $scope.open = function () {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        windowTemplateUrl: 'windows.html',
                        templateUrl: 'modal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                };


                $scope.agregarRiesgo = function (id_riesgo, codigo_usuario, id_estudiante, programa_estudiante) {

                    $scope.archivo = {
                        fecha_reporte: new Date(),
                        riesgos_id: id_riesgo,
                        estudiantes_altem_codigo: id_estudiante.toLowerCase(),
                        programa_estudiante: programa_estudiante,
                        usuarios_codigo: codigo_usuario,
                        estado: 0
                    };
                    archivoPersonalService.createArchivo($scope.archivo).then(function (response) {
                        $rootScope.getRiesgosByEstudiantes();
                        toastr.success('Exito', 'Riesgo agregado');
                    }, function (error) {
                        console.log(error);
                    });


                };
                //$rootScope.now = new Date();


                $scope.agregarAccion = function (intevencionId, accionId) {
                    var accion = {
                        fecha_aplicacion: new Date(),
                        intervenciones_id: intevencionId,
                        acciones_id: accionId,
                        estado: 0
                    };
                    accionService.aplicarAccion(accion).then(function (response) {
                        toastr.success('Exito', 'Accion iniciada');
                        $rootScope.getRiesgosByEstudiantes();
                    }, function (error) {
                        console.log(error);
                    });
                };


                $scope.eliminarArchivo = function (idRiesgo) {
                    var data = {
                        idriesgo: idRiesgo,
                        codigo_estudiante: $stateParams.estudianteId
                    };
                    $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                        archivoPersonalService.deleteArchivo(data).then(function (response) {
                            $rootScope.getRiesgosByEstudiantes();
                            toastr.warning('Exito', 'Riesgo Eliminado');
                        }, function (error) {
                            console.log(error.data.status);
                            if (error.data.status) {

                            }
                        });

                    });
                };

            }])
    .controller('archivoPersonalCrearController',
        ['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope', 'riesgoService', '$uibModalInstance', '$confirm', 'accionService',
            function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope, riesgoService, $uibModalInstance, $confirm, accionService) {
                $rootScope.getAllRiesgos = function () {
                    var data = {
                        codigo_estudiante: $stateParams.estudianteId
                    };

                    riesgoService.riesgoByArchivo(data).then(function (response) {
                        //console.log(response.data);
                        $scope.riesgos = response.data;
                    });

                };
                $rootScope.getAllRiesgos();
                $scope.agregarRiesgo = function (id_riesgo) {
                    $scope.archivo = {
                        fecha_reporte: new Date(),
                        riesgos_id: id_riesgo,
                        estudiantes_altem_codigo: $rootScope.estudiante.ID.toLowerCase(),
                        programa_estudiante: $rootScope.estudiante.PROGRAMA,
                        usuarios_codigo: $rootScope.usuario.codigo,
                        estado: 0
                    };

                    archivoPersonalService.createArchivo($scope.archivo).then(function (response) {
                        $rootScope.getRiesgosByEstudiantes();
                        $rootScope.getAllRiesgos();
                        toastr.warning('Exito', 'Riesgo agregado');
                    }, function (error) {
                        console.log(error);
                    });
                    //console.log($scope.archivo);
                };


                $scope.cerrarModal = function () {

                    $uibModalInstance.dismiss();

                };


            }])
    .controller('intervencionCrearController',
        ['$scope', 'archivoPersonalService', '$stateParams', '$location', 'toastr', '$rootScope', 'estrategiaService', 'intervencionesService', '$confirm', '$uibModalInstance',
            function ($scope, archivoPersonalService, $stateParams, $location, toastr, $rootScope, estrategiaService, intervencionesService, $confirm, $uibModalInstance) {

                $scope.estrategias = [];
                $rootScope.cargarEstrategias = function (data) {
                    estrategiaService.getEstrategiaByRiesgoId(data).then(function (response) {
                        $scope.estrategias = response.data;

                    }, function (error) {
                        console.log(error);
                    })
                };
                var idRiesgo = parseInt($stateParams.riesgoId);
                var idPersonal = parseInt($stateParams.archivoId);
                var data1 = {
                    id: idRiesgo,
                    idpersonal: idPersonal
                };

                $rootScope.cargarEstrategias(data1);

                $scope.agregarEstrategia = function (idEstrategia) {

                    $scope.intervencion = {
                        fecha_inicio: new Date(),
                        estado: 0,
                        estrategias_id: idEstrategia,
                        archivo_personal_id: parseInt($stateParams.archivoId),
                        usuarios_codigo: $rootScope.usuario.codigo
                    };
                    intervencionesService.createIntervencion($scope.intervencion).then(function (response) {
                        $rootScope.getRiesgosByEstudiantes();
                        $rootScope.cargarEstrategias(data1);
                        toastr.success('Exito', 'Estrategia agregada');
                    }, function (error) {
                        console.log(error);
                    })
                };


                $scope.eliminarIntervencion = function (idEstrategia) {
                    var data = {
                        idestrategia: idEstrategia,
                        idarchivo: parseInt($stateParams.archivoId)
                    };
                    $uibModalInstance.dismiss();
                    $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                        intervencionesService.deleteIntervencion(data).then(function (response) {
                            $rootScope.getRiesgosByEstudiantes();
                            $rootScope.cargarEstrategias(data1);
                            window.history.back();
                            toastr.warning('Exito', 'Estrategia Eliminada');

                        }, function (error) {
                            console.log(error);
                        });

                    });
                };

                $scope.cerrarModal = function () {

                    $uibModalInstance.dismiss();

                }
            }])
    .controller('accionConfigController',
        ['$scope', 'accionService', '$stateParams', '$location', 'toastr', '$rootScope', '$confirm', '$uibModalInstance', 'observacionService',
            function ($scope, accionService, $stateParams, $location, toastr, $rootScope, $confirm, $uibModalInstance, observacionService) {
                $scope.getAccionById = function () {
                    var data = {
                        intervencionId: $stateParams.intervencionId,
                        accionId: $stateParams.accionId
                    };
                    accionService.getAccionAplicada(data).then(function (response) {
                        $scope.configuracion = response.data;
                        //console.log($scope.configuracion);
                    }, function (error) {
                        console.log(error);
                    });
                };
                $scope.getAccionById();

                $scope.eliminarAccionAplicada = function (accionAplicadaId) {
                    $uibModalInstance.dismiss();
                    $confirm({text: '¿Seguro que desea eliminar la accion?'}).then(function () {
                        accionService.deleteAccionAplicada(accionAplicadaId).then(function (response) {
                            $rootScope.getRiesgosByEstudiantes();
                            //window.history.back();
                            //toastr.warning('Exito', 'Estrategia Eliminada');
                            toastr.warning('Exito', 'Accion Eliminada');
                        }, function (error) {
                            console.log(error);
                        });
                    }, function (no) {
                        window.history.back();
                    });
                };

                $scope.cambiarEstado = function (accionAplicada) {

                    //	console.log(accionAplicada);
                    accionService.updateAccionAplicada(accionAplicada.id, accionAplicada).then(function (response) {
                        $rootScope.getRiesgosByEstudiantes();
                        toastr.success('Exito', 'Accion Actualizada');
                    }, function (error) {
                        console.log(error);
                    });
                };
                $scope.agregarObservacion = function (contenido, accionAplicadaId) {
                    var observacion = {};
                    observacion.acciones_aplicadas_id = accionAplicadaId;
                    observacion.fecha = new Date();
                    observacion.usuarios_codigo = $rootScope.usuario.codigo;
                    observacion.contenido = contenido;
                    observacionService.createObservacion(observacion).then(function (response) {
                        $scope.configuracion.observaciones.push(observacion);
                        toastr.success('Exito', 'Observacion Agregada');
                    }, function (error) {
                        console.log(error);
                    });
                };


                $scope.eliminarObservacion = function (id) {
                    $uibModalInstance.dismiss();
                    $confirm({text: '¿Seguro que desea eliminar?'}).then(function () {
                        observacionService.deleteObservacion(id).then(function (response) {
                            $rootScope.getRiesgosByEstudiantes();
                            //$rootScope.getAllRiesgos();
                            window.history.back();
                            toastr.warning('Exito', 'Observacion  Eliminada');
                        }, function (error) {
                            console.log(error.data.status);

                        });

                    });
                };


            }]);




