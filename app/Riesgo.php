<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Riesgo extends Model
{
    use SoftDeletes;
	protected $table="riesgos";
	protected $fillable=['nombre','descripcion'];
	protected $datos="deleted_at";

	public function tiporiesgo()
    {
        return $this->belongsTo('App\TipoRiesgo');
    }
}
