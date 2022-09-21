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

    //Prepare and execute SQL query to retrieve all products of a certain seller
    $query = $mysqli->prepare(
        "SELECT * FROM products P
        WHERE P.seller_id = (?)"
        );

    $query->bind_param("i", $seller_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

    //If response is empty, send back an error message
    if (empty($response)) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'unable to retrieve products'
        ]);

        return;
    }

    echo json_encode($response);

    $query->close();
    $mysqli->close();

?>