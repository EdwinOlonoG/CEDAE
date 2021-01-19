<?php
//idProductos, CantidadProducto, TotalVenta, Fecha, idSucursal
header("Access-Control-Allow-Origin: http://localhost:4200");

echo "Estamos en php de obtencion de ventas : ";
//$Fecha =json_decode($_GET["Fecha"]);//recibimos la fecha
$Fecha = $_GET["Fecha"];
$re=substr($Fecha,10,10);
echo $re;
$Fecha = $re;
/*
$jsonMascota = json_decode(file_get_contents("php://input"));
echo file_get_contents("php://input");
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonProducto";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->fecha;
*/

$bd = include_once "bd.php";

$sentencia = $bd->query("select ventas.idProductos, productos.NomProd, CantidadProducto, TotalVenta, Fecha, idSucursal from ventas, productos where DATE(ventas.Fecha)='$Fecha' AND ventas.idProductos=productos.idProductos");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

//guardar Json
unlink('ventas.json');
$file = fopen("ventas.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);