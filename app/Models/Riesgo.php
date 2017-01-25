<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Riesgo extends Model
{
	protected $table="riesgos";
    protected $primaryKey = 'id';
	protected $fillable=['nombre','descripcion','tipo_riesgos_id','estrategias_id'];
    public $timestamps = false;
	//el nombre de la llave foranea es tiporiesgo_id
	public function tiporiesgo()
    {
        return $this->belongsTo('App\Models\TipoRiesgo', 'tipo_riesgos_id', 'id');
    }

	public function estrategias()
    {
        return $this->belongsToMany('App\Models\Estrategia','estrategias_has_riesgos', 'riesgos_id','estrategias_id');
    }

    public function archivos_Personales()
    {
        return $this->hasMany('App\Models\ArchivoPersonal','riesgos_id','id');
    }
}
