<?php

return [
    'oracle' => [
        'driver'    => 'oci8',
        'tns'       => env('DB_TNS', ''),
        'host'      => env('DB_HOST', '172.16.8.10'),
        'port'      => env('DB_PORT', '1521'),
        'database'  => env('DB_DATABASE', 'PROD'),
        'username'  => env('DB_USERNAME', 'altem'),
        'password'  => env('DB_PASSWORD', 'Altem_2016'),
        'charset'   => 'WE8ISO8859P1',
        'prefix'    => '',
        'quoting'   => false,
    ],
];
