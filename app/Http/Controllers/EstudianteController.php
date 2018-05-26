<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\BaseDatosEstudiantes;
use App\Models\Estudiante;
use App\Models\Filtro;
use App\Models\Asistentes;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use DB;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(Filtro $filtro)
    {
        $connec = new BaseDatosEstudiantes();
        $this->db_sirius = $connec->getConection('sirius');
        $this->beforeFilter('@find', ['only' => ['show', 'update', 'destroy']]);
        $this->filtro = $filtro;
        $this->sql = "";


    }

    public function getAnotacionesByCodigo($codigo)
    {

        $anotaciones = Estudiante::where('codigo', '=', $codigo)->get();
        return response()->json($anotaciones);
    }


    public function storeAnotaciones(Request $request)
    {
        Estudiante::create($request->all());

        return response()->json(["mensaje" => "Creado correctamente"]);
    }


    public function updateAnotaciones(Request $request, $codigo)
    {
        $estudiante = Estudiante::find($codigo);
        $estudiante->fill($request->all());
        $estudiante->save();
        return response()->json(["mensaje" => "Actualizacion exitosa"]);

    }


    public function deleteAnotaciones($codigo)
    {
        $estudiante = Estudiante::find($codigo);
        $estudiante->delete();

        return response()->json(["mensaje" => "Eliminado con Exito"]);

    }


    public function getRiesgosByEstudiante($id)
    {

    }

    public function setRestric()
    {
        $roles = Auth::user()->with('roles')->get()->filter(function ($item) {
            $user = Auth::user();
            return $item->codigo == $user->id;
        })->first();


        $restricRole = $roles->roles->map(function ($value) {
            return $value->name;
        });

        if ($restricRole[0] == "ADMIN") {
            $base_datos_principal = BaseDatosEstudiantes::where('tipo', '=', 'principal')->first();
            $this->sql = "Select *  from " . $base_datos_principal->tabla . " where id !=' '";
            return $this->sql;
        } else {
            $poblaciones = Auth::user()->poblaciones()->with('criterio')->get();
            $sql = "";

            foreach ($poblaciones as $key => $poblacion) {
                $base_datos = $poblacion->criterio->base_datos_estudiantes()->first();
                if ($base_datos->tipo != "principal") {//si la base de datos no es la Principal (Sirius)


                } else {
                    if ($key == 0) {
                        $sql = "Select * from " . $base_datos->tabla . " where " . $poblacion->criterio->campo . " " .
                            $poblacion->criterio->operador . " '" . $poblacion->criterio->valor . "' ";
                    } else {
                        $sql .= " or " . $poblacion->criterio->campo . " " .
                            $poblacion->criterio->operador . " '" . $poblacion->criterio->valor . "'";
                    }
                }

            }


            $this->sql = $sql;

            return $this->sql;
        }

    }

    public function find(Route $route)
    {
        $base_datos_principal = BaseDatosEstudiantes::where('tipo', '=', 'principal')->first();
        $this->estudiante = $this->db_sirius->table($base_datos_principal->tabla)->where('id', $route->getParameter('estudiante'))->first();
    }

    public function buscar(Request $request)
    {
        $de = $request->input('de');
        $a = $request->input('a');
        $string = $request->input('string');
        $sql = "SELECT * FROM estudiantes_view where NOMBRES like '%" . $string . "%' or ID like  '%" . $string . "%'  or APELLIDOS like  '%" . $string . "%' or PROGRAMA like  '%" . $string . "%'  ";
        $estudiantes = $this->db_sirius->select($sql);
        $sql2 = "SELECT count(*) as total FROM sirius.estudiantes_view where NOMBRES like '%" . $string . "%' or ID like  '%" . $string . "%'  or APELLIDOS like  '%" . $string . "%' or PROGRAMA like  '%" . $string . "%' ";
        $total = $this->db_sirius->select($sql2);
        if (count($estudiantes) > 0) {
            $estudiantes[0]->total = $total;
        }

        return response()->json($estudiantes);
    }

    public function ejecutarFiltro($id)
    {
        $filofinal = "";

        $filtros = Filtro::where('riesgos_id', $id)->get();

        foreach ($filtros as $filtro){

            if ($filtro['base_datos'] == 0){
                foreach ($filtros as $key => $value) {

                    if ($key == 0) {
                        $filofinal = " and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
                    } else {
                        $filofinal .= " and  " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
                    }
                }
                $sql = $this->setRestric() . " " . $filofinal;
                //dd($sql);
                $estudiantes = $this->db_sirius->select($sql);
                return response()->json($estudiantes);

            }

            else if ($filtro['base_datos'] == 1){

                $data = Asistentes::with('info_estudiante')
                    ->having(DB::raw('faltas'), $filtro['attributes']['operador'], $filtro['attributes']['valor'])
                    ->having('descripcion', '=', $filtro['attributes']['campo'])
                    ->groupBy('idEstudiante', 'nrc', 'descripcion')
                    ->join('estados as e', 'e.id', '=', 'asistentes.estado' )
                    ->select('idEstudiante', 'nrc', 'descripcion', DB::raw('count(*) as faltas'))
                    ->get();

                $students = array();

                foreach ($data as $student){

                    array_push($students, $student['relations']['info_estudiante']['original']);

                }

                return response()->json($students);

            }

        }
        $sql = $this->setRestric() . " " . $filofinal;

        $estudiantes = $this->db_sirius->select($sql);
        return response()->json($estudiantes);
    }

    public function getcolumn()
    {
        $columns = $this->db_sirius->select('SHOW COLUMNS FROM sirius.estudiantes_view');
        return response()->json($columns);
    }

    public function index()
    {
        //$estudiante = $this->db_sirius->table('estudiantes')->skip(0)->take(50)->get();
        $estudiantes = $this->db_sirius->select($this->setRestric() . " limit 0,10");
        // $results = \DB::connection('mysql2')->select($this->setRestric(),array(1));
        return response()->json($estudiantes);
    }

    public function getEstudiantesByUser(Request $request)
    {
        $de = $request->input('de');
        $a = $request->input('a');
        $sql = str_replace("*", " count(*) as total  ", $this->setRestric());

        $sql_with_limit = $this->setRestric() . " limit  " . $de . "," . $a;

        $estudiantes = $this->db_sirius->select($sql_with_limit);
        $total = $this->db_sirius->select($sql);
        if ($estudiantes) {
            $estudiantes[0]->total = $total;
        }

        return response()->json($estudiantes);
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->estudiante);
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

        $this->estrategia->fill($request->all());
        $this->estrategia->save();
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
        $this->estrategia->delete();
        return response()->json(["mensaje" => "Borrado exitoso"]);
    }
}
