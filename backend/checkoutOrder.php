<?php
    include("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }
    
    $client_id = $_POST["client_id"];

    //Validate client id
    if(!isset($client_id) || empty($client)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid client id'
        ]);
        
        return;   
    }
