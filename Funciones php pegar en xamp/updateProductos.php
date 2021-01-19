<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
//idProductos, NomProd, CadProd, PrecioProd, ExistenciaProd, Farmacia_idFarmacia, Farmacia_Sucursal_idSucursal
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

echo "Update del producto: ";


$idSucursal = $_GET["idSucursal"];
$bd = include_once "bd.php";
for ($z = 0; $z < count($j); $z++){
	//todos los datos para un medicamento
	$idProductos = $j[$z]->idProductos;//recibimos el medicamento
	$CantidadProducto = $j[$z]->CantidadProd;
	$resultado= $bd->query("SELECT * FROM productos WHERE productos.idProductos = $idProductos");
	$pacientes = $resultado->fetchAll(PDO::FETCH_OBJ);
	echo count($pacientes);
	$TengoProducto=1;
	for ($i = 0; $i < count($pacientes); $i++){
		if($TengoProducto != 0)
		{
			echo "|Comparacion ";
			echo $CantidadProducto;
			echo ", existencia: ";
			echo $pacientes[$i]->ExistenciaProd;
			echo "|";
			if($CantidadProducto <= $pacientes[$i]->ExistenciaProd) //si la cantidad es menor al primer producto
			{
				$TengoProducto=0;
				echo "Puedo restar todo al primer producto, cantidad a restar actualizada : ";
				$CantidadProducto = $pacientes[$i]->ExistenciaProd-$CantidadProducto;
				echo $CantidadProducto;
				$sentencia = $bd->prepare("UPDATE productos SET ExistenciaProd = ? WHERE idProductos = ? AND CadProd = ? AND Farmacia_idFarmacia = ?");
				$resultado = $sentencia->execute([$CantidadProducto, $pacientes[$i]->idProductos, $pacientes[$i]->CadProd, $idSucursal]);
			}else{
				echo "Restare todo el stock de este producto : ";
				if($pacientes[$i]->ExistenciaProd==0)
				{
					echo "No tengo que restar al primer producto paso al siguiente ";
				}else{
					echo "Nueva cantidad de producto : ";
					$CantidadProducto = $CantidadProducto-$pacientes[$i]->ExistenciaProd;
					echo $CantidadProducto;
					$sentencia = $bd->prepare("UPDATE productos SET ExistenciaProd = ? WHERE idProductos = ? AND CadProd = ? AND Farmacia_idFarmacia = ?");
					$resultado = $sentencia->execute([0, $pacientes[$i]->idProductos, $pacientes[$i]->CadProd, $idSucursal]);
				}
			}
		}
	}
}