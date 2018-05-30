<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/18/2018
 * Time: 5:30 PM
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{
    protected $connection = 'sirius';
    protected $table = 'estudiantes';


    public function attendees(){

        return $this->hasMany('App\Models\Asistentes');

    }


}


