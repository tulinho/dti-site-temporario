<?php
  if(isset($_POST['email'])) { 
    $email_to = "contato@dtidigital.com.br"; 
    
    function died($error) {        
      header($error, true, 400);
      die();
    }
    
    if(!isset($_POST['email'])) { 
        died('Sinto muito, mas parece que houve uma falha no envio dos dados.');
    }
    
    $email_from = utf8_decode($_POST['email']); 
    $email_subject = utf8_decode("dti digital : Email enviado via site temporário");
    $message = utf8_decode("Olá, eu gostaria de ser notificado sobre as novidades da dti.");
    

    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();

    mail($email_to, $email_subject, $message, $headers); 
    echo http_response_code(200); 
  }
  else{
    echo http_response_code(401);  
  }  

?>