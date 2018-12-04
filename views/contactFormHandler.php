<?php

  if (isset($_POST['submit'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "ramankooner9@gmail.com";
    $subject = 'Contact Form Submission';
    $headers = "From: ".$email;
    $message = "Email receieved from ".$firstname." ".$lastname.".\n\n".$message;

    if(mail($to, $subject, $message, $headers)) {
      $success = "Message sent, thank you for contacting us!";
      $firstname = $lastname = $email = $message = '';
    } else {
      echo "Something went wrong!";
    }
    //header("Location: contactFormHandler.php?mailsend");
  }
 ?>
