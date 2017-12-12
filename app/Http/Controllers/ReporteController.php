<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\ArchivoPersonal;
use App\Models\Riesgo;
use App\Models\TipoRiesgo;

use Illuminate\Http\Request;

class ReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //D

    }

    public function archivo_personal(Request $request)
    {

        $anio = $request->input('anio');
        $periodo = $request->input('periodo');
        $riesgo = $request->input('riesgo');
        $factores =  $request->input('factor');

        if ($periodo == 1) {

            $result = ArchivoPersonal::with('estudiante_altem','riesgo.tiporiesgo','intervenciones.estrategias')
                ->whereYear('fecha_reporte', '=', $anio)
                ->where(\DB::raw('MONTH(fecha_reporte) '), '<', '7')->get();
        }
        if ($periodo == 1 && $riesgo == 'Académico') {

            $result = ArchivoPersonal::with('estudiante_altem','riesgo.tiporiesgo','intervenciones.estrategias')
                ->select(\DB::raw('a.*, r.tipo_riesgos_id from altem.archivo_personal as a join altem.riesgos as r on a.riesgos_id = r.id  where tipo_riesgos_id =1'))
                ->get();
        }



        if ($periodo == 2) {
            $result = ArchivoPersonal::with('estudiante_altem','riesgo.tiporiesgo','intervenciones.estrategias')
                ->whereYear('fecha_reporte', '=', $anio)
                ->where(\DB::raw('MONTH(fecha_reporte) '), '>', '6')->get();

        }
        if ($periodo == null) {
            $result = ArchivoPersonal::with('estudiante_altem','riesgo.tiporiesgo','intervenciones.estrategias')
                ->whereYear('fecha_reporte', '=', $anio)
                ->where(\DB::raw('MONTH(fecha_reporte) '), '<=', '12')->get();

        }



        return response()->json($result);
    }

    public function tipoRiesgos_programas(){

    }

    public function getAnios(){
        $result = ArchivoPersonal::select((\DB::raw('YEAR(fecha_reporte) as anio')))->groupby(\DB::raw('YEAR(fecha_reporte)'))->get();

        return response()->json($result);
    }

    public function getRiesgosName(){

        $nombres_riesgo = TipoRiesgo::select('nombre')->get();

        return response()->json($nombres_riesgo);

    }

    public function getFactoresRiesgo(){

        $factores_riesgo = Riesgo::select('nombre')->get();

        return response()->json($factores_riesgo);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
