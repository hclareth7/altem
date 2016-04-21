<?php namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Estrategia extends Model {
	use SoftDeletes;

	protected $table = 'estrategias';
	protected $fillable=['nombre','descripcion'];
	protected $dates= ['deleted_at'];

}
