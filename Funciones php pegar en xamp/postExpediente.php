<?php
//para php con angular
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$Paciente_Usuarios_IdUsuarios = 3;
$jsonMascota = json_decode(file_get_contents("php://input"));
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->FechaNa;
$idPaciente = $_GET["idPaciente"];
$idExpediente = $_GET["idExpediente"];
$bd = include_once "bd.php";
$FichaId="10";
$sentencia = $bd->prepare("insert into expedientes(idExpedientes, Paciente_idPaciente, Paciente_Usuarios_IdUsuarios, NSS, FechaNa, Domicilio, Nacionalidad, FichaId, AntecedentesF, AntecedentesP, Exploracion, Pulso, Temperatura, EstadoF, ResultadosLab, Pronostico, SignosVit, Resultados, Diagnostico, PronosticoEv) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$resultado = $sentencia->execute([$idExpediente, $idPaciente, $Paciente_Usuarios_IdUsuarios, $j->NSS, $j->FechaNa, $j->Domicilio, $j->Nacionalidad, $FichaId, $j->AntecedentesF, $j->AntecedentesP, $j->Exploracion, $j->Pulso, $j->Temperatura,$j->EstadoF, $j->ResultadosLab,$j->Pronostico, $j->SignosVit, $j->Resultados, $j->Diagnostico, $j->PronosticoEv]);
echo json_encode([
	"resultado" => $resultado,
]);
//idExpediente, Paciente_idPaciente, Paciende_Usuarios_IdUsuarios, NSS, FechaNa, Domicilio, Nacionalidad, FichaId, AntecedentesF, AntecedentesP, Exploracion, Pulso, Temperatura, EstadoF, ResultadosLab, SignosVit, Resultados, Diagnostico, PronosticoEv
//$idExpediente, $idPaciente, $Paciende_Usuarios_IdUsuarios, $j->NSS, $j->FechaNa, $j->Domicilio, $j->Nacionalidad, $FichaId, $j->AntecedentesF, $j->AntecedentesP, $j->Exploracion, $j->Pulso, $j->Temperatura,$j->EstadoF, $j->ResultadosLab, $j->SignosVit, $j->Resultados, $j->Diagnostico, $j->PronosticoEv