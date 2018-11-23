<?php

/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 13/07/2016
 * Time: 13:58
 */

namespace App\Auth;

use App\Models\Usuario;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;


class LdapUserProvider implements UserProvider
{
    public function __construct()
    {
        $this->conect = new LdapServerConnection();

    }

    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        if ($usuario= $this->conect->verificarUsuarioById($identifier)) {
            return $usuario;
        }else{

            return false;
        }
    }

    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed $identifier
     * @param  string $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByToken($identifier, $token)
    {
        dd('retrieveByToken') ;
        return null;
    }

    /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  string $token
     * @return void
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {


        return $user;
    }

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        if ($this->conect->verificarUsuario($credentials['codigo'], $credentials['password'])) {
            $user = $this->conect->getUsuario();
            return $user;
        }

        return null;
    }

    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  array $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {

        if ($user->getAuthIdentifier()==$credentials['codigo']&& $user->getAuthPassword()==$credentials['password']){
            return true;
        }
        return false;
    }
}