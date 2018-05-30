<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 4/23/2018
 * Time: 1:04 PM
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatosAcademicos extends Model
{
    protected $connection = 'sirius';

    public $incrementing = false;
    public $timestamps = false;

    protected $table ="datos_academicos";
}
