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

       # dd($students);
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

    public function show($nrc)
    {
        /**
         * @param nrc
         * Muestra todas las personas que faltaron en el curso $nrc
         *
         */

        $missed = Asistentes::with(array('info_estudiante'=>function($query){
            $query->select('ID','NOMBRES','APELLIDOS','TELEFONO1','EMAIL','PROGRAMA');
        }))
            ->with('estado')
            ->where('nrc', '=', $nrc)
            ->get();

        $data = ["NRC"=>$nrc,"FALTANTES"=>$missed];

        return response()
            ->json($data);

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

        return response()->json("Asistencia tomada.");
    }

}