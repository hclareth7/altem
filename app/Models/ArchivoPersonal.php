<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArchivoPersonal extends Model
{
    protected $table = 'archivo_personal';
	
	public $timestamps=false;
	
	protected $fillable=['estudiante','interveciones_id','riesgos_id'];

	
	public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo');
    }
	
	public function intervencion()
    {
        return $this->belongsTo('App\Models\Intervencion');
    }


}
