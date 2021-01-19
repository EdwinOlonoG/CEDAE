<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
//idCitas, Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente
echo "Update de la cita: ";

$jsonMascota = json_decode(file_get_contents("php://input"));

$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsoncita";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->NomDoc;


/*
//Datos para solo la bd
$Hora = $_GET["Hora"];
$Dia = $_GET["Fecha"];
$NomDoc = $_GET["NomDoc"];
$ApellidoDoc = $_GET["ApellidoDoc"];
$NewHora = '11:00';
$NewDia = '2021-01-19';
$NewNomDoc = 'Benjamin';
$NewApellidoDoc = 'Dubey';
*/

$Hora = $j->Hora;
$Dia = $j->Fecha;
$NomDoc = $j->NomDoc;
$ApellidoDoc = $j->ApellidoDoc;
$NewHora = $j->NewHora;
$NewDia = $j->NewDia;
$NewNomDoc = $j->NewNomDoc;
$NewApellidoDoc = $j->NewApellidosDoc;

$bd = include_once "bd.php";

$sentencia = $bd->query("select idDoctor from doctor where NomDoc='$NewNomDoc' AND ApellidoDoc='$NewApellidoDoc'");
$idDoctor = $sentencia->fetchAll(PDO::FETCH_OBJ);
$idDoctor = array_values( array_unique( $idDoctor, SORT_REGULAR ) );
//echo json_encode($idDoctor);
var_dump($idDoctor);
$NewidDoctor=$idDoctor[0]->idDoctor;
echo $NewidDoctor;

echo "Empiezo el update";
$sentencia = $bd->prepare("UPDATE citas
JOIN doctor ON doctor.idDoctor = citas.Doctor_idDoctor
SET citas.Hora = ?, citas.Dia = ?, citas.Doctor_idDoctor = ?
WHERE citas.Hora = ? AND citas.Dia = ? AND doctor.NomDoc = ? AND doctor.ApellidoDoc =  ?");
$resultado = $sentencia->execute([$NewHora,$NewDia,$NewidDoctor,$Hora,$Dia,$NomDoc,$ApellidoDoc]);
