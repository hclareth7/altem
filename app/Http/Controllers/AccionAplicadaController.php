<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;
use App\Models\AccionAplicada;

class AccionAplicadaController extends Controller
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

		$this->accionAplicada=AccionAplicada::find($route->getParameter('accion_aplicada'));

		//$users = DB::table('users')->skip(10)->take(5)->get();Obtener elementos desde hasta (skip:desde,take:hasta)

	}

    public function index()
    {
        $accionAplicada = AccionAplicada::with('riesgo')->get();
		return response()->json($accionAplicada);
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
       	AccionAplicada::create($request->all());
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
        return response()->json($this->accionAplicada);
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

		$this->accionAplicada->fill($request->all());
		$this->accionAplicada->save();
		return response()->json(["mensaje"=>"Actualizacion exitosa"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $this->accionAplicada->delete();
    }
}
