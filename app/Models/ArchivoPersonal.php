<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArchivoPersonal extends Model
{
    protected $table = 'archivo_personal';
	
	public $timestamps=false;

    protected $fillable = ['estudiante', 'fecha_reporte', 'riesgos_id', 'usuarios_codigo'];

	public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo','id');
    }

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuarios','codigo');
    }
}
