<?php
//del 4 para abajo de los datos
header("Access-Control-Allow-Origin: http://localhost:8080");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

$time = time();
$key = 'token';
$JWT= $_GET["id"];
$data = JWT::decode($JWT, $key, array('HS256'));
$id=$data->data->id;

$bd = include_once "bd.php";
$sentencia = $bd->query("select idExpedientes, Paciente_idPaciente, Paciente_Usuarios_IdUsuarios, NSS, FechaNa, Domicilio, Nacionalidad, FichaId, AntecedentesF, AntecedentesP, Exploracion, Pulso, Temperatura, EstadoF, ResultadosLab, Pronostico, SignosVit, Resultados, Diagnostico, PronosticoEv
from expedientes 
where expedientes.Paciente_idPaciente=$id");
//$sentencia->execute([$id]);
$pacientes = $sentencia->fetchAll(PDO::FETCH_ASSOC);
//echo "hola";
echo json_encode($pacientes);
return json_encode($pacientes);