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
    
    protected $fillable = ['nombre', 'correo', 'codigo', 'estado'];

    protected $primaryKey= "codigo";

    public function roles()
    {
        return $this->belongsToMany('App\Models\Role','role_usuario','usuario_id','role_id');
    }

    public function poblaciones(){
        return $this->hasMany('App\Models\Poblacion','usuarios_codigo','id');
    }


}
