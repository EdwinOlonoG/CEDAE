<?php
//idCitas, Hora, Dia, Lugar, Doctor_idDoctor, clinica, Paciente_idPaciente
//?Hora=17:00&Fecha=2021-01-19&NomDoc=Elizande&ApellidoDoc=Gomez
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
echo "Eliminar cita: ";
$metodo = $_SERVER["REQUEST_METHOD"];
$id= $_GET["id"];
echo $id;
$bd = include_once "bd.php";

$sentencia = $bd->prepare("DELETE FROM citas WHERE idCitas = ?");
$resultado = $sentencia->execute([$id]);
echo json_encode($resultado);


//7	17:00	2021-01-19	Loma Bonita	2	1	2	0
