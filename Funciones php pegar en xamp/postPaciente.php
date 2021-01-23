<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

echo "Entre a postPaciente, ";


$jsonMascota = json_decode(file_get_contents("php://input"));
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->Contrasena;

$Usuario = "Paciente";
$Contrasena = $j->Contrasena;
$NomPac = $j->NomPac;
$TelPac = $j->TelPac;
$EdadPac = $j->EdadPac;
$CorreoPac = $j->Correo;
$SexoPac = $j->SexoPac;


$bd = include_once "bd.php";
$resultado= $bd->query("SELECT MAX(idUsuarios) AS id FROM usuarios");
$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
$idUsuarios = $pacientes[0]->id+1;  //aqui ya obtuve el id puedo guardarlo bien
//echo $idUsuarios;
$resultado= $bd->query("SELECT MAX(idPaciente) AS id FROM paciente");
$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
$idPaciente = $pacientes[0]->id+1;  //aqui ya obtuve el id puedo guardarlo bien
//echo $idPaciente;

$sentencia = $bd->prepare("insert into usuarios(idUsuarios, Usuario, Contrasena, TUsuario) values (?,?,?,?)");
$resultado = $sentencia->execute([$idUsuarios ,"Paciente",$Contrasena,3]);
echo json_encode([
	"resultado" => $resultado,
]);

$sentencia = $bd->prepare("insert into paciente(idPaciente, NomPac, TelPac, EdadPac, CorreoPac, SexoPac, Usuarios_idUsuarios) values (?,?,?,?,?,?,?)");
$resultado = $sentencia->execute([$idPaciente,$NomPac,$TelPac,$EdadPac,$CorreoPac,$SexoPac,$idUsuarios]);
echo json_encode([
	"resultado" => $resultado,
]);
