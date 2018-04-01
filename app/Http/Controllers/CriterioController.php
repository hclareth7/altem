<?php

namespace App\Http\Controllers;

use App\Models\Criterio;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CriterioController extends Controller
{
    public function __construct()
    {
        $this->middleware('cors');
        $this->beforeFilter('@find', ['only' => ['show', 'update', 'destroy']]);
    }


    public function find(Route $route)
    {
        $this->criterio = Criterio::find($route->getParameter('criterio'));
    }


    public function index()
    {
        //$sql="SELECT * FROM sat.filtros group by riesgos_id";
        $criterio = Criterio::all();
        return response()->json($criterio);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Criterio::create($request->all());
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
        return response()->json($this->criterio);
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
        $this->criterio->fill($request->all());
        $this->criterio->save();
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
        $this->criterio->delete();
        return response()->json(["mensaje" => "Borrado correctamente"]);
    }
}
