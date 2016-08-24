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

    // Adding JWT Auth Middleware to prevent invalid access
    Route::group(['middleware' => 'jwt.auth'], function () {


        Route::group(['middleware' => ['role:ADMIN|CONSE|PSICO']], function () {

            Route::resource('login', 'ApiAuthController', ['only' => ['index']]);
            Route::resource('estudiante', 'EstudianteController');
            Route::get('estudiante_filtro/{id}', 'EstudianteController@ejecutarFiltro');

            Route::resource('intervencion', 'ArchivoPersonalController');
            Route::resource('accion_aplicada', 'AccionAplicadaController');
            Route::get('estudiante_colums', 'EstudianteController@getColumn');

            Route::resource('tipo_riesgo', 'TipoRiesgoController');
            Route::resource('estrategia', 'EstrategiaController');
            Route::resource('accion', 'AccionController');
            Route::get('accion/acciones_estrategia/{id}', 'AccionController@getByEstrategia');
            Route::resource('tipo_riesgo', 'TipoRiesgoController');
            Route::resource('riesgo', 'RiesgoController');
            Route::resource('filtro', 'FiltroController');
            Route::get('filtro/filtros_riesgo/{id}', 'FiltroController@getByRiesgo');

            Route::post('role', 'ApiAuthController@createRole');
// Route to create a new permission
            Route::post('permission', 'ApiAuthController@createPermission');
// Route to assign role to user
            Route::post('assign_role', 'ApiAuthController@assignRole');
// Route to attache permission to a role
            Route::post('attach_permission', 'ApiAuthController@attachPermission');
        });

    });






});


Route::get('/', 'PagesController@index');