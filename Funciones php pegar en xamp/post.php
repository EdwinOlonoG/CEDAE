<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$jsonPaciente = json_decode(file_get_contents("php://input"));
if (!$jsonMascota) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("insert into paciente(idPaciente, nomPac, TelPac, EdadPac, CorreoPac, SexoPac) values (?,?,?,?,?,?)");
$resultado = $sentencia->execute([$jsonPaciente->idPaciente, $jsonPaciente->nomPac, $jsonPaciente->TelPac , $jsonPaciente->EdadPac, , $jsonPaciente->CorreoPac, , $jsonPaciente->SexPac]);
echo json_encode([
    "resultado" => $resultado,
]);