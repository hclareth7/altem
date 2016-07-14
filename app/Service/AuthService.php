<?php

/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 06/07/2016
 * Time: 11:56
 */
use Illuminate\Auth\Guard;

class AuthService extends Guard
{
    public function signin($email)
    {
        $credentials = array('email' => $email);
        $this->fireAttemptEvent($credentials, false, true);
        $this->lastAttempted = $user = $this->provider->retrieveById($email);

        if($user !== null)
        {
            $this->login($user, false);
            return true;
        }
        else
        {
            return false;
        }
    }

    public function signout()
    {
        $this->clearUserDataFromStorage();

        if(isset($this->events))
        {
            $this->events->fire('auth.logout', [$this->user()]);
        }

        $this->user = null;
        $this->loggedOut = true;
    }
}