<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
session_start();

if (isset($_SESSION['NomDoc'])){
	$user = $_SESSION['NomDoc'];
	echo "hola $user !";
}else{
	echo "no existo";
}