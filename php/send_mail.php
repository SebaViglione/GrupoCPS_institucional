<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar automáticamente PHPMailer desde Composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = htmlspecialchars(trim($_POST["nombre"] ?? ''));
    $email = htmlspecialchars(trim($_POST["email"] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''));

    if ($nombre && $email && $mensaje) {
        $mail = new PHPMailer(true);

        try {
            // CONFIGURACIÓN SMTP
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $_ENV['SMTP_PORT'];

            // Evitar errores con certificados autofirmados
            $mail->SMTPOptions = [
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                ]
            ];

            // REMITENTE Y DESTINATARIO
            $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
            $mail->addAddress($_ENV['SMTP_TO_EMAIL']);
            $mail->addReplyTo($email, $nombre);

            // CONTENIDO DEL CORREO
            $mail->isHTML(true);
            $mail->Subject = 'Nuevo mensaje desde la web de Grupo CPS';
            $mail->Body = "
                <h3 style='font-family:Montserrat, sans-serif;'>Nuevo mensaje recibido</h3>
                <p><strong>Nombre:</strong> {$nombre}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Mensaje:</strong></p>
                <p style='white-space: pre-line;'>{$mensaje}</p>
                <hr>
                <p style='font-size:12px;color:#777'>
                    <i class='fa-solid fa-globe'></i> Este mensaje fue enviado automáticamente desde el formulario web de 
                    <a href='https://grupocps.com.uy' style='color:#ef8a1e;text-decoration:none;'>grupocps.com.uy</a>
                </p>
            ";

            $mail->send();
            echo "<p style='color:green; font-family:Montserrat, sans-serif;'>
                    <i class='fa-solid fa-circle-check'></i> Mensaje enviado correctamente.
                  </p>";
        } catch (Exception $e) {
            echo "<p style='color:red; font-family:Montserrat, sans-serif;'>
                    <i class='fa-solid fa-triangle-exclamation'></i> Error al enviar el mensaje.<br>
                    <small>Detalles: {$mail->ErrorInfo}</small>
                  </p>";
        }
    } else {
        echo "<p style='color:#c27803; font-family:Montserrat, sans-serif;'>
                <i class='fa-solid fa-circle-exclamation'></i> Todos los campos son obligatorios.
              </p>";
    }
} else {
    echo "<p style='color:#666; font-family:Montserrat, sans-serif;'>
            <i class='fa-solid fa-ban'></i> Método no permitido.
          </p>";
}
?>