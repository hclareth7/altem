<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 5/2/2018
 * Time: 11:38 PM
 */

namespace App\Http\Controllers;

use App\Models\EstadoAtt;
use DB;


class EstadoAttController extends Controller
{

    public function getEstadosName(){
        $names = EstadoAtt::select('descripcion as Field')->get();

        return response()->json($names);

    }
}