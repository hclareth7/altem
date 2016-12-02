<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Filtro;
use App\Models\Riesgo;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;


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
        $this->sql = "";

    }

    public function getRiesgosByEstudiante($id)
    {
        
    }

    public function setRestric()
    {
        $restric = "";
        $roles = Auth::user()->with('roles')->get()->filter(function ($item) {
            $user = Auth::user();
            return $item->codigo == $user->id;
        })->first();
        $restricRole = $roles->roles->map(function ($value) {
            return $value->name;
        });
        if ($restricRole[0] == "ADMIN") {
            $this->sql = "Select * from DATOS_ESTUDIANTES_ALTEM where programa <> '-' ";
            return $this->sql;
        } else if ($restricRole[0] == "CONSE") {
            $permission = $roles->roles->first()->with('perms')->get()->first()->find($roles->roles->first()->id)->perms;
            $datos = $permission->map(function ($value) {
                return $value->name;
            });

            if (count($datos) > 0) {
                foreach ($datos as $key => $value) {
                    ///if($value=="pilo")

                    if ($key == 0) {

                        $restric .= "where programa = '" . strtoupper(str_replace("_", " ", $value)) . "'";

                    } else {
                        $restric .= " or programa = '" . strtoupper(str_replace("_", " ", $value)) . "'";
                    }

                }
                $this->sql = "Select * from DATOS_ESTUDIANTES_ALTEM " . $restric;
                return $this->sql;
            }

        } else {
            return "";
        }

    }

	public function find(Route $route)
	{
		$this->estudiante= $this->db_sirius->table('DATOS_ESTUDIANTES_ALTEM')->where('id',$route->getParameter('estudiante'))->first();
		//$users = DB::table('users')->skip(10)->take(5)->get();Obtener elementos desde hasta (skip:desde,take:hasta)
	}

    public function ejecutarFiltro($id)
    {
        $filtros = $this->filtro->ejecutar($id);
        $sql = $this->setRestric() . " " . $filtros;

        $estudiantes = $this->db_sirius->select($sql);
        return response()->json($estudiantes);
    }

    public function getcolumn()
    {
        $columns = $this->db_sirius->select('SHOW COLUMNS FROM DATOS_ESTUDIANTES_ALTEM',array(1));
        return response()->json($columns);
    }

    public function index()
    {
        //$estudiante = $this->db_sirius->table('estudiantes')->skip(0)->take(50)->get();
        //$estudiantes = $this->db_sirius->select($this->setRestric());
        $results = \DB::connection('sirius')->select($this->setRestric(), array(1));
        return response()->json($results);
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
