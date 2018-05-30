<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filtro extends Model
{

    protected $table = 'filtros';

    public $timestamps = false;

    protected $fillable = ['nombre', 'tabla', 'campo', 'operador', 'valor', 'tipo', 'riesgos_id', 'bases_datos_estudiantes_id'];

    public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo', 'riesgos_id', 'id');
    }


    public function base_datos_estudiantes()
    {
        return $this->belongsTo('App\Models\BaseDatosEstudiantes', 'bases_datos_estudiantes_id', 'id');
    }

    public function getQuery()
    {
        $sql = "";
        $filtros = $this->all();
        foreach ($filtros as $key => $value) {
            if ($key == 0) {
                $sql = " and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            } else {
                $sql .= " and  " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            }
        }
        return $sql;
    }
}
