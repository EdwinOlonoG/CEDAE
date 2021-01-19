<?php
//idProductos, NomProd, CadProd, ExistenciaProd    Sacar los que esten por caducar
header("Access-Control-Allow-Origin: http://localhost:4200");
$jsonMascota = json_decode(file_get_contents("php://input"));
echo "Estamos en php de caducidad : ";

date_default_timezone_set('America/Mexico_City');
$Fecha = date ('Y-m-d');
echo $Fecha;
$Fecha3Meses = date("Y-m-d",strtotime($Fecha."+ 3 month"));

$bd = include_once "bd.php";

$sentencia = $bd->query("select idProductos, NomProd, CadProd, ExistenciaProd
from productos 
where CadProd BETWEEN '$Fecha' AND '$Fecha3Meses '");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

//guardar Json
unlink('caducar.json');
$file = fopen("caducar.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);