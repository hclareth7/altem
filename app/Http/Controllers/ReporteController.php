<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\ArchivoPersonal;
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
        if ($periodo == 1) {

            $result = ArchivoPersonal::with('estudiante_altem','riesgo.tiporiesgo','intervenciones.estrategias')
                ->whereYear('fecha_reporte', '=', $anio)
                ->where(\DB::raw('MONTH(fecha_reporte) '), '<', '7')->get();
        } else {
            $result = ArchivoPersonal::with('estudiante_altem')
                ->whereYear('fecha_reporte', '=', $anio)
                ->where(\DB::raw('MONTH(fecha_reporte) '), '>', '6')->get();

        }

        return response()->json($result);
    }

    public function tipoRiesgos_programas(){

    }

    public function getAnios(){
        $result = ArchivoPersonal::select((\DB::raw('YEAR(fecha_reporte) as anio')))->groupby(\DB::raw('YEAR(fecha_reporte)'))->get();

        return response()->json($result);
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
