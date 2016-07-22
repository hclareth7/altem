<?php
/**
 * Created by PhpStorm.
 * User: Full Stack JavaScrip
 * Date: 13/07/2016
 * Time: 14:45
 */

namespace App\Auth;

use App\Models\Usuario;


class LdapServerConnection
{
    private $usuario;

    public function __construct()
    {
        $this->rdn = env('LDAP_RDN');
        $this->hostname = env('LDAP_HOSTNAME');
    }

    public function verificarUsuario($username, $password)
    {
        if (!$username or !$password ) {
            dd('Datos de acceso faltantes.', 401);
            return false;
        }
        if (!extension_loaded('ldap')) {
            dd('PHP LDAP extension not loaded.', 418);
            return false;
        }
        $conn = ldap_connect("$this->hostname");
        if (!$conn) {
            dd("Could not connect to LDAP host $this->hostname: " . ldap_error($conn), 401);
            return false;
        }

        ldap_set_option($conn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($conn, LDAP_OPT_REFERRALS, 0);
        if (!$con = ldap_bind($conn, "uid=" . $username . ',' . $this->rdn, $password)) {

            dd('Could not bind to AD: ' . ldap_error($conn), 401);
            return false;
        } else {


            $result = ldap_search($conn, $this->rdn, 'uid=t00032041', array('uid', 'cn', 'mail'));
            $datos = ldap_get_entries($conn, $result);

            for ($i=0; $i<$datos["count"]; $i++) {
                $nombre =$datos[$i]["cn"][0] ;
                $codigo =  $datos[$i]["uid"][0];
                $correo = $datos[$i]["mail"][0];
            }

            $this->usuario = new Usuario();
            $this->usuario->setNombre($nombre);
            $this->usuario->setCodigo($codigo);
            $this->usuario->setCorreo($correo);

            //dd($this->usuario);
            return true;
        }
        return false;
    }

}