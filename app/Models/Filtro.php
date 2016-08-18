<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filtro extends Model
{

    protected $table = 'filtros';

    public $timestamps = false;

    protected $fillable = ['nombre', 'campo', 'operador', 'valor', 'tipo', 'riesgos_id'];

    public function tiporiesgo()
    {
        return $this->belongsTo('App\Models\TipoRiesgo');
    }

    public function ejecutar($id)
    {
        $sql = "";
        $filtros = $this->where('riesgos_id', $id)->get();
        foreach ($filtros as $key => $value) {

            if ($key == 0) {
                $sql = " and " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            } else {
                $sql .= " and  " . $value['campo'] . " " . $value['operador'] . " '" . $value['valor'] . "' ";
            }


        }

        return $sql;

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
