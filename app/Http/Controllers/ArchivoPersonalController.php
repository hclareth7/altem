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
    public function __construct(Filtro $filtro)
    {
        $this->db_sirius = \DB::connection('sirius');
        $this->middleware('cors');
        $this->beforeFilter('@find', ['only' => ['show', 'update', 'destroy']]);
        $this->filtro = $filtro;
    }

    public function find(Route $route)
    {
        $this->archivoPersonal = ArchivoPersonal::find($route->getParameter('archivo_personal'));
    }

    public function index()
    {
        $archivoPersonal = ArchivoPersonal::all();
        return response()->json($archivoPersonal);
    }

    public function riesgoAgregado($codigo)
    {
        $data = ArchivoPersonal::with('riesgo.tiporiesgo')
            ->where('estudiantes_altem_codigo', $codigo)
            ->get();
        $riesgos = Riesgo::with(['tiporiesgo'])
            ->get();


        $newColection = [];
        foreach ($data as $key => $item) {
            $newColection = $riesgos->reject(function ($element) use ($item) {
                return $element->id == $item->riesgos_id;
            });

        }

        return response()->json($newColection);
    }

    public function getRiesgosPersonalByEstudiantes($codigo)
    {

        $riegosPersonal = ArchivoPersonal::with(['riesgo.tiporiesgo', 'intervenciones.estrategias.acciones', 'intervenciones.acciones_aplicadas'])
            ->where('estudiantes_altem_codigo', $codigo)
            ->get();

        $filtros = $this->filtro->groupBy('riesgos_id')->get();


        //return response()->json($riegosPersonal);
        foreach ($filtros as $key => $value) {
            $sql = "SELECT * FROM estudiantes_pp_view WHERE id='" . $codigo . "' and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";

            $estudiantes = $this->db_sirius->select($sql);

            if (!empty($estudiantes)) {
                $new_archivo = new ArchivoPersonal();
                $new_archivo->id = 0;
                $new_archivo->estado = -1;
                $buenRiesgo = Riesgo::with('tiporiesgo')
                    ->find($value->riesgos_id);
                $new_archivo->riesgo = $buenRiesgo;
                if (!$riegosPersonal->contains(function ($key, $value) use ($new_archivo) {
                    return $value->riesgos_id == $new_archivo->riesgo->id;
                })
                ) {
                    $riegosPersonal->push($new_archivo);
                }
            }
        }

        foreach ($riegosPersonal as $key1 => $value1) {
            foreach ($value1->intervenciones as $key2 => $value2) {
                foreach ($value2->estrategias->acciones as $key3 => $value3) {
                    $value3->estado = "no";
                }
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
     * @param  \Illuminate\Http\Request $request
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

        return response()->json($this->archivoPersonal);
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

        $this->archivoPersonal->fill($request->all());
        $this->archivoPersonal->save();
        return response()->json(["mensaje" => "Actualizacion exitosa"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    public function deleteArchivo(Request $request)
    {
        try {

            $idRiesgo = $request->input('idriesgo');
            $idEstudiante = $request->input('codigo_estudiante');
            $archivo = ArchivoPersonal::where('estudiantes_altem_codigo', $idEstudiante)
                ->where('riesgos_id', $idRiesgo)->first();
            //dd($intervencion);
            $archivo->delete();

            return response()->json(["mensaje" => "Eliminacion exitosa"]);

        } catch (\PDOException $ex) {

            abort(500, 'dsfgasdf');

        }
    }

    public function destroy($id)
    {
        $this->archivoPersonal->delete();
    }
}
