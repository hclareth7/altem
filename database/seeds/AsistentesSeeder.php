<?php

use Illuminate\Database\Seeder;
use DB;

class AsistentesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $randomLecture = Schedule::orderByRaw("RAND()")->first()['attributes'];
        $nrc = $randomLecture['NRC'];
    
        $lectureStudents = Cursante::findMany([$nrc]);

        forEach ($lectureStudents as $student) {
            $row = [
                'idEstudiante' => $student['attributes']['ID_ESTUDIANTE'],
                'nrc' => $student['attributes']['id'],
                'created_at' => new Date(),
                'updated_at' => new Date(),
                'estado' => mt_rand( 1, 3 )
            ];

            DB::table('asistentes')->insert($row);
    }
}
