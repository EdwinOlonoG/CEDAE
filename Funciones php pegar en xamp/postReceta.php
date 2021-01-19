<?php
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

date_default_timezone_set('America/Mexico_City');
$Fecha = date ('Y-m-d H:i:s');
echo $Fecha;


$idPaciente = $_GET["idPaciente"];
$idDoctor = $_GET["idDoctor"];
$bd = include_once "bd.php";
for ($i = 0; $i < count($j); $i++) {
	echo "cuantos";
	$sentencia = $bd->prepare("insert into receta(idPaciente, idDoctor, Medicamento, Dosis, Indicaciones, Fecha) values (?,?,?,?,?,?)");
	$resultado = $sentencia->execute([$idPaciente, $idDoctor, $j[$i]->Medicamento, $j[$i]->Dosis, $j[$i]->Indicaciones, $Fecha]);
	echo json_encode([
		"resultado" => $resultado,
	]);
}