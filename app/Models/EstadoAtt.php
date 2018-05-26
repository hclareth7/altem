<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/23/2018
 * Time: 10:42 AM
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class EstadoAtt extends Model
{
    protected $connection = 'mae';

    protected $table = 'estados';

    protected $fillable = [
        'id',
        'descripcion',

    ];

    public function attendees(){

        return $this->hasMany('App\Models\Asistentes');
    }

}

