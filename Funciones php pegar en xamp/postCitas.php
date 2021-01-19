<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

echo "Entre a postCitas, ";


$jsonMascota = json_decode(file_get_contents("php://input"));
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->Hora;

$NomPac = $j->NomPac;
$Hora = $j->Hora;
$Dia = $j->Fecha;
$NomDoc = $j->NomDoc;
$ApellidoDoc = $j->ApellidoDoc;

$idSucursal = 1;
/*
$Hora = $_GET["Hora"];
$Dia = $_GET["Fecha"];
$NomPac = $_GET["NomPac"];
$NomDoc = $_GET["NomDoc"];
$ApellidoDoc = $_GET["ApellidoDoc"];
*/

$bd = include_once "bd.php";


//Obtener id del medico
echo "Buscando el id del doctor";
$sentencia = $bd->query("select idDoctor from doctor where NomDoc='$NomDoc' AND ApellidoDoc='$ApellidoDoc'");
$respuesta = $sentencia->fetchAll(PDO::FETCH_OBJ);
//echo json_encode($idDoctor);
var_dump($respuesta);
$idDoctor=$respuesta[0]->idDoctor;
echo $idDoctor;

//Obtener id del medico
echo "Buscando el id del Paciente";
$sentencia = $bd->query("select idPaciente from paciente where NomPac='$NomPac'");
$respuesta = $sentencia->fetchAll(PDO::FETCH_OBJ);
//echo json_encode($idDoctor);
var_dump($respuesta);
$idPaciente=$respuesta[0]->idPaciente;
echo $idPaciente;

$sentencia = $bd->prepare("insert into citas(Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente, Pago) values (?,?,?,?,?,?,?)");
$resultado = $sentencia->execute([$Hora ,$Dia,"Loma Bonita", $idDoctor, $idSucursal, $idPaciente, 0]);
echo json_encode([
	"resultado" => $resultado,
]);