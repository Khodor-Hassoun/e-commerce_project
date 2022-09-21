<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    $category_id = $_POST["category_id"];
    //Validate seller id
    if(!isset($category_id) || empty($category_id)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid category id'
        ]);
        
        return;   
    }

    //Prepare and execute SQL query to retrieve 6 random products from a certain category
    $query = $mysqli->prepare(
        "SELECT * FROM products P
        INNER JOIN categories C ON P.category_id = (?)
        ORDER BY rand()
        LIMIT 6");
    $query->bind_param("i", $category_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

    //If no response was given, send back an error message
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