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

Route::get('/','PagesController@index');

Route::group(['prefix' => 'api'], function () {

    Route::resource('estudiante', 'EstudianteController');
    Route::get('estudiante_filtro/{id}', 'EstudianteController@ejecutarFiltro');
    Route::resource('personal', '');
    Route::resource('intervencion', 'IntervenciArchivoPersonalControlleronController');
    Route::resource('accion_aplicada', 'AccionAplicadaController');
    Route::resource('estrategia', 'EstrategiaController');
    Route::resource('accion', 'AccionController');
    Route::get('accion/acciones_estrategia/{id}', 'AccionController@getByEstrategia');
    Route::resource('tipo_riesgo', 'TipoRiesgoController');
    Route::resource('riesgo', 'RiesgoController');
    Route::resource('filtro', 'FiltroController');
    Route::get('filtro/filtros_riesgo/{id}', 'FiltroController@getByRiesgo');
    Route::get('estudiante_colums', 'EstudianteController@getColumn');

});
