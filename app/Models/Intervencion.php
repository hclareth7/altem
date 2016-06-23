<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intervencion extends Model
{
    //
	
	protected $table = 'intervenciones';
	
	public $timestamps=false;
	
	protected $fillable=['estado','estrategias_id','fecha_inicio'];

	public function estrategias()
    {
        return $this->hasOne('App\Models\Estrategia');
    }
	
	public function archivo_personal()
    {
        return $this->hasMany('App\Models\ArchivoPersonal');
    }

}