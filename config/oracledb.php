<?php

return [
    'oracle' => [
        'driver'    => 'oci8',
        'tns'       =>  '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.8.10)(PORT = 1521))(CONNECT_DATA =(SID = PROD)))',
        'host'      =>  '172.16.8.10',
        'port'      =>  '1521',
        'database'  =>  'PROD',
        'username'  =>'altem',
        'password'  =>  'Altem_2016',
        'charset'   => 'WE8ISO8859P1',
        'prefix'    => '',
        'quoting'   => false,
    ],
];
