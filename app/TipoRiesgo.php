<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoRiesgo extends Model
{
    use SoftDeletes;
	protected $table="tipo_riesgos";
	protected $fillable=['nombre','descripcion'];
	protected $datos="deleted_at";

	public function riegos(){
		return $this->hasMany('App\Riesgo')
	}

}
