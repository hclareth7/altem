<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poblacion extends Model
{
    protected $table = 'poblaciones';

    protected $fillable = ['nombre', 'campo', 'operador', 'valor', 'tipo', 'usuarios_codigo'];

    protected $primaryKey= "id";


    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'usuarios_codigo', 'id');
    }

}
