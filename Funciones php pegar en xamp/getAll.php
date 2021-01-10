<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_GET["idPaciente"])) {
    exit("No hay id del paciente");
}
$idPaciente = $_GET["idPaciente"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select idPaciente, nomPac, TelPac, EdadPac, CorreoPac, SexoPac from paciente where id = ?");
$sentencia->execute([$idPaciente]);
$paciente = $sentencia->fetchObject();
echo json_encode($paciente);