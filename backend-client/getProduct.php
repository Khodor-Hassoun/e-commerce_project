<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    $product_id = $_POST["product_id"];

    //Validate product id
    if(!isset($product_id) || empty($product_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid product id']);
        return;
    }

    //Prepare and execute SQL query to retrieve product's record
    $query = $mysqli->prepare(
        "SELECT * FROM products P
        WHERE P.ID = (?)");

    $query->bind_param("i", $product_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

?>