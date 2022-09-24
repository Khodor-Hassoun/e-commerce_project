<?php

    // DataBase connection
    include ("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $seller_id = $_POST["seller_id"];   

    //Validate seller id
    if(!isset($seller_id) || empty($seller_id)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid seller id'
        ]);
        
        return;   
    }

    //Prepare and execute SQL query to retrieve all products of a certain seller
    $query = $mysqli->prepare(
        "SELECT * FROM products P
        WHERE P.user_id = (?)"
        );

    $query->bind_param("i", $seller_id);
    $query->execute();

    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }
    //If response is empty, send back an error message
    if (empty($response)) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'unable to retrieve products'
        ]);

        return;
    }

    $json = json_encode($response);
    echo $json;


?>
