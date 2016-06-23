<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccionAplicada extends Model
{
     protected $table = 'acciones_aplicadas';
	
	public $timestamps=false;
	
	protected $fillable=['observacion','fecha_aplicacion','intervencion_id','acciones_id'];

	
	public function accion()
    {
        return $this->belongsTo('App\Models\Accion');
    }
	
	public function intervencion()
    {
        return $this->belongsTo('App\Models\Intervencion');
    }
}