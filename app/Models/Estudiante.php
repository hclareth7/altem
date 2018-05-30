<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiantes';

    public $timestamps = false;

    protected $fillable = ['codigo', 'propiedad'];


}
