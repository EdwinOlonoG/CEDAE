<?php
//medicamento, dosis e indicaciones
header("Access-Control-Allow-Origin: http://localhost:4200");
$jsonMascota = json_decode(file_get_contents("php://input"));
echo "hola mundo : ";
$id = (int)$_GET["id"];
echo $id;
/*
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->id;
*/
//expedientes
$bd = include_once "bd.php";
//$sentencia = $bd->prepare("select Medicamento, Dosis, Indicaciones from receta where receta.idPaciente=?");
//$sentencia->execute([$id]);
//$pacientes = $sentencia->fetchAll(PDO::FETCH_ASSOC);

$sentencia = $bd->query("select Medicamento, Dosis, Indicaciones from receta where receta.idPaciente=$id");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

//guardar Json
unlink('pacientesReceta.json');
$file = fopen("pacientesReceta.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);