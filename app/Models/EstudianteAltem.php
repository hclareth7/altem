<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudianteAltem extends Model
{
    protected $table = 'estudiantes_altem';

    public $timestamps = false;

    protected $fillable = ['codigo', 'programa'];
}
