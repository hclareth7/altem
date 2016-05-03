<?php namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Estrategia extends Model {

	protected $table = 'estrategias';

	protected $fillable=['nombre','descripcion','riesgo_id'];

	//el nombre de la llave foranea es riesgo_id
	public function riesgo()
    {
        return $this->belongsTo('App\Models\Riesgo');
    }

}
