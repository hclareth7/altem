<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Observacion extends Model
{
    protected $table = 'observaciones';
    protected $primaryKey= "id";
    public $timestamps=false;

    protected $fillable = ['contenido', 'acciones_aplicadas_id', 'fecha', 'usuarios_codigo'];

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'usuarios_codigo','codigo');
    }


    public function accione_aplicada()
    {
        return $this->belongsTo('App\Models\AccionAplicada', 'acciones_aplicadas_id', 'id');
    }


}
