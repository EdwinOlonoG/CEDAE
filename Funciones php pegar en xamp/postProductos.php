<?php
//idProductos, NomProd, CadProd, PrecioProd, ExistenciaProd, Farmacia_idFarmacia, Farmacia_Sucursal_idSucursal
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
echo "Entre a postProductos, ";
$Farmacia_idFarmacia = $_GET["Farmacia_idFarmacia"];

//Esto para cuando lo anexe al app
$jsonMascota = json_decode(file_get_contents("php://input"));
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}else{
	echo "Estos valores son del jsonProducto";
	echo json_encode($jsonMascota);
}
var_dump($j);
echo $j->NomProd;

$CadProd = $j->CadProd;
$NomProd = $j->NomProd;
$PrecioProd = $j->PrecioProd;
$ExistenciaProd= $j->ExistenciaProd;

$bd = include_once "bd.php";

$resultado= $bd->query("SELECT * FROM productos WHERE productos.NomProd = '$NomProd'");
$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
if(count((array)$pacientes)){
	echo "Ya existe el medicamento, cantidad: ";
	echo count((array)$pacientes);
	echo ", el id es este: ";
	echo $pacientes[0]->idProductos;
	$IdProd = $pacientes[0]->idProductos;  //aqui ya obtuve el id puedo guardarlo bien
}else{
	echo "No existe el medicamento";
	$resultado= $bd->query("SELECT MAX(idProductos) AS id FROM productos");
	$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
	$IdProd = $pacientes[0]->id+1;  //aqui ya obtuve el id puedo guardarlo bien
	echo ", el id es este: ";
	echo $IdProd;
	
}

//Sentencia para guardar bien
$sentencia = $bd->prepare("insert into productos(idProductos, NomProd, CadProd, PrecioProd, ExistenciaProd, Farmacia_idFarmacia, Farmacia_Sucursal_idSucursal) values (?,?,?,?,?,?,?)");
$resultado = $sentencia->execute([$IdProd,$NomProd,$CadProd,$PrecioProd,$ExistenciaProd,$Farmacia_idFarmacia,$Farmacia_idFarmacia]);
echo json_encode([
	"resultado" => $resultado,
]);
