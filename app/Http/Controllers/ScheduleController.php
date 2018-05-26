<?php

namespace App\Http\Controllers;

use App\Models\Asistentes;
use App\Models\DatosAcademicos;
use App\Models\Schedule;
use App\Models\Estudiantes;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use JWTAuth;
use PhpSpec\Exception\Example\ExampleException;


class ScheduleController extends Controller
{
    protected static $days=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];



    private function getProfeInfoById($codigo){

        $profe = DatosAcademicos::where("ID_DOCENTE",DB::raw("'".$codigo."'" ))
            ->select("ID_DOCENTE","NOMBRES_DOCENTE", "APELLIDOS_DOCENTE")
            ->distinct()->get();

        return $profe[0];

    }

    private function getNrc(){

        $day = 'Lunes';

        $nrcData = DatosAcademicos::where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('NRC')
            ->distinct()->get();

        $nrc = substr(serialize($nrcData), 42, 4);

        return $nrc;


    }

    private function getMissingStudents(){

        $nrc = $this->getNrc();

        $missing = Asistentes::where('nrc', '=', $nrc)
            ->select('idEstudiante')
            ->distinct()->get();


        $matchThese = array();

        forEach($missing as $miss){

            $x = substr(serialize($miss), 43, 9);

            array_push($matchThese, ['e.ID' => "".$x.""]);
            #array_push($m, $x);

        }

        return $matchThese;
    }
/*    private function getAssistants(){

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
    }*/

    public function profeInfo(){

        $profe = $this->getProfeInfoById(ApiAuthController::getCode());

        return response()->json($profe);
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

         *
         * QUERY REAL ---  DESCOMENTAR LUEGO DE FASE DE TEST
         *



         * Todo: Datos quemaos pa prueba... -> Clase de Paralelismo NRC
        $day = 'Lunes'; // DIA QUEMADO


        $classdata = DatosAcademicos::where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('ASIGNATURA','NRC',DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) as Inicio, cast(SUBSTRING(".$day.",7,LOCATE('-',".$day.")-1) as time ) as Fin "))
            ->distinct()->get();

        $nrc = $classdata[0]['attributes']["NRC"];


        $students=Estudiantes::join("datos_ascademicos as da","estudiantes.id","=","da.id")
            ->where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between '13:00' and '13:59'"))
            ->select('estudiantes.ID' ,'estudiantes.NOMBRES','estudiantes.APELLIDOS','estudiantes.PROGRAMA')
            ->distinct()->get();

         */


        //Final query.
        $day=ScheduleController::$days[Carbon::now(-4)->dayOfWeek];
        $hour=Carbon::now(-4)->hour.":".Carbon::now(-4)->minute;

        $classdata = DatosAcademicos::where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between CONCAT(LEFT(curtime(),3),'00:00') and curtime() "))
            ->select('ASIGNATURA','NRC',DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) as Inicio, cast(SUBSTRING(".$day.",7,LOCATE('-',".$day.")-1) as time ) as Fin "))
            ->distinct()->get();

        if ($classdata->isEmpty()){

            $end = ["Dia"=>$day,"Hora"=>$hour,"Info"=>'No está en ninguna clase', "Estudiantes"=>[]];
            return response()->json($end);

        }

        $nrc = $classdata[0]['attributes']["NRC"];

        $students=Estudiantes::join("datos_ascademicos as da","estudiantes.id","=","da.id")
            ->where("ID_DOCENTE",DB::raw("'".ApiAuthController::getCode()."'" ))
            ->whereRaw(DB::raw("cast(SUBSTRING(".$day.",1,LOCATE('-',".$day.")-1) as time ) between CONCAT(LEFT(curtime(),3),'00:00') and curtime()"))
            ->select('estudiantes.ID' ,'estudiantes.NOMBRES','estudiantes.APELLIDOS','estudiantes.PROGRAMA')
            ->distinct()->get();

        forEach ($students as $student) {

            $campos = ['idEstudiante' => $student['attributes']['ID'],
                'nrc' => $nrc];
            try {

                $a = Asistentes::where('idEstudiante' , $student['attributes']['ID'])
                    ->where("nrc", $nrc)
                    ->whereRaw("created_at between curdate() and concat(curdate(), \" 23:59:59\")")
                    ->firstOrFail();

            } catch (\Exception $e){

                Asistentes::create($campos);
            }
        }

        $attendees = Asistentes::with(array('info_estudiante'=>function($query){
            $query->select('ID','NOMBRES','APELLIDOS','TELEFONO1','EMAIL','PROGRAMA');
        }))
            ->with('estado')
            ->where("nrc", $nrc)
            ->whereRaw("created_at between curdate() and concat(curdate(), \" 23:59:59\")")
            ->select('id','estado','idEstudiante')
            ->get();

        $data = ["Dia"=>$day,"Hora"=>$hour,"Info"=>$classdata[0], "Estudiantes"=>$attendees];

        return response()
            ->json($data);

    }
}
