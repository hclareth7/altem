<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filtro extends Model
{

    protected $table = 'filtros';

    public $timestamps = false;

    protected $fillable = ['nombre', 'campo', 'operador', 'valor', 'tipo', 'riesgos_id', 'base_datos'];

    public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo', 'riesgos_id', 'id');
    }


    public function baseDatos(){

        return $this->belongsTo('App\Models\BaseDatos', 'base_datos', 'idb');
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
