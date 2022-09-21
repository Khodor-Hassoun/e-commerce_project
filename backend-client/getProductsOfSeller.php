<?php

    // DataBase connection
    include ("connection.php");
    // require_once("headers.php");

    $seller_id = $_POST["seller_id"];   

    //Validate seller id
    if(!isset($seller_id) || empty($seller)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid seller id'
        ]);
        
        return;   
    }

?>