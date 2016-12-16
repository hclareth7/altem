<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\ArchivoPersonal;
use App\Models\EstudianteAltem;
use App\Models\Filtro;
use App\Models\Riesgo;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class ArchivoPersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function __construct(Filtro $filtro){
        $this->db_sirius = \DB::connection('mysql2');
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

    public function riesgoAgregado($codigo)
    {
        $data = ArchivoPersonal::with('riesgo.tiporiesgo')
            ->where('estudiantes_altem_codigo', $codigo)
            ->get();
        $riesgos = Riesgo::with(['tiporiesgo'])
            ->get();


        $newColection=[];
        foreach ($data as $key => $item) {
            $newColection = $riesgos->reject(function($element) use($item){
                return $element->id == $item->riesgos_id;
            });

        }

        return response()->json($newColection);
    }

    public function getRiesgosPersonalByEstudiantes($codigo){

        $riegosPersonal = ArchivoPersonal::with(['riesgo', 'intervenciones.estrategias'])
            ->where('estudiantes_altem_codigo',$codigo)
            ->get();

    /*    $intervencion=ArchivoPersonal::with(['riesgo', 'intervencion.acciones_aplicadas.accion'])
            ->where('estudiantes_altem_codigo',$codigo)
            ->get();*/

        if ($riegosPersonal->count() > 0) {
            $estrategias_aplicadas[]= 0;
            foreach ($riegosPersonal[0]->intervenciones as $key => $value) {
                $estrategias_aplicadas[$key]=$value->estrategias->with('acciones')
                    ->where('id', $value->estrategias->id)
                    ->get()[0];

                $estrategias_aplicadas[$key]->usuario = $value->usuarios_codigo;

            }


            $riegosPersonal[0]->estrategias_aplicadas = $estrategias_aplicadas;
            //dd($riegosPersonal);
            //dd($riegosPersonal[0]->intervenciones);

        }
        
        $riesgos = [];
        $filtros = $this->filtro->groupBy('riesgos_id')->get();

        foreach ($filtros as $key => $value) {
            $sql = "SELECT * FROM estudiantes_view WHERE id='" . $codigo . "' and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            $estudiantes = $this->db_sirius->select($sql);

            if (!empty($estudiantes)) {
                $riesgo = new Riesgo();
                $buenRiesgo = $riesgo
                    ->with('tiporiesgo')
                    ->find($value->riesgos_id);
                $riesgos[$key] = $buenRiesgo;
            }
        }


        foreach ($riegosPersonal as $key => $value) {
            $riegosPersonal[$key]->descripcion=$value->riesgo->descripcion;
            $riegosPersonal[$key]->nombre=$value->riesgo->nombre;
            $riegosPersonal[$key]->tiporiesgo= $riegosPersonal[$key]
                ->riesgo
                ->with('tiporiesgo')
                ->where('id', $value->riesgo->id)
                ->get()
                ->map(function ($value){
                return $value->tiporiesgo;
            })->get(0);

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

        $codigo = $request->input('estudiantes_altem_codigo');
        $programa = $request->input('programa_estudiante');
        $res = EstudianteAltem::where('codigo', $codigo)->get();

        if ($res->count() <= 0) {
            $estudiante = new EstudianteAltem;
            $estudiante->codigo = $codigo;
            $estudiante->programa = $programa;
            $estudiante->save();
            ArchivoPersonal::create($request->all());
        } else {
            ArchivoPersonal::create($request->all());
        }



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
