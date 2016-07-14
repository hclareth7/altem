<?php

namespace App\Http\Controllers;

use App\Http\Requests;
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
        $this->db_sirius = \DB::connection('sirius');
		$this->middleware('cors');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
	}


	public function find(Route $route)
	{
		$this->riesgo=Riesgo::find($route->getParameter('riesgo'));
	}

   

    public function index()
    {
         $riesgo = Riesgo::with('tiporiesgo')->get();
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
        Riesgo::create($request->all());
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
        $riesgo=Riesgo::with('tiporiesgo')->find($id);
        return response()->json($riesgo);
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
		$this->riesgo->fill($request->all());
		$this->riesgo->save();
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
