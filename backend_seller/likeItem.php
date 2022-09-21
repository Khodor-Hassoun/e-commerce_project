<?php
    include("headers/headers.php");
    include("connection/connection.php");

    $product_id = $_GET["product_id"];
    $user_id = $_GET["user_id"];

    //Check if ID's are not empty
    if(!isset($product_id) || empty($product_id) || !isset($user_id) || empty($user_id)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Product ID and User IDcannot be empty'
        ]);
        
        return;   
    }   

    

?>