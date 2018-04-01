<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poblacion extends Model
{
    protected $table = 'poblaciones';

    protected $fillable = ['usuarios_codigo', 'criterios_id'];

    protected $primaryKey= "id";


    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'usuarios_codigo', 'id');
    }

    public function criterio()
    {
        return $this->belongsTo('App\Models\Criterio', 'criterios_id', 'id');
    }

}
