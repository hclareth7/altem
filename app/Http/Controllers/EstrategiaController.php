<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Estrategia;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;


class EstrategiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function __construct(){
		$this->middleware('cors');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
	}

	public function find(Route $route)
	{
		$this->estrategia=Estrategia::find($route->getParameter('estrategia'));
		//$users = DB::table('users')->skip(10)->take(5)->get();Obtener elementos desde hasta (skip:desde,take:hasta)
	}

    public function index()
    {
        $estrategia = Estrategia::with('riesgos')->get();
		return response()->json($estrategia);
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

       	Estrategia::create($request->all());
		return response()->json(["mensaje"=>"Creada correctamente"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $estrategia=Estrategia::find($id);
        // dd($estrategia);
        return response()->json($estrategia);
    }

    public function estrategiaByRiesgoId(Request $request)
    {
        $id = $request->input('id');
        $idPersonal = $request->input('idpersonal');

        $readyEstrategia = Estrategia::with('riesgos')->whereHas('intervenciones', function ($q) use ($id, $idPersonal) {
            $q->where('archivo_personal_id', '=', $idPersonal);
        })->whereHas('riesgos', function ($q) use ($id, $idPersonal) {
            $q->where('riesgos_id', '=', $id);
        })->get();

        //dd($readyEstrategia);
        $estrategias = Estrategia::with('riesgos')->whereHas('riesgos', function ($q) use ($id, $idPersonal) {
            $q->where('riesgos_id', '=', $id);
        })->get();
        foreach ($estrategias as $key => $value) {
            foreach ($readyEstrategia as $key2 => $value2) {
                if ($value->id === $value2->id) {
                    $value->estado = 1;
                }
            }
        }
        return response()->json($estrategias);
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
    public function update(Request $request,$id)
    {
		$this->estrategia->fill($request->all());
		$this->estrategia->save();
		return response()->json(["mensaje"=>"Actualizacion exitosa"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $this->estrategia->delete();
    }
}
