<?php

  if (isset($_POST['submit'])) {
    $firstName = $_POST['firstname'];
    $lastName = $_POST['lastname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "ramankooner9@gmail.com";
    $headers = "From: ".$email;
    $text = "Email receieved from ".$firstName." ".$lastName.".\n\n".$message;

    mail($mailTo, $subject, $text, $headers);
    header("Location: contactFormHandler.php?mailsend");
  }
 ?>
