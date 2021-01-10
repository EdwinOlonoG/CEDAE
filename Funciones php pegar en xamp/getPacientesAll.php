<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
$sentencia = $bd->query("select idPaciente, nomPac, TelPac, EdadPac, CorreoPac, SexoPac from paciente");
$pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);
//src\api\products
unlink('paciente.json');
$file = fopen("paciente.json", "a+");
fwrite($file, json_encode($pacientes));
fclose($file);

echo json_encode($pacientes);