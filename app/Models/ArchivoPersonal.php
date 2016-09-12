<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArchivoPersonal extends Model
{
    protected $table = 'archivo_personal';

    protected $primaryKey = 'id';
	
	public $timestamps=false;

    protected $fillable = ['estudiantes_altem_codigo', 'fecha_reporte', 'riesgos_id', 'usuarios_codigo','intervenciones_id'];

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'usuarios_codigo','codigo');
    }
    public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo','riesgos_id','id');
    }

    public function intervencion()
    {
        return $this->belongsTo('App\Models\Intervencion', 'intervenciones_id','id');
    }

    public function estudiante_altem()
    {
        return $this->belongsTo('App\Models\EstudianteAltem', 'estudiantes_altem_codigo','codigo');

    }

}
