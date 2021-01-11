<?php
session_start();
//Guardar datos de sesión
$_SESSION["idDoctor"] = "6";
$_SESSION["idPaciente"] = "6";
echo "Sesión iniciada y establecido nombre de usuario!" . "<br>";
