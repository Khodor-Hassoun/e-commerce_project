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
        echo json_encode(['status' => 400,'message' => 'Product ID and User ID cannot be empty']);
        
        return;   
    }   

    //Check if these product is liked by the same user id
    $query = $mysqli->prepare("SELECT * FROM favourite_items WHERE product_id = ? and user_id = ?");
    $query->bind_param("ii", $product_id, $user_id);
    $query->execute();
    $res=$query->store_result();
    $num_rows = $query->num_rows;

    //if no,send a message that item is not in favourite items
    if ($num_rows==0) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Item not liked']);
        return;
    }

    //delete liked item record from database
    $query = $mysqli->prepare("DELETE FROM favourite_items WHERE product_id = ? and user_id = ? "); 
    $query->bind_param("ii", $product_id, $user_id);
    $query->execute();

    echo json_encode(['message' => "success!"]);

?>