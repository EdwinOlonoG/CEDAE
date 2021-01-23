<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

echo "Entre a postCitasMultiple, ";

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

echo $NomPac;
echo $Hora;
echo $Dia;
echo $NomDoc;
echo $ApellidoDoc;
//JWT
$time = time();
$key = 'token';
$JWT= $_GET["id"];
echo $JWT;
$data = JWT::decode($JWT, $key, array('HS256'));
//var_dump($data);

$mijson=array('Existe'=> $data->data->Existe,
'id'=>$data->data->id,
'TipoUsuario'=> $data->data->TipoUsuario
);
echo json_encode($mijson);



$bd = include_once "bd.php";
//if($data->data->Existe == "Recepcionista")


if($data->data->Existe == 0)  //si no existe usuario, es decir externo
{
	$resultado= $bd->query("SELECT MAX(idUsuarios) AS id FROM usuarios");
	$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
	$idUsuarios = $pacientes[0]->id+1;  //aqui ya obtuve el id puedo guardarlo bien
	$resultado= $bd->query("SELECT MAX(idPaciente) AS id FROM paciente");
	$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
	$idPaciente = $pacientes[0]->id+1;  //aqui ya obtuve el id puedo guardarlo bien
	$sentencia = $bd->prepare("insert into usuarios(idUsuarios, Usuario, Contrasena, TUsuario) values (?,?,?,?)");   //creacion de usuario
	$resultado = $sentencia->execute([$idUsuarios ,"Paciente Externo","1234",5]);
	echo json_encode([
		"resultado" => $resultado,
	]);
	
	$sentencia = $bd->prepare("insert into paciente(idPaciente, NomPac, TelPac, EdadPac, CorreoPac, SexoPac, Usuarios_idUsuarios) values (?,?,?,?,?,?,?)");  //creacion paciente
	$resultado = $sentencia->execute([$idPaciente,$NomPac,$TelPac,$EdadPac,$CorreoPac,$SexoPac,$idUsuarios]);
	echo json_encode([
		"resultado" => $resultado,
	]);
	//creacion de cita
	$sentencia = $bd->prepare("insert into citas(Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente, Pago) values (?,?,?,?,?,?,?)");
	$resultado = $sentencia->execute([$Hora ,$Dia,"Loma Bonita", 9, $idSucursal, $idPaciente, 0]);
	echo json_encode([
		"resultado" => $resultado,
	]);
	return 0;
}

if($data->data->TipoUsuario == "Paciente")  // si soy un paciente tomar los datos del id
{
	//creacion de cita
	$sentencia = $bd->prepare("insert into citas(Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente, Pago) values (?,?,?,?,?,?,?)");
	$resultado = $sentencia->execute([ $Hora , $Dia, "Loma Bonita", 10, $idSucursal, $data->data->id, 0]);
	echo json_encode([
		"resultado" => $resultado,
	]);
	return 0;
}

if($data->data->TipoUsuario == "Recepcionista")   // si estoy desde recepcionista
{
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
	return 0;
}
