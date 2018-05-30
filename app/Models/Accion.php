<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accion extends Model
{
    protected $table = 'acciones';
	
	public $timestamps=false;
	
	protected $fillable=['nombre','descripcion','estrategias_id','tiempo_estimado','costo_estimado','mensaje'];

	public function estrategia()
    {
        return $this->belongsTo('App\Models\Estrategia','estrategias_id','id');
    }


    public function acciones_aplicadas()
    {
        return $this->hasMany('App\Models\AccionAplicada','acciones_id','id');
    }
	
    
	
	
}