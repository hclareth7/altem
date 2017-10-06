<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Usuario;
use Illuminate\Routing\Route;
use App\Http\Controllers\Controller;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->beforeFilter('@find', ['only' => ['show']]);
    }


    public function find(Route $route)
    {

        $this->usuario = Usuario::find($route->getParameter('usuario'));
    }

    public function index()
    {
        $usuarios = Usuario::with(['roles','poblaciones'])->get();
        return response()->json($usuarios);
    }


    public function show($id)
    {
        return response()->json($this->usuario);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $codigo = $request->codigo;
        $estado= $request->estado;

        $verify = Auth::getProvider()->retrieveById($codigo);
        if($verify){
            $usuario =new  Usuario();
            $usuario->codigo=$codigo;
            $usuario->estado=$estado;
            $usuario->save();
            return response()->json(["mensaje"=>"Creada correctamente"]);
        }else{
            return response()->json(["mensaje"=>"El usuario no existe"]);

        }



    }



    public function createRole(Request $request)
    {
        $role = new Role();
        $role->name = $request->input('name');
        $role->save();

        return response()->json("created");
    }

    public function createPermission(Request $request)
    {
        $viewUsers = new Permission();
        $viewUsers->name = $request->input('name');
        $viewUsers->save();

        return response()->json("created");
    }

    public function assignRole(Request $request)
    {
        $user = Usuario::where('codigo', '=', $request->input('codigo'))->first();
        //dd($user);
        $role = Role::where('name', '=', $request->input('role'))->first();
        //$user->attachRole($request->input('role'));
        $user->roles()->attach($role->id);

        //$role->user()->attach($user->id);

        return response()->json("created");
    }

    public function attachPermission(Request $request)
    {
        $role = Role::where('name', '=', $request->input('role'))->first();
        $permisos = Permission::where('name', '=', $request->input('name'))->first();
        //dd($permisos);

        $role->attachPermission($permisos);

        return response()->json("created");
    }


}
