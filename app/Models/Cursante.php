<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 31 Oct 2017 01:02:18 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cursante extends Model
{
    protected $connection = 'mysql2';

    public $incrementing = false;
    public $timestamps = false;

    protected $table ="asistentes";
}
