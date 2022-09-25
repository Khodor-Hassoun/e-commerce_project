<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $product_id = $_GET["product_id"];
    $user_id = $_GET["user_id"];

    //Validate product id
    if(!isset($product_id) || empty($product_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid product id']);
        return;
    }
    // Validate user id
    if(!isset($user_id) || empty($user_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid user id']);
        return;
    }

    //Check if user viewed a product.
    // See if an id exist with the user and product
    $query = $mysqli->prepare("SELECT id FROM views WHERE user_id=? AND product_id=?");
    $query->bind_param("ii", $user_id ,$product_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

    //If response is NOT empty, send back an error message
    if (!(empty($response))) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'User already viewed the product'
        ]);

        return;
    }

    // Insert into table
    $query = $mysqli->prepare("INSERT INTO `views`( `user_id`, `product_id`) VALUES (? , ?)");
    $query->bind_param('ii', $user_id, $product_id);
    $query->execute();

    $response = json_encode(['product view' =>'Inserted']);
    echo $response;

    $query->close();
    $mysqli->close();

?>