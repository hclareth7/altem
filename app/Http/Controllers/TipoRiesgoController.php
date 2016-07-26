<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;
use App\Models\TipoRiesgo;


class TipoRiesgoController extends Controller
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

	public function find(Route $route){
		$this->tipoRiesgo=TipoRiesgo::find($route->getParameter('tipo_riesgo'));
	}

    public function index()
    {
        $tipoRiesgo = TipoRiesgo::all();
		return response()->json($tipoRiesgo);
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
        tipoRiesgo::create($request->all());
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

        return response()->json($this->tipoRiesgo);
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
    public function update(Request $request, $id){

       	$this->tipoRiesgo->fill($request->all());
		$this->tipoRiesgo->save();
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
         $this->tipoRiesgo->delete();
    }
}
