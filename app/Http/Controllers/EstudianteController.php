<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Filtro;
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
		$this->db_sirius = \DB::connection('mysql2');
		$this->beforeFilter('@find',['only'=>['show','update','destroy']]);
        $this->filtro = $filtro;
        $this->sql = "";
        $roles = Auth::user();

    }

    public function getRiesgosByEstudiante($id)
    {
        
    }

    public function setRestric()
    {
        $restric = "";
        //dd($roles = Auth::user());
        $roles = Auth::user()->with('roles')->get()->filter(function ($item) {
            $user = Auth::user();
            return $item->codigo == $user->id;
        })->first();
        $restricRole = $roles->roles->map(function ($value) {
            return $value->name;
        });
        if ($restricRole[0] == "ADMIN") {
            $this->sql = "Select *  from estudiantes_view where id !=' '";
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
                $this->sql = "Select * from estudiantes_view " . $restric;
                return $this->sql;
            }

        } else {
            return "";
        }

    }
 
	public function find(Route $route)
	{
		$this->estudiante= $this->db_sirius->table('estudiantes_view')->where('id',$route->getParameter('estudiante'))->first();
		//$users = DB::table('users')->skip(10)->take(5)->get();

        //Obtener elementos desde hasta (skip:desde,take:hasta)
	}

    public function buscar(Request $request){
        $de = $request->input('de');
        $a = $request->input('a');
        $string=$request->input('string');
        $sql="SELECT * FROM estudiantes_view where NOMBRES like '%".$string."%' or ID like  '%".$string."%'  or APELLIDOS like  '%".$string."%' or PROGRAMA like  '%".$string."%'  " ;
        $estudiantes = $this->db_sirius->select($sql);
        $sql2="SELECT count(*) as total FROM sirius.estudiantes_view where NOMBRES like '%".$string."%' or ID like  '%".$string."%'  or APELLIDOS like  '%".$string."%' or PROGRAMA like  '%".$string."%' ";
        $total=$this->db_sirius->select($sql2);
        if(count($estudiantes)>0){
            $estudiantes[0]->total=$total;
        }

        return response()->json($estudiantes);
    }

    public function ejecutarFiltro($id)
    {

        $filofinal = "";
        $filtros = Filtro::where('riesgos_id', $id)->get();

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

    public function getcolumn()
    {   /*
        Se añadió la columna en la vista estudiantes_pp_view.

        `datos_academicos`.`PROMEDIO_PERIODO` AS `PROMEDIO_PERIODO`
         FROM
        (`estudiantes`
        JOIN `datos_academicos` ON ((`estudiantes`.`ID` = `datos_academicos`.`ID`)))
         */
        $columns = $this->db_sirius->select('SHOW COLUMNS FROM estudiantes_pp_view');
        return response()->json($columns);
    }

    public function index()
    {
        //$estudiante = $this->db_sirius->table('estudiantes')->skip(0)->take(50)->get();
        $estudiantes = $this->db_sirius->select($this->setRestric()." limit 0,10");
       // $results = \DB::connection('mysql2')->select($this->setRestric(),array(1));
        return response()->json($estudiantes);
    }

    public function getEstudiantesByUser(Request $request)
    {
        $de = $request->input('de');
        $a = $request->input('a');
        $sql="SELECT count(*) as total FROM sirius.estudiantes_view";

        //$estudiante = $this->db_sirius->table('estudiantes')->skip(0)->take(50)->get();
        $estudiantes = $this->db_sirius->select($this->setRestric() . " limit  " . $de . "," . $a);
        //dd($this->setRestric() );
        $total=$this->db_sirius->select($sql);
        if($estudiantes){
            $estudiantes[0]->total=$total;
        }

        // $results = \DB::connection('mysql2')->select($this->setRestric(),array(1));
        return response()->json($estudiantes);
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
