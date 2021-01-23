<?php
//medicamento, dosis e indicaciones
header("Access-Control-Allow-Origin: http://localhost:8080");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

$time = time();
$key = 'token';
$JWT= $_GET["id"];
$data = JWT::decode($JWT, $key, array('HS256'));
$id=$data->data->id;

$bd = include_once "bd.php";

$sentencia = $bd->query("select Medicamento, Dosis, Indicaciones, Fecha from receta where receta.idPaciente=$id");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

echo json_encode($pacientes);
return json_encode($pacientes);