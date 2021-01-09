<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonPaciente = json_decode(file_get_contents("php://input"));
if (!$jsonPaciente) {
    exit("No hay datos");
}
$bd = include_once "bd.php";
$sentencia = $bd->prepare("UPDATE paciente SET idPaciente = ?, nomPac = ?, TelPac = ?, EdadPac = ?, CorreoPac = ?, SexoPac = ? WHERE id = ?");
$resultado = $sentencia->execute([$jsonPaciente->idPaciente, $jsonPaciente->nomPac, $jsonPaciente->TelPac , $jsonPaciente->EdadPac, , $jsonPaciente->CorreoPac, , $jsonPaciente->SexPac]);
echo json_encode($resultado);

//idPaciente, nomPac, TelPac, EdadPac, CorreoPac, SexoPac