<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/27/2018
 * Time: 12:39 PM
 */


namespace App\Http\Controllers;
use App\Models\BaseDatos;



class BaseDatosController extends Controller {

    public function getColumns(){

        $columns = BaseDatos::select('SHOW COLUMNS');
        return response()->json($columns);

    }


};





