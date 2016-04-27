<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoRiesgo extends Model
{
	protected $table="tipo_riesgos";
	protected $fillable=['nombre','descripcion'];

	public function riegos(){
		return $this->hasMany('App\Models\Riesgo');
	}

}
