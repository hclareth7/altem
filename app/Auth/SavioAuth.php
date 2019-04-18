<?php

namespace App\Auth;
use Illuminate\Auth\Authenticatable;
use App\Models\Usuario;
use Requests;
use DB;

class SavioAuth
{
    private $usuario;

    public function __construct()
    {
        $this->savioTokenURL = env('SAVIO_TOKEN_URL');
        $this->savioUserURL = env('SAVIO_USER_URL');

        Requests::register_autoloader();
    }

    private function getSavioAccessToken($username, $password) {
        $authRequest = Requests::get("$this->savioTokenURL?username=$username&password=$password&service=moodle_mobile_app");
        $savioResponse = json_decode($authRequest->body);

        // if the credentials are valid, we get the token, else, we get error
        if( !isset($savioResponse->token) ) {
            dd($savioResponse->error);
            return false;
        }

        $this->token = $savioResponse->token;
        return $savioResponse->token;
    }

    public function getSavioUserData($codigo) {

        $usuario = Usuario::find($codigo);
        $token = $usuario->savio_token;

        $authRequest = Requests::get("$this->savioUserURL?wstoken=$token&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json");
        $savioResponse = json_decode($authRequest->body);

        // if the token is valid, we get the userid, else, we get error
        if( !isset($savioResponse->username) ) {
            dd($savioResponse->message);
            return;
        }

        $userData = $savioResponse;

        $this->usuario = new Usuario();

        $this->usuario->nombre = $userData->fullname;
        $this->usuario->codigo = $userData->username;
        $this->usuario->correo = "$userData->username@utbvirtual.edu.co";
        $this->usuario->id = $userData->username;

        return $this->usuario;
    }

    public function verificarUsuario($username, $password)
    {

        if (!$username or !$password) {
            dd('Datos de acceso faltantes.', 401);
            return false;
        }

        $token = SavioAuth::getSavioAccessToken($username, $password);

        if( !$token ) {
            return false;
        } else {
            /** We save the user's SAVIO token
             * in order to use it in the future
             * to retreive it's user data 
             * (Name, E-Mail, etc.) that
             * used to be on LDAP
             */
            DB::table('usuarios')
                    ->where('codigo', $username)
                    ->update(['savio_token' => $token]);

            $this->usuario = new Usuario();

            $this->usuario->codigo = $username;
            $this->usuario->password = $password;
            $this->usuario->id = $password;

            return true;
        }
    }

    public function verificarUsuarioById($codigoUtbId)
    {
        $userData = SavioAuth::getSavioUserData($codigoUtbId);
        return $userData;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }


}