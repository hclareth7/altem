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
        if (!$conn = ldap_connect("ldap://$this->hostname")) {
            dd("Could not connect to LDAP host $this->hostname: " . ldap_error($conn), 401);
            return false;
        }
        if (!$con = ldap_bind($conn, "uid=" . $username . $this->rdn, $password)) {

            dd('Could not bind to AD: ' . ldap_error($conn), 401);
            return false;
        } else {


            $filter = sprintf('(uid=%)', $username);
            $datos = ldap_search($conn, $this->rdn, 'uid=t00020904',array('uid','cn','mail'));
            dd($datos);
            $nombre = $datos[0];
            $codigo = $datos[1];
            $correo = $datos[2];

            $this->usuario = new Usuario();
            $this->usuario->setNombre($nombre);
            $this->usuario->setCodigo($codigo);
            $this->usuario->setCorreo($correo);
            return true;
        }
        return false;
    }

}