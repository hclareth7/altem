<?php

namespace App\Http\Controllers;

use App\Models\BaseDatosEstudiantes;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class BaseDatosEstudiantesController extends Controller
{
    public function __construct()
    {
        $this->middleware('cors');
        $this->beforeFilter('@find', ['only' => ['show', 'update', 'destroy']]);
    }


    public function find(Route $route)
    {
        $this->db_estudiantes = Filtro::find($route->getParameter('base_datos_estudiantes'));
    }


    public function index()
    {
        //$sql="SELECT * FROM sat.filtros group by riesgos_id";
        $db_estudiantes = BaseDatosEstudiantes::all();
        return response()->json($db_estudiantes);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        BaseDatosEstudiantes::create($request->all());
        return response()->json(["mensaje" => "Creado correctamente"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->db_estudiantes);
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
        $this->db_estudiantes->fill($request->all());
        $this->db_estudiantes->save();
        return response()->json(["mensaje" => "Actualizacion exitosa"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->db_estudiantes->delete();
        return response()->json(["mensaje" => "Borrado correctamente"]);
    }
}
