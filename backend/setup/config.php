<?php
    $cnx = mysqli_connect(HOST, USUARIO, PASSWORD, BD);
    mysqli_set_charset($cnx, ENCODE_UTF8);
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header("Content-Type: application/json");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
?>