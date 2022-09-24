<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");
    // require_once("jwtFunc.php");

    //Check JWT token
    // if(!jwtAuth()){
    //     return;
    // }

    $product_id = $_GET["product_id"];

    //Validate product id
    if(!isset($product_id) || empty($product_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid product id']);
        return;
    }

    //Prepare and execute SQL query to retrieve product's record
    $query = $mysqli->prepare("SELECT product_id, COUNT(id) FROM favorite_items WHERE product_id = ?");

    $query->bind_param("i", $product_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

    //If response is empty, send back an error message
    if (empty($response)) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Product does not have any likes'
        ]);

        return;
    }

    echo json_encode($response);

    $query->close();
    $mysqli->close();

?>