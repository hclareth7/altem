<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



Route::group(['prefix' => 'api'], function () {
    Route::post('login', 'ApiAuthController@authenticate');
    Route::get('riesgos_estudinate/{id}', 'EstudianteController@getRiesgosByEstudiante');
    Route::get('personal/{codigo}', 'ArchivoPersonalController@getRiesgosPersonalByEstudiantes');
    Route::get('reporte/estudiante_riesgo_programa', 'ReporteController@archivo_personal');
    Route::get('reporte/config/anio', 'ReporteController@getAnios');
    Route::get('reporte/config/factores/', 'ReporteController@getRiesgos');
    Route::get('reporte/config/factores/{id}', 'ReporteController@getRiesgosByTipo');
    Route::get('reporte/config/tipos', 'ReporteController@getRiesgosName');
    Route::post('reporte/config/send', 'ReporteController@filtrarQuery');
    Route::get('personal/{codigo}', 'ArchivoPersonalController@getRiesgosPersonalByEstudiantes');
    Route::get('riesgos_archivo/{codigo}', 'ArchivoPersonalController@riesgoAgregado');
    Route::post('eliminar_intervencion', 'IntervencionController@deleteIntervencion');
    Route::post('eliminar_archivo', 'ArchivoPersonalController@deleteArchivo');
    Route::post('riesgo_by_archivo', 'RiesgoController@riesgo_by_archivo');
    Route::resource('usuario', 'UsuarioController');





    // Adding JWT Auth Middleware to prevent invalid access
    Route::group(['middleware' => 'jwt.auth'], function () {

        Route::group(['middleware' => ['role:ADMIN|CONSE|PSICO']], function () {
            Route::post('estudiantes_all', 'EstudianteController@getEstudiantesByUser');
            Route::post('estudiantes_buscar', 'EstudianteController@buscar');
            Route::resource('login', 'ApiAuthController', ['only' => ['index']]);
            Route::get('estudiante_filtro/{id}', 'EstudianteController@ejecutarFiltro');

            Route::resource('intervencion', 'IntervencionController');
            Route::resource('observacion', 'ObservacionController');
            Route::resource('accion_aplicada', 'AccionAplicadaController');
            Route::post('get_accion_aplicada', 'AccionAplicadaController@getAccionAplicada');

            Route::get('estudiante_colums', 'EstudianteController@getColumn');
            Route::resource('estudiante', 'EstudianteController');
            Route::resource('tipo_riesgo', 'TipoRiesgoController');
            Route::resource('estrategia', 'EstrategiaController');
            Route::post('estrategia_by_riesgo', 'EstrategiaController@estrategiaByRiesgoId');
            Route::resource('accion', 'AccionController');
            Route::get('accion/acciones_estrategia/{id}', 'AccionController@getByEstrategia');
            Route::resource('tipo_riesgo', 'TipoRiesgoController');
            Route::resource('riesgo', 'RiesgoController');
            Route::resource('filtro', 'FiltroController');
            Route::resource('archivo_personal', 'ArchivoPersonalController');
            Route::get('filtro/filtros_riesgo/{id}', 'FiltroController@getByRiesgo');

            Route::post('role', 'UsuarioController@createRole');
// Route to create a new permission
            Route::post('permission', 'UsuarioController@createPermission');
// Route to assign role to user
            Route::post('assign_role', 'UsuarioController@assignRole');
// Route to attache permission to a role
            Route::post('attach_permission', 'UsuarioController@attachPermission');

        });

    });






});


Route::get('/', 'PagesController@index');