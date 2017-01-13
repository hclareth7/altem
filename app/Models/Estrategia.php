<?php namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Estrategia extends Model {

	protected $table = 'estrategias';
    protected $primaryKey = 'id';

	protected $fillable=['nombre','descripcion','riesgo_id'];

	//el nombre de la llave foranea es riesgo_id
	public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo','riesgo_id','id');
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
