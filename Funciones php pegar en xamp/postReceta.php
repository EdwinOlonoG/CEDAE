<?php
/*
//para php puro sin angular
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$idPaciente = $_GET["idPaciente"];
$idDoctor = $_GET["idDoctor"];
$Medicamento = $_GET["Medicamento"];
$Dosis = $_GET["Dosis"];
$Indicaciones = $_GET["Indicaciones"];
echo "Datos recibidos $idPaciente  $idDoctor  $Medicamento  $Dosis  $Indicaciones";
$bd = include_once "bd.php";
$sentencia = $bd->prepare("insert into receta(idPaciente, idDoctor, Medicamento, Dosis, Indicaciones) values (?,?,?,?,?)");
$resultado = $sentencia->execute([$idPaciente, $idDoctor, $Medicamento, $Dosis, $Indicaciones]);
echo json_encode([
    "resultado" => $resultado,
]);
*/


//para php con angular
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
unlink("C:\Users\inu_y\Downloads\Receta.pdf");
$jsonMascota = json_decode(file_get_contents("php://input"));
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j[0]->Medicamento;
echo "Cuantos objetos tengo";
echo count($j);
$idPaciente = $_GET["idPaciente"];
$idDoctor = $_GET["idDoctor"];
$bd = include_once "bd.php";
for ($i = 0; $i < count($j); $i++) {
    echo "cuantos";$sentencia = $bd->prepare("insert into receta(idPaciente, idDoctor, Medicamento, Dosis, Indicaciones) values (?,?,?,?,?)");
	$resultado = $sentencia->execute([$idPaciente, $idDoctor, $j[$i]->Medicamento, $j[$i]->Dosis, $j[$i]->Indicaciones]);
	echo json_encode([
		"resultado" => $resultado,
	]);
}