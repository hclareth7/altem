<?php
/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 13/07/2016
 * Time: 13:51
 */

namespace App\Providers;
use App\Auth\LdapUserProvider;
use Illuminate\Support\ServiceProvider;

class LdapAuthProvider  extends ServiceProvider
{


    public function boot()
    {

        $this->app['auth']->extend('ldap',function()
        {
            return new LdapUserProvider();
        });
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        // TODO: Implement register() method.
    }
}