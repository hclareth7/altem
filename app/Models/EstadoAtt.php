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
    protected $connection = 'mysql2';

    protected $table = 'estado_att';

    protected $fillable = [
        'idestado_att',
        'descripcion',

    ];

    public function attendees(){

        return $this->hasMany('App\Models\Attendees');
    }

}

