<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asistentes extends Model
{
    protected $connection = 'mae';

    public $timestamps = true;

    protected $table = 'asistentes';

    protected $primaryKey = 'id';

    protected $fillable = [
        'idEstudiante',
        'nrc',

    ];

    public function info_estudiante(){

        return $this->belongsTo('App\Models\Estudiantes', 'idEstudiante', 'ID');
    }

    public function estado(){

        return $this->belongsTo('App\Models\EstadoAtt', 'estado', 'id');

    }

}

