<?php
/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 13/07/2016
 * Time: 13:51
 */

namespace App\Providers;
use App\Auth\SavioUserProvider;
use Illuminate\Support\ServiceProvider;

class SavioAuthProvider extends ServiceProvider
{

    public function boot()
    {

        $this->app['auth']->extend('eloquent',function()
        {
            return new SavioUserProvider();
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