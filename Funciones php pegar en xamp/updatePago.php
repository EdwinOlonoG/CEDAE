<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
//idCitas, Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente
echo "Update del pago: ";

$jsonMascota = json_decode(file_get_contents("php://input"));
//echo $jsonMascota;
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->Hora;

$Hora = $j->Hora;
$Dia = $j->Fecha;
$NomDoc = $j->NomDoc;
$ApellidoDoc = $j->ApellidoDoc;


/*
$Hora = $_GET["Hora"];
$Dia = $_GET["Fecha"];
$NomDoc = $_GET["NomDoc"];
$ApellidoDoc = $_GET["ApellidoDoc"];
*/
$Pago=1;

$bd = include_once "bd.php";

echo "Empiezo el pago";
$sentencia = $bd->prepare("UPDATE citas
JOIN doctor ON doctor.idDoctor = citas.Doctor_idDoctor
SET citas.Pago = ?
WHERE citas.Hora = ? AND citas.Dia = ? AND doctor.NomDoc = ? AND doctor.ApellidoDoc =  ?");
$resultado = $sentencia->execute([$Pago,$Hora,$Dia,$NomDoc,$ApellidoDoc]);
