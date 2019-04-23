<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Schedule;
use App\Models\Cursante;
use App\Models\Asistentes;
use Carbon\Carbon;

class AsistentesSeeder extends Seeder {
    /**
     * Run the database seeds.
     *php artisan db:seed --class=AsistentesSeeder
     * @return void
     */
    public function run() {
        // Select a course ramdonly
        $randomLecture = Schedule::orderByRaw("RAND()")->first()['attributes'];
        $nrc = $randomLecture['NRC'];
    
        // get course attendants
        $lectureStudents = Cursante::findMany([$nrc]);

        // create an assistane record for each student
        forEach ($lectureStudents as $student) {
            $row = [
                'idEstudiante' => $student['attributes']['ID_ESTUDIANTE'],
                'nrc' => $student['attributes']['id'],
                'estado' => mt_rand( 1, 3 )
            ];

            Asistentes::create( $row );
        }
    }
}