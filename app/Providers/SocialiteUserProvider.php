<?php
/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 06/07/2016
 * Time: 11:50
 */

namespace App\Providers;

use App\User;
use App\Services\UserService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;

class SocialiteUserProvider implements UserProvider
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function retrieveById($identifier)
    {
        $result = $this->userService->getUserByEmail($identifier);
        if(count($result) === 0)
        {
            $user = null;
        }
        else
        {
            $user = new User($result[0]);
        }

        return $user;
    }

    public function retrieveByToken($identifier, $token)
    {
        // Implement your own.
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
        // Implement your own.
    }

    public function retrieveByCredentials(array $credentials)
    {
        // Implement your own.
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        // Implement your own.
    }
}