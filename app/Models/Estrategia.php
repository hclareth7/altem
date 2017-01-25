<?php namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Estrategia extends Model {

	protected $table = 'estrategias';
    protected $primaryKey = 'id';

    public $timestamps = false;

	protected $fillable=['nombre','descripcion','riesgos_id'];

	//el nombre de la llave foranea es riesgo_id
	public function riesgos()
    {
        return $this->belongsToMany('App\Models\Riesgo','estrategias_has_riesgos','estrategias_id','riesgos_id');
    }

    public function acciones()
    {
        return $this->hasMany('App\Models\Accion','estrategias_id','id');
    }


    public function intervenciones()
    {
        return $this->hasMany('App\Models\Intervencion','estrategias_id', 'id');
    }

}
