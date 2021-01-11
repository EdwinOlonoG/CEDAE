<?php
session_start();
//$_SESSION[idDoctor]
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_SESSION["idDoctor"])) {
    exit("No hay id del paciente");
}
$idPaciente = $_SESSION["idDoctor"];
echo "Id doctor  $idPaciente \n";
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select paciente.idPaciente, paciente.nomPac, paciente.TelPac, paciente.EdadPac, paciente.CorreoPac, paciente.SexoPac 
from paciente 
INNER JOIN doctor 
on paciente.idPaciente = doctor.Paciente_idPaciente
where doctor.idDoctor=?");
$sentencia->execute([$idPaciente]);
$paciente = $sentencia->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($paciente);



/*
<?php
session_start();
//$_SESSION[idDoctor]
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_GET["idPaciente"])) {
    exit("No hay id del paciente");
}
$idPaciente = $_GET["idPaciente"];
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select idPaciente, nomPac, TelPac, EdadPac, CorreoPac, SexoPac from paciente, doctor where idPaciente = Paciente_idPaciente and ");
$sentencia->execute([$idPaciente]);
$paciente = $sentencia->fetchObject();
echo json_encode($paciente);
*/