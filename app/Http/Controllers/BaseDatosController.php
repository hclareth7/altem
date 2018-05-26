<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/27/2018
 * Time: 12:39 PM
 */

namespace App\Http\Controllers;
use App\Models\BaseDatos;
use DB;

class BaseDatosController extends Controller {

    public function getDBs(){
        return response()->json(BaseDatos::all());
    }

};