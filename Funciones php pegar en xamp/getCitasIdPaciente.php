<?php
//idCitas, Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente
header("Access-Control-Allow-Origin: http://localhost:8080");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
$time = time();
$key = 'token';
$JWT= $_GET["id"];
//echo $JWT;
$data = JWT::decode($JWT, $key, array('HS256'));
$id=$data->data->id;

//echo "Estamos en php de obtencion de citas : ";
//$Fecha = $_GET["Fecha"];
//echo $_GET["Fecha"];
//$re=substr($Fecha,10,10);
//echo $re;
//$Fecha = $re;
//echo $Fecha;

$bd = include_once "bd.php";

$sentencia = $bd->query("select citas.idCitas, citas.Hora, citas.Dia as Fecha, citas.Lugar, paciente.NomPac, doctor.NomDoc, doctor.ApellidoDoc, citas.pago as Asistio
from citas
JOIN paciente ON paciente.idPaciente = citas.Paciente_idPaciente
JOIN doctor ON doctor.idDoctor = citas.Doctor_idDoctor
where paciente.idPaciente='$id'");

$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

//eliminando duplicidad creada por ser el dia de hoy
$pacientes = array_values( array_unique( $pacientes, SORT_REGULAR ) );

echo json_encode($pacientes);
return json_encode($pacientes);