<?php
//del 4 para abajo de los datos
header("Access-Control-Allow-Origin: http://localhost:4200");
$jsonMascota = json_decode(file_get_contents("php://input"));
echo "hola mundo desde rexpediente : ";
$id = (int)$_GET["id"];
echo $id;
//expedientes
$bd = include_once "bd.php";
$sentencia = $bd->prepare("select idExpedientes, Paciente_idPaciente, Paciente_Usuarios_IdUsuarios, NSS, FechaNa, Domicilio, Nacionalidad, FichaId, AntecedentesF, AntecedentesP, Exploracion, Pulso, Temperatura, EstadoF, ResultadosLab, Pronostico, SignosVit, Resultados, Diagnostico, PronosticoEv
from expedientes 
where expedientes.Paciente_idPaciente=?");
$sentencia->execute([$id]);
$pacientes = $sentencia->fetchAll(PDO::FETCH_ASSOC);
//guardar Json
unlink('expedientePaciente.json');
$file = fopen("expedientePaciente.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);