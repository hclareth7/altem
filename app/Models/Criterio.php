<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Criterio extends Model
{
    protected $table = 'criterios';

    public $timestamps = false;

    protected $fillable = ['nombre', 'tabla', 'campo', 'operador', 'valor', 'bases_datos_estudiantes_id'];

    public function base_datos_estudiantes()
    {
        return $this->belongsTo('App\Models\BaseDatosEstudiantes', 'bases_datos_estudiantes_id', 'id');
    }


    public function poblaciones()
    {
        return $this->hasMany('App\Models\Riesgo', 'criterios_id', 'id');
    }
}
