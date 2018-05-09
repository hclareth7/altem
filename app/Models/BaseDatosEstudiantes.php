<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseDatosEstudiantes extends Model
{
    protected $table = 'bases_datos_estudiantes';

    public $timestamps = false;

    protected $fillable = ['nombre','tipo', 'descricion','propiedades'];

    public function filtros(){
        return $this->hasMany('App\Models\Filtro','bases_datos_estudiantes_id','id');
    }

    public function criterios(){
        return $this->hasMany('App\Models\Criterio','bases_datos_estudiantes_id','id');
    }

    public function getConection($data_base_name)
    {
        return \DB::connection($data_base_name);
    }

}
