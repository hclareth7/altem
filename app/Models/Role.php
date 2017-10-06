<?php

namespace App\Models;

use Zizaco\Entrust\EntrustRole;


class Role extends EntrustRole
{
    //
    protected $fillable = ['name', 'display_name'];

    protected $primaryKey= "id";

    public function usuarios()
    {
        return $this->belongsToMany('App\Models\Usuario','role_usuario','role_id','usuario_id');
    }
}

