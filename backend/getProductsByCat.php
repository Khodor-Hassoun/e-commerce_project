<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $seller_id = $_POST["seller_id"];
    $category_id = $_POST["category_id"];

    //Validate product id
    if(!isset($seller_id) || empty($seller_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid seller id']);
        return;
    }

    //Validate product id
    if(!isset($category_id) || empty($category_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid category id']);
        return;
    }

    //Prepare and execute SQL query to retrieve product's record
    $query = $mysqli->prepare("SELECT * FROM products WHERE user_id = ? and category_id = ?");
    $query->bind_param("ii", $seller_id, $category_id);
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