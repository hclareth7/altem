<?php

namespace App\Http\Controllers;

use App\Models\Asistentes;
use Illuminate\Http\Request;
use DB;

class AsistentesController extends Controller
{

    public function getMissingStudentsByConditions(Request $request){

        $rules = [
            'operador' => 'required',
            'valor' => 'required',
            'descripcion' => 'required'
        ];

        $this->validate($request, $rules);

        $campos = $request->all();

        $students = Asistentes::with('info_estudiante')
                ->having(DB::raw('faltas'), $campos['operador'], $campos['valor'])
                ->having('descripcion', '=', $campos['descripcion'])
                ->groupBy('idEstudiante', 'nrc')
                ->join('estado_att as e', 'e.id', '=', 'attendees.estado' )
                ->select('idEstudiante', 'nrc', 'descripcion', DB::raw('count(*) as faltas'))
                ->get();

        dd($students);
        #dd($students[0]['relations']['estado']['original']);

        return response()->json($students);

    }


    public function index()
    {
        $misslog = Asistentes::with(array('info_estudiante'=>function($query){
            $query->select('ID','NOMBRES','APELLIDOS','TELEFONO1','EMAIL','PROGRAMA');
        }))
                ->with('estado')
                ->get();

        return $misslog;
    }

    public function create()
    {
        //
    }

    public function show($nrc)
    {
        /**
         * @param nrc
         * Muestra todas las personas que faltaron en el curso $nrc
         *
         */

        $missed = DB::connection('mysql2')
            ->table("missing as m")
            ->join('estudiantes as e','e.id','=','m.idEstudiante')
            ->where('nrc', $nrc)
            ->select('m.idEstudiante as CODIGO', 'e.NOMBRES','e.APELLIDOS','e.PROGRAMA', 'm.created_at as FECHA_FALTA')
            ->distinct()

            ->get();

        $data = ["NRC"=>$nrc,"FALTANTES"=>$missed];

        return response()
            ->json($data);

        //return response()->json('Curso'=>$nrc ,'Faltantes'=>$missed, 200);

    }

    public function update(Request $request)
    {
        $rules = [
            'id' => 'required',
            'estado' => 'required'
        ];

        $this->validate($request, $rules);

        $campos = $request->all();

        $estado = Asistentes::find($campos['id']);

        $estado->estado = $campos['estado'];

        $estado->save();

    }

/*    public function destroy(Request $request){

        $rules = [
            'idEstudiante' => 'required',
            'nrc' => 'required',
            'created_at' => 'required'
        ];

        $this->validate($request, $rules);

        $campos = $request->all();



        return response()->json($falta, 201);



    }*/

}