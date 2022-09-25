<?php

    include("headers.php");
    include ("connection.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $code = $_POST["code"];
    $percentage = $_POST["percentage"];
    $is_active = 1;
    $seller_id = $_POST["seller_id"];
    $seller_type=2;

    //check if all fields are filled
    if(!isset($code) || empty($code) || !isset($seller_id) || empty($seller_id) || !isset($percentage) || empty($percentage)){ 
    echo json_encode(['status' => 400,'message' => 'All fields are required!']); 
    return;
    } 
    
    //check if seller id exists
    $query = $mysqli->prepare("SELECT * FROM users WHERE id= ? and user_type_id=?");
    $query->bind_param("ii", $seller_id,$seller_type);
    $query->execute();

    $query->store_result();
    $num_rows = $query->num_rows;
    //if not exists,send a message that seller not found
    if($num_rows == 0){
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Seller not found']);
        return;
    }

    //check if discount code exists
    $query = $mysqli->prepare("SELECT code FROM discounts WHERE code= ?");
    $query->bind_param("i", $code);
    $query->execute();

    $query->store_result();
    $num_rows = $query->num_rows;
    //if exists,send a message that code exists
    if($num_rows != 0){
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Code Exists']);
        return;
    }
    
    //if code not exists,insert new discount code 
    $query = $mysqli->prepare("INSERT INTO discounts (code, percentage, is_active, seller_id) VALUE (?, ?, ?, ?)");
    $query->bind_param("iiii", $code, $percentage, $is_active, $seller_id);
    $query->execute();
    $discount_id = mysqli_insert_id($mysqli);

    //If no new id was inserted, return an error
    if ($discount_id === null) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => "Error: Can't add discount"]);
        return;
    }

    echo json_encode(['message' => "success!"]);
?>
