<?php
	header("Access-Control-Allow-Origin: http://localhost:4200");
	header("Access-Control-Allow-Headers: *");
	/*
	$jsonMascota = json_decode(file_get_contents("php://input"));
	$j=$jsonMascota;
	if (!$jsonMascota) {
		exit("No hay datos");
	}else{
		echo "Estos valores son del jsonpaciente";
		echo json_encode($jsonMascota);
	}
	var_dump($j);
	echo $j[0]->Correo;
	$corDest = $j[0]->Correo;
	*/
	$corDest =$_GET["correo"];
    $nombDest = "Paciente";
    $genero="El sabe";
    $hoy = date("Y-m-d H:i:s");  
    $asunto="Has recibido tu receta de CEDAE";
    //$mensaje=htmlspecialchars("Que tenga un excelente dia :D");
    $nombre_remitente="CEDAE";
    $correo="brandonmerida11@gmail.com";

/**
 * This example shows settings to use when sending via Google's Gmail servers.
 * This uses traditional id & password authentication - look at the gmail_xoauth.phps
 * example to see how to use XOAUTH2.
 * The IMAP section shows how to save this message to the 'Sent Mail' folder using IMAP commands.
 */

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Creacion de variables
$correo_destinario=$corDest;
$nombre_destinatario="Paciente";
//$asunto="Has recibido una postal <3 de ".$nombre_remitente.", para :".$nombDest;
//$ubicacion=str_replace('"','',$ubicacion); //quitando las comillas
$ubicacion="C:\Users\inu_y\Downloads\Receta.pdf";
$cuerpo_del_mensaje="Que tenga un excelente dia";
$postal_img=$ubicacion;

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// SMTP::DEBUG_OFF = off (for production use)
// SMTP::DEBUG_CLIENT = client messages
// SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;
//Set the encryption mechanism to use - STARTTLS or SMTPS
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = 'postales.qualite@gmail.com'; //no modificar
//Password to use for SMTP authentication
$mail->Password = 'pcualite13'; //no modificar
//Set who the message is to be sent from
$mail->setFrom('postales.qualite@gmail.com', 'Postales Qualite');  //no modificar
//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress($correo_destinario, $nombre_destinatario );
//Set the subject line
$mail->Subject = $asunto;
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->Body    = $cuerpo_del_mensaje;
//$mail->msgHTML($cuerpo_del_mensaje, __DIR__);
//Replace the plain text body with one created manually
$mail->AltBody = 'esto provoca que haga caso a los <b> pero no lo envia';
//Attach an image file
$mail->addAttachment($postal_img);
//send the message, check for errors
if (!$mail->send()) {
    //echo 'Mailer Error: '. $mail->ErrorInfo;
} else {
    echo 'Message sent!';
    //echo  $mensaje;
    
    //Section 2: IMAP
    //Uncomment these to save your message in the 'Sent Mail' folder.
    #if (save_mail($mail)) {
    #    echo "Message saved!";
    #}
}
//Section 2: IMAP
//IMAP commands requires the PHP IMAP Extension, found at: https://php.net/manual/en/imap.setup.php
//Function to call which uses the PHP imap_*() functions to save messages: https://php.net/manual/en/book.imap.php
//You can use imap_getmailboxes($imapStream, '/imap/ssl', '*' ) to get a list of available folders or labels, this can
//be useful if you are trying to get this working on a non-Gmail IMAP server.
function save_mail($mail)
{
    //You can change 'Sent Mail' to any other folder or tag
    $path = '{imap.gmail.com:993/imap/ssl}[Gmail]/Sent Mail';
    //Tell your server to open an IMAP connection using the same username and password as you used for SMTP
    $imapStream = imap_open($path, $mail->Username, $mail->Password);
    $result = imap_append($imapStream, $path, $mail->getSentMIMEMessage());
    imap_close($imapStream);
    return $result;
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Postal</title>
    <link href="./../fontawesome/css/all.min.css" rel="stylesheet">
    <link href="./../materializeV1/css/materialize.min.css" rel="stylesheet">
    <link href="./../js/validetta/dist/validetta.min.css" rel="stylesheet">
    <link href="./../js/confirm/dist/jquery-confirm.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="./../jquery/jquery-3.4.1.min.js"></script>
    <script  src="./../materializeV1/js/materialize.min.js"></script>
    <script src="./../js/validetta/dist/validetta.min.js"></script>
    <script src="./../js/validetta/localization/validettaLang-es-ES.js"></script>
    <script src="./../js/confirm/dist/jquery-confirm.min.js"></script>

    <script>
        $(document).ready(function(){
            $('.materialboxed').materialbox();
            $('.modal').modal();
            $(".dropdown-trigger").dropdown();
            $('select').formSelect();
            $('.slider').slider();
        });
    </script>
   
    
 

<body>
    <div class="row">
    <a href="./../pages/postal.php?id=<?php echo $idpostal;?>" >Regresar</a>
    </div>
</body>
</html>
