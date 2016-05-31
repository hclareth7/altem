<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;
use App\Models\Estudiante;


class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function __construct(){
		$this->db_sirius = \DB::connection('sirius');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
	}

	public function find(Route $route)
	{

		$this->estudiante= $this->db_sirius->table('estudiantes')->where('id',$route->getParameter('estudiante'))->first();




		//$users = DB::table('users')->skip(10)->take(5)->get();Obtener elementos desde hasta (skip:desde,take:hasta)

	}

    public function index()
    {
        $estudiante = $this->db_sirius->table('estudiantes')->skip(0)->take(50)->get();
      return response()->json($estudiante);
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

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->estudiante);
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
