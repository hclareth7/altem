<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Docentes;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DB;
use JWTAuth;
use App\Http\Requests;



class ScheduleController extends Controller
{
    protected static $days=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

    private function getProfeInfoById($codigo){

        $profe = DB::connection('mysql2')
            ->table("datos_academicos as da")
            ->where("ID_DOCENTE",DB::raw("'".$codigo."'" ))
            ->select("ID_DOCENTE","NOMBRES_DOCENTE", "APELLIDOS_DOCENTE")
            ->distinct()->get();

        return $profe;

    }

    private function getNrc(){

        $day = 'Lunes';

        $nrcData = DB::connection('mysql2')
            ->table("datos_academicos as da")
            ->where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('da.NRC')
            ->distinct()->get();

        $nrc = substr(serialize($nrcData), 42, 4);

        return $nrc;


    }

    private function getMissingStudents(){

        $nrc = $this->getNrc();

        $missing = DB::connection('mysql2')
            ->table('missing as m')
            ->where('nrc', '=', $nrc)
            ->select('m.idEstudiante')
            ->distinct()->get();


        $matchThese = array();

        forEach($missing as $miss){

            $x = substr(serialize($miss), 43, 9);

            array_push($matchThese, ['e.ID' => "".$x.""]);
            #array_push($m, $x);

        }

        return $matchThese;
    }
    private function getAssistants(){

        $nrc = $this->getNrc();

        $assistants = DB::connection('mysql2')
            ->table('assistants as m')
            ->where('nrc', '=', $nrc)
            ->select('m.idEstudiante')
            ->distinct()->get();


        $matchThese = array();

        forEach($assistants as $ass){

            $x = substr(serialize($ass), 43, 9);

            array_push($matchThese, ['e.ID' => "".$x.""]);
            #array_push($m, $x);

        }

        return $matchThese;
    }

    public function index(){


        $schedules = Schedule::findMany([ApiAuthController::getCode()]);

        $data = ["Docente"=>$this->getProfeInfoById(ApiAuthController::getCode()), "Clases"=>$schedules];

        return response()->json($data);
    }

    public function show($id)
    {
        $schedule = Schedule::findMany([$id]);

        $data = ["Docente"=>$this->getProfeInfoById($id), "Clases"=>$schedule];

        return response()->json($data);
    }

    public function now(Request $request)
    {
        /*
         *
         * Query -- Muestra los estudiantes durante la primera hora de clase ---
         *
         *
          select distinct
          e.ID ,e.NOMBRES,e.APELLIDOS, da.NRC,da.ASIGNATURA, da.ID_DOCENTE, da.Miercoles
			,cast(SUBSTRING(dia,1,LOCATE('-',dia)-1) as time ) as Inicio
			,cast(SUBSTRING(dia,7,LOCATE('-',dia)-1) as time ) as Fin
          from datos_academicos as da
          join estudiantes as e on e.id=da.id
          where ID_DOCENTE = 'codigo_profesor'  and
          cast(SUBSTRING(dia,1,LOCATE('-',dia)-1) as time ) between CONCAT(LEFT(curtime(),3),'00:00') and curtime()

        */

        /*
         *
         * QUERY REAL --- Todo: DESCOMENTAR LUEGO DE FASE DE TEST
         *
        $day=ScheduleController::$days[Carbon::now(-4)->dayOfWeek];
        $hour=Carbon::now(-4)->hour.":".Carbon::now(-4)->minute;



        $schedule=DB::table("datos_academicos as da")
            ->join("estudiantes as e","e.id","=","da.id")
            ->where("ID_DOCENTE",DB::raw("'".\Auth::user()->getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between CONCAT(LEFT(curtime(),3),'00:00') and curtime()"))
            ->select('e.ID' ,'e.NOMBRES','e.APELLIDOS','da.NRC','da.ASIGNATURA',DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) as Inicio, cast(SUBSTRING(".$day.",7,LOCATE('-',".$day.")-1) as time ) as Fin "))
            ->distinct()->get();*/
        /**


         * Datos quemaos pa prueba... -> Clase de Paralelismo NRC Todo: Eliminar luego de fase de Test
         */

        $day = 'Lunes'; // DIA QUEMADO
        $days=ScheduleController::$days[Carbon::now(-4)->dayOfWeek];
        $hour=Carbon::now(-4)->hour.":".Carbon::now(-4)->minute;

        $classdata = DB::connection('mysql2')
            ->table("datos_academicos as da")
            ->where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('da.ASIGNATURA','da.NRC',DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) as Inicio, cast(SUBSTRING(".$day.",7,LOCATE('-',".$day.")-1) as time ) as Fin "))
            ->distinct()->get();

        $missing = $this->getMissingStudents();
        $assis = $this->getAssistants();
        #dd($missing);

        $students=DB::connection('mysql2')
            ->table("datos_academicos as da")
            ->join("estudiantes as e","e.id","=","da.id")
            ->leftJoin("missing as m", "m.idEstudiante", "=", "e.ID")
            ->whereNotIn('e.ID', $missing)
            ->leftJoin("assistants as a", "a.idEstudiante", "=", "e.ID")
            ->whereNotIn('e.ID', $assis)
            ->where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('e.ID' ,'e.NOMBRES','e.APELLIDOS','e.PROGRAMA')
            ->distinct()->get();

        $data = ["Dia"=>$days,"Hora"=>$hour,"Info"=>$classdata, "Estudiantes"=>$students];








        return response()
            ->json($data);

    }
}
