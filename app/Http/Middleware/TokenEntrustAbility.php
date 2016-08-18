<?php
namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class TokenEntrustAbility extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $roles, $permissions, $validateAll = false)
    {
        //dd($this->auth->setRequest($request)->getToken());
        if (!$token = $this->auth->setRequest($request)->getToken()) {
            return $this->respond('tymon.jwt.absent', 'token_not_provided', 400);
        }
        try {
            $user = $this->auth->authenticate($token);
           // dd($user);
        } catch (TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'token_expired', $e->getStatusCode(), [$e]);
        } catch (JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', $e->getStatusCode(), [$e]);
        }
        if (!$user) {
            return $this->respond('tymon.jwt.user_not_found', 'user_not_found', 404);
        }
        //dd($request->user()->ability(explode('|', $roles), explode('|', $permissions), array('validate_all' => $validateAll)));

        if (!$request->user()->ability(explode('|', $roles), explode('|', $permissions), array('validate_all' => $validateAll))) {
            //dd("aqui");
            return $this->respond('tymon.jwt.invalid', 'token_invalid', 401, 'Unauthorized');
        }
        $this->events->fire('tymon.jwt.valid', $user);
        return $next($request);
    }
}