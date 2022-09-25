<?php
    include("headers.php");
    include("connection.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $product_id = $_GET["product_id"];
    $user_id = $_GET["user_id"];

    //Check if ID's are not empty
    if(!isset($product_id) || empty($product_id) || !isset($user_id) || empty($user_id)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'Product ID and User ID cannot be empty']);
        
        return;   
    }   

    //Insert wishlist item record to database
    $query = $mysqli->prepare("INSERT INTO carts (product_id, user_id) VALUE (?, ?) "); 
    $query->bind_param("ii", $product_id, $user_id);
    $query->execute();

    $product= mysqli_insert_id($mysqli);
    //If last query id is not equal to product id,send an error
    if ($product=== null) {
        http_response_code(400);
        echo json_encode(['error' => 400,'message' => "Error: wishlist item not sent"]);
        
        return;
    }

    echo json_encode(['message' => "success!"]);
?>