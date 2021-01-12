<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
/*
session_start();
if (empty($_SESSION["idDoctor"])) {
    exit("No hay sesion");
}
$idPaciente = $_SESSION["idDoctor"];
*/
$idPaciente = $_GET["idDoctor"];
//echo "Id doctor  $idPaciente \n";
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select paciente.idPaciente, paciente.nomPac, paciente.TelPac, paciente.EdadPac, paciente.CorreoPac, paciente.SexoPac 
from paciente 
INNER JOIN doctor 
on paciente.idPaciente = doctor.Paciente_idPaciente
where doctor.idDoctor=?");
$sentencia->execute([$idPaciente]);
$pacientes = $sentencia->fetchAll(PDO::FETCH_ASSOC);
//guardar Json
unlink('pacientesDeMedico.json');
$file = fopen("pacientesDeMedico.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);