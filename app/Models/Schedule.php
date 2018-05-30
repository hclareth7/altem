<?php
/**
 * Created by PhpStorm.
 * User: Misaj
 * Date: 3/15/2018
 * Time: 1:57 PM
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $connection = 'sirius';

    public $incrementing = false;
    public $timestamps = false;

    protected $table = 'horarios';


}