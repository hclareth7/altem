<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccionAplicada extends Model
{
     protected $table = 'acciones_aplicadas';
	
	public $timestamps=false;
	
	protected $fillable=['fecha_aplicacion','intervenciones_id','acciones_id','estado'];

	
	public function accion()
    {
        return $this->belongsTo('App\Models\Accion', 'acciones_id', 'id');
    }
	
	public function intervencion()
    {
        return $this->belongsTo('App\Models\Intervencion', 'intervenciones_id', 'id');
    }

    public function observaciones()
    {
        return $this->hasMany('App\Models\Observacion', 'acciones_aplicadas_id', 'id');
    }
}