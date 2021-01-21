<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
$time = time();
$key = 'token';

$bd = include_once "bd.php";
$hola= $_GET["hola"];

$jsonMascota = json_decode($hola);
$j=$jsonMascota;
if (!$jsonMascota) {
    exit("No hay datos");
}

	//Datos
	$username = $j->User;
	$password = $j->Pass;
	
	//echo "pruebo si es un paciente";
    $query = $bd->prepare("SELECT * FROM usuarios 
	INNER JOIN paciente ON usuarios.idUsuarios=paciente.Usuarios_idUsuarios
	WHERE CorreoPac='$username'");
    $query->bindParam("username", $username, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if (!$result){
		//pruebo si es el doctor
		$query = $bd->prepare("SELECT * FROM usuarios 
		INNER JOIN doctor ON usuarios.idUsuarios=doctor.Usuarios_idUsuarios
		WHERE CorreoDoc='$username'");
		$query->bindParam("username", $username, PDO::PARAM_STR);
		$query->execute();
		$result = $query->fetch(PDO::FETCH_ASSOC);
		if (!$result){
			//echo "pruebo si es una recepcionista";
			$query = $bd->prepare("SELECT * FROM usuarios 
			INNER JOIN recepcionista ON usuarios.idUsuarios=recepcionista.Usuarios_idUsuarios
			WHERE CorreoRecep='$username'");
			$query->bindParam("username", $username, PDO::PARAM_STR);
			$query->execute();
			$result = $query->fetch(PDO::FETCH_ASSOC);
			if (!$result){  //no existe de ninguna manera
				$Existe=0;
				$token = array(
					'iat' => $time, // Tiempo que inició el token
					'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
					'data' => [ // información del usuario
						'Existe' => $Existe
					]
				);
			}else{//comparacion recepcionista
				if ($password==$result['Contrasena']) {
					$Existe=1;
					$TipoUsuario="Recepcionista";
					$id=$result['idRecepcionista'];
					$token = array(//existe el paciente guardar
						'iat' => $time, // Tiempo que inició el token
						'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
						'data' => [ // información del usuario
							'id' => $id,
							'TipoUsuario'=> $TipoUsuario,
							'Existe' => $Existe
						]
					);
				} else {//contrasena mal recepcionista
					$Existe=0;
					$token = array(
						'iat' => $time, // Tiempo que inició el token
						'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
						'data' => [ // información del usuario
							'Existe' => $Existe
						]
					);
				}
			}
		}else{//comparacion doctor
			if ($password==$result['Contrasena']) {
				$Existe=1;
				$TipoUsuario="Doctor";
				$id=$result['idDoctor'];
				$token = array(//existe el paciente guardar
					'iat' => $time, // Tiempo que inició el token
					'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
					'data' => [ // información del usuario
						'id' => $id,
						'TipoUsuario'=> $TipoUsuario,
						'Existe' => $Existe
					]
				);
			} else {//contrasena de doctor esta mal
				$Existe=0;
				$token = array(
					'iat' => $time, // Tiempo que inició el token
					'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
					'data' => [ // información del usuario
						'Existe' => $Existe
					]
				);
			}
		}
    } else {//comprobacion de paciente
        if ($password==$result['Contrasena']) {
			$Existe=1;
			$TipoUsuario="Paciente";
			$id=$result['idPaciente'];
			$token = array(//existe el paciente guardar
				'iat' => $time, // Tiempo que inició el token
				'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
				'data' => [ // información del usuario
					'id' => $id,
					'TipoUsuario'=> $TipoUsuario,
					'Existe' => $Existe
				]
			);
        } else {//el paciente contrasena esta mal
			$Existe=0;
			$token = array(
				'iat' => $time, // Tiempo que inició el token
				'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
				'data' => [ // información del usuario
					'Existe' => $Existe
				]
			);
        }
    }
	
	//echo pruebo si hay farmacia
    $query = $bd->prepare("SELECT * FROM usuarios 
	INNER JOIN trabajador ON usuarios.idUsuarios=trabajador.Usuarios_idUsuarios
	WHERE CorreoFarmacia ='$username'");
    $query->bindParam("username", $username, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);
	if (!$result){  //no existe
	}else{   //comprobacion farmacia
		if ($password==$result['Contrasena']) {
			$Existe=1;
			$TipoUsuario="Farmacia";
			$id=$result['idFarmacia'];
			$token = array(
				'iat' => $time, // Tiempo que inició el token
				'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
				'data' => [ // información del usuario
					'id' => $id,
					'TipoUsuario'=> $TipoUsuario,
					'Existe' => $Existe
				]
			);
        } else {//el paciente contrasena esta mal
			$Existe=0;
			$token = array(
				'iat' => $time, // Tiempo que inició el token
				'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
				'data' => [ // información del usuario
					'Existe' => $Existe
				]
			);
        }
	}
	$jwt = JWT::encode($token, $key);
	//$data = JWT::decode($jwt, $key, array('HS256'));
	//var_dump($data);
	$eu = ['token' => $jwt];
	echo json_encode($eu);
	return json_encode($eu);
?>