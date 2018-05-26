<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/26/2018
 * Time: 8:55 PM
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseDatos extends Model
{
    protected $table = 'base_datos';

    public $timestamps=false;

    protected $fillable=['idb','nombre','descripcion'];

    protected $primaryKey = 'idb';


    public function filtro(){

        $this->hasMany('App\Models\Filtro');

    }


}