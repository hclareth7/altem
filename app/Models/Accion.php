<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accion extends Model
{
    protected $table = 'acciones';
	
	public $timestamps=false;
	
	protected $fillable=['nombre','descripcion','estrategias_id','tiempo_estimado','costo_estimado'];

	public function estrategia()
    {
        return $this->belongsTo('App\Models\Estrategia');
    }
	
	
	
	
}