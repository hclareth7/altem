<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Filtro;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;

class FiltroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('cors');
        $this->beforeFilter('@find', ['only' => ['show', 'update', 'destroy']]);
    }


    public function find(Route $route)
    {
        $this->filtro = Filtro::find($route->getParameter('filtro'));
    }

    

    public function index()
    {
        //$sql="SELECT * FROM sat.filtros group by riesgos_id";
        $filtro = DB::table('filtros')->groupBy('riesgos_id')->get();
        return response()->json($filtro);
    }

    public function getByRiesgo($id)
    {
        $filtro = Filtro::where('riesgos_id', $id)->get();
        return response()->json($filtro);
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
        Filtro::create($request->all());
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
        return response()->json($this->filtro);
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
        $this->filtro->fill($request->all());
        $this->filtro->save();
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
        $this->filtro->delete();
    }
}
