<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
$metodo = $_SERVER["REQUEST_METHOD"];
if ($metodo != "DELETE" && $metodo != "OPTIONS") {
    exit("Solo se permite método DELETE");
}

if (empty($_GET["idPaciente"])) {
    exit("No hay id de mascota para eliminar");
}
$idMascota = $_GET["idPaciente"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("DELETE FROM paciente WHERE idPaciente = ?");
$resultado = $sentencia->execute([$idMascota]);
echo json_encode($resultado);