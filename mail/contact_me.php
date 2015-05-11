<?php

require 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['contactName']) && isset($_POST['contactEmail']) && isset($_POST['contactPhone']) && isset($_POST['contactMessage']))
{
    //check if any of the inputs are empty
    if (empty($_POST['contactName']) || empty($_POST['contactEmail']) || empty($_POST['contactPhone']) || empty($_POST['contactMessage']))
    {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    $mail = new PHPMailer;

    $mail->isSMTP();                                                                                    // Set mailer to use SMTP
    // Enter your SMTP client ex.: $mail->Host = 'smtp.mailgun.org';
    $mail->Host = 'smtp.mailgun.org';                                                                   // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                                                                             // Enable SMTP authentication
    // Enter the SMTP username
    $mail->Username = '';                                                                               // SMTP username
    // Enter the SMTP password
    $mail->Password = '';                                                                               // SMTP password
    $mail->SMTPSecure = 'tls';                                                                          // Enable TLS encryption, `ssl` also accepted
    // $mail->Port = 587;                                                                               // TCP port to connect to

    $mail->From = $_POST['contactEmail'];
    $mail->FromName = $_POST['contactName'];
    // Change your e-mail address below where you have received the contact form message
    $mail->addAddress('email@email.com');                                                               //recipient

    $mail->WordWrap = 50;
    $mail->isHTML(true);


    $mail->Subject = 'Contact Form from Clean Blog';
    $mail->Body = "Name: " . $_POST['contactName'] . "<br /> E-mail Address: ".$_POST['contactEmail']." <br/ > Phone Number: ".$_POST['contactPhone']." <br /> Message: " . stripslashes($_POST['contactMessage']);

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    } else {
        $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
        echo json_encode($data);
    }
}
?>
