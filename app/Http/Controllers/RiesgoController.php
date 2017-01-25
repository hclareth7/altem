<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Estrategia;
use App\Models\Riesgo;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class RiesgoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function __construct(){


		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
	}


	public function find(Route $route)
	{
		$this->riesgo=Riesgo::find($route->getParameter('riesgo'));
	}

   

    public function index()
    {
         $riesgo = Riesgo::with('tiporiesgo','estrategias')->get();
		return response()->json($riesgo);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $nombre = $request->input('nombre');
        $tipo_riesgos_id = $request->input('tipo_riesgos_id');
        $descripcion = $request->input('descripcion');

        $estrategias = $request->input('estrategias');

        $riesgo = new Riesgo();
        $riesgo->nombre = $nombre;
        $riesgo->tipo_riesgos_id = $tipo_riesgos_id;
        $riesgo->descripcion = $descripcion;
        $riesgo->save();
        //$riesgo->estrategias()->attach($estrategias);
        //dd($estrategias);
        foreach ($estrategias as $key => $value) {
            $estrategia = new Estrategia();
            //dd($value);
            $estrategia->id = $value['id'];
           // dd($estrategia->id);
            $riesgo->estrategias()->attach($estrategia);

        }

		return response()->json(["mensaje"=>"Creado correctamente"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $riesgo=Riesgo::with('tiporiesgo','estrategias')->find($id);
        return response()->json($riesgo);
    }

    public function riesgo_by_archivo(Request $request)
    {
        $codigo_estudiante = $request->input('codigo_estudiante');


        $readyRiesgos = Riesgo::with('tiporiesgo')->whereHas('archivos_Personales', function ($q) use ($codigo_estudiante) {
            $q->where('estudiantes_altem_codigo', '=', $codigo_estudiante);
        })->get();

        $riesgos = Riesgo::with('tiporiesgo')->get();
        foreach ($riesgos as $key => $value) {
            foreach ($readyRiesgos as $key2 => $value2) {
                if ($value->id === $value2->id) {
                    $value->estado = 1;
                }
            }
        }
        return response()->json($riesgos);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {


        $nombre = $request->input('nombre');
        $tipo_riesgos_id = $request->input('tipo_riesgos_id');
        $descripcion = $request->input('descripcion');

        $estrategias = $request->input('estrategias');


        $this->riesgo->nombre = $nombre;
        $this->riesgo->tipo_riesgos_id = $tipo_riesgos_id;
        $this->riesgo->descripcion = $descripcion;


		$this->riesgo->save();
        $estrategi=[];
        foreach ($estrategias as $key => $value) {
            $estrategia = new Estrategia();
            //dd($value);
            $estrategi[$key] = $value['id'];
            // dd($estrategia->id);


        }
        $this->riesgo->estrategias()->sync($estrategi);
		return response()->json(["mensaje"=>"Actualizacion exitosa"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $this->riesgo->delete();
        }catch (QueryException $ex){
            return response()->json($ex->errorInfo[0]);
        }

    }
}
