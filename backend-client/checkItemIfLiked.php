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

    //send a message that item is already liked 
    if ($num_rows>0) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Item already liked!']);
        return;
    }
    //send a message that item is not liked
    else{
        echo json_encode(['message' => 'Item Not liked!']);
    }

?>