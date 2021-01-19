<?php
//idProductos, NomProd, CadProd, PrecioProd, ExistenciaProd, Farmacia_idFarmacia, Farmacia_Sucursal_idSucursal
header("Access-Control-Allow-Origin: http://localhost:4200");
$jsonMascota = json_decode(file_get_contents("php://input"));
echo "Estamos en php de obtencion de productos : ";
$id = (int)$_GET["Farmacia_idFarmacia"];    //cambiar al ?Farmacia_idFarmacia=1
echo $id;
//Farmacia productos
$bd = include_once "bd.php";

$sentencia = $bd->query("select idProductos, NomProd, PrecioProd, Sum(ExistenciaProd) as ExistenciaProd, CadProd
from productos 
where productos.Farmacia_idFarmacia=$id group by idProductos");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);

//guardar Json
unlink('productos.json');
$file = fopen("productos.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);
echo json_encode($pacientes);