<?php

namespace App\Http\Controllers;

use App\Models\Filtro;
use App\Models\Riesgo;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;
use App\Models\ArchivoPersonal;

class ArchivoPersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function __construct(Filtro $filtro){
        $this->db_sirius = \DB::connection('sirius');
		$this->middleware('cors');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
        $this->filtro = $filtro;
	}

	public function find(Route $route){

		$this->archivoPersonal=ArchivoPersonal::find($route->getParameter('archivo_personal'));

	}

    public function index()
    {
        $archivoPersonal = TipoRiesgo::all();
		return response()->json($archivoPersonal);
    }


    public function getRiesgosPersonalByEstudiantes($codigo){
        $riegosPersonal=ArchivoPersonal::with('riesgo')->where('estudiante',$codigo)->groupBy('id')->get();
        $riesgos = [];

        $filtros = $this->filtro->groupBy('riesgos_id')->get();

        foreach ($filtros as $key => $value) {
            $sql = "SELECT * FROM estudiantes WHERE id='" . $codigo . "' and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            $estudiantes = $this->db_sirius->select($sql);

            if (!empty($estudiantes)) {
                $riesgo = new Riesgo();
                $buenRiesgo = $riesgo->find($value->riesgos_id);
                $riesgos[$key] = $buenRiesgo;
            }
        }

        foreach ($riegosPersonal as $key => $value) {
            $riegosPersonal[$key]->descripcion=$value->riesgo->descripcion;
            $riegosPersonal[$key]->nombre=$value->riesgo->nombre;
            $riegosPersonal[$key]->tipo_riesgo= $riegosPersonal[$key]->riesgo->with('tiporiesgo')->where('id', $value->riesgo->id)->get()->map(function ($value){

                return $value->tiporiesgo->nombre;
            });

        }

        foreach ($riesgos as $key1 => $value1) {
                    if(!$riegosPersonal->contains('riesgos_id',$value1->id)){
                        $riegosPersonal->add($riesgos[$key1]);
                    }
            }


        return response()->json($riegosPersonal);
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
        ArchivoPersonal::create($request->all());
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

        return response()->json($this->archivoPersonal);
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

       	$this->archivoPersonal->fill($request->all());
		$this->archivoPersonal->save();
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
         $this->archivoPersonal->delete();
    }
}
