<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccionAplicada extends Model
{
     protected $table = 'acciones_aplicadas';
	
	public $timestamps=false;
	
	protected $fillable=['observacion','fecha_aplicacion','intervenciones_id','acciones_id','estado'];

	
	public function accion()
    {
        return $this->belongsTo('App\Models\Accion');
    }
	
	public function intervencion()
    {
        return $this->belongsTo('App\Models\Intervencion');
    }
}