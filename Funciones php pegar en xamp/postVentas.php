<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

echo "Entre a postVentas, ";

$jsonMascota = json_decode(file_get_contents("php://input"));
//echo $jsonMascota;
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonpaciente";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j[0]->idProductos;
echo "Cuantos objetos tengo";
echo count($j);

//$mysqltime = date ('Y-m-d');
date_default_timezone_set('America/Mexico_City');
$Fecha = date ('Y-m-d H:i:s');
echo $Fecha;
$idSucursal = $_GET["idSucursal"];
/*
$idProductos = $_GET["idProductos"];//recibimos el medicamento
$CantidadProducto = $_GET["CantidadProducto"];
$TotalVenta= $CantidadProducto * $_GET["PrecioProd"];
*/
$bd = include_once "bd.php";
for ($i = 0; $i < count($j); $i++){
	$idProductos = $j[$i]->idProductos;//recibimos el medicamento
	$CantidadProducto = $j[$i]->CantidadProd;
	$PrecioProd = $j[$i]->PrecioProd;
	$TotalVenta= $CantidadProducto * $PrecioProd;
	//$bd = include_once "bd.php";
	$sentencia = $bd->prepare("insert into ventas(idProductos, CantidadProducto, TotalVenta, Fecha, idSucursal) values (?,?,?,?,?)");
	$resultado = $sentencia->execute([$idProductos ,$CantidadProducto, $TotalVenta, $Fecha, $idSucursal]);
	echo json_encode([
		"resultado" => $resultado,
	]);
}