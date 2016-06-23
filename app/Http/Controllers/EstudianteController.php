<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Filtro;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;


class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(Filtro $filtro)
    {
		$this->db_sirius = \DB::connection('sirius');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
        $this->filtro = $filtro;
	}

	public function find(Route $route)
	{
		$this->estudiante= $this->db_sirius->table('estudiantes')->where('id',$route->getParameter('estudiante'))->first();
		//$users = DB::table('users')->skip(10)->take(5)->get();Obtener elementos desde hasta (skip:desde,take:hasta)
	}

    public function ejecutarFiltro($id)
    {
        $filtros = $this->filtro->ejecutar($id);
        $sql="select * from estudiantes ".$filtros;
        $estudiantes = $this->db_sirius->select($sql);
        return response()->json($estudiantes);
    }

    public function getcolumn()
    {
        $columns = $this->db_sirius->select('SHOW COLUMNS FROM sirius.estudiantes');
        return response()->json($columns);
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
