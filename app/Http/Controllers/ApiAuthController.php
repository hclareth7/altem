<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ApiAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        // Parsing the Token and throw exemptions if error



    }
    public function index()
    {
        // = JWTAuth::parseToken()->authenticate();
        //return response()->json($user);
        $user = Auth::user();
       
        $roles = Auth::user()->with('roles')->get()->filter(function ($item) {
            $user = Auth::user();
            return $item->codigo == $user->id;
        })->first();
        // $permission = Permission::with('roles')->find($roles->roles->first()->id);
        $permission = $roles->roles->first()->with('perms')->get()->first()->find($roles->roles->first()->id)->perms;
        // $permission = Permission::with('roles')->get();

        $datos= $permission->map(function ($value){
            return $value->name;
        });
        $roleData=$roles->roles->map(function ($value){
            return $value->name;
        });
        $user->rol = $roleData[0];
        $user->permissions = $datos;
        return response()->json($user);
    }
    /**
     * Return a JWT
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
        //dd($request);
        $credentials = $request->only('codigo', 'password');

        try {
            // verify the credentials and create a token for the user
            $token = JWTAuth::attempt($credentials);


            if (!$token) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT

        return response()->json(compact('token'));
    }


}