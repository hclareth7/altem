<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Zizaco\Entrust\Traits\EntrustUserTrait;

class Usuario extends Model implements AuthenticatableContract
{
    use Authenticatable, EntrustUserTrait;

    protected $table = 'usuarios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $fillable = ['nombre', 'correo', 'codigo'];

    protected $primaryKey= "codigo";



    
    






}
