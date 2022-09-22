<?php

    include('connection.php');
    require_once('headers.php');

    // Random character generator
    function getPassword($n) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
    
        for ($i = 0; $i < $n; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
    
        return $randomString;
    }
    
    // Variables
    $password = getPassword(10);
    $to_email = $_POST['email'];

    // Check if empty
    if(!isset($to_email) || empty($to_email)){
        echo json_encode(['Email' =>'Invalid']);
        return;
    }

    // $subject = "Reset Password";
    // $body = "Hi, your new password is ".$password;
    // $headers = "From: khodorhassoun26@gmail.com";
    // if (mail('khodorhassoun26@gmail.com', $subject, $body, $headers)) {
    //     echo "Email successfully sent to...";
    // } else {
    //     echo "Email sending failed!";
    // }

    $query = $mysqli->prepare('UPDATE users SET password=? WHERE email=?');
    $query->bind_param('ss',hash('sha256',$password),$to_email);
    $query->execute();
    $query->store_result();

    $num_rows = $query->num_rows();
    if($num_rows != 0){
        echo json_encode(['Password Reset'=>'Failed']);
        return;
    }
    echo json_encode(['Password Reset'=>'Success']);

    // Send email
    $subject = "Reset Password";
    $body = "Hi, your new password is ".$password;
    $headers = "From: khodorhassoun26@gmail.com";
    if (mail($to_email, $subject, $body, $headers)) {
        echo "Email successfully sent to...";
    } else {
        echo "Email sending failed!";
    }




?>