<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Riesgo extends Model
{
	protected $table="riesgos";
	protected $fillable=['nombre','descripcion','tiporiesgo_id'];

	//el nombre de la llave foranea es tiporiesgo_id
	public function tiporiesgo()
    {
        return $this->belongsTo('App\Models\TipoRiesgo', 'tiporiesgo_id', 'id');
    }

	public function estrategias()
    {
        return $this->hasMany('App\Models\Estrategia','riesgo_id', 'id');
    }

    public function archivos_Personales()
    {
        return $this->hasMany('App\Models\ArchivoPersonal','riesgos_id','id');
    }
}
