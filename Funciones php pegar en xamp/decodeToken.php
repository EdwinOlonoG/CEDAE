<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
$time = time();
$key = 'token';
$JWT= $_GET["id"];
$data = JWT::decode($JWT, $key, array('HS256'));
//echo $data->data->id;
//echo $data->data->TipoUsuario;
//echo $data->data->Existe;
//var_dump($data);

$mijson=array('Existe'=> $data->data->Existe,
'id'=>$data->data->id,
'TipoUsuario'=> $data->data->TipoUsuario
);
//echo "hola";
echo json_encode($mijson);

unlink('se.json');
$file = fopen("se.json", "a+");
fwrite($file, json_encode($mijson));
fclose($file);

return json_encode($mijson);
