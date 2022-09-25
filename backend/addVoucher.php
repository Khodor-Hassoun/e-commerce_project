<?php
    include("headers.php");
    include("connection.php");
    // require_once("jwtFunc.php");

    // //Check JWT token
    // if(!jwtAuth()){
    //     return;
    // }

    $sender_id= $_GET["sender_id"];
    $reciever_id = $_GET["reciever_id"];

    //Check if ID's are not empty
    if(!isset($sender_id) || empty($reciever_id) || !isset($sender_id) || empty($reciever_id)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'Sender and Reciever IDs cannot be empty']);
        
        return;   
    }   

    //Insert wvoucher  record to database
    $query = $mysqli->prepare("INSERT INTO vouchers (sender_id, reciever_id) VALUE (?, ?) "); 
    $query->bind_param("ii", $sender_id, $reciever_id);
    $query->execute();

    $voucher= mysqli_insert_id($mysqli);
    //If last query id is not equal to voucher id,send an error
    if ($voucher=== null) {
        http_response_code(400);
        echo json_encode(['error' => 400,'message' => "Error: voucher not sent"]);
        
        return;
    }

    echo json_encode(['message' => "success!"]);
?>