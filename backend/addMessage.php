<?php
    include("headers.php");
    include("connection.php");
    // require_once("jwtFunc.php");

    // //Check JWT token
    // if(!jwtAuth()){
    //     return;
    // }

    $sender_id = $_POST["sender_id"];
    $reciever_id= $_POST["reciever_id"];
    $message= $_POST["message"];

    //Check if ID's are not empty
    if(!isset($sender_id) || empty($sender_id)
     || !isset($reciever_id) || empty($reciever_id)
     || !isset($message) || empty($message)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'IDs and message are required']);
        
        return;   
    }   

    //Insert new message to database
    $query = $mysqli->prepare("INSERT INTO messages (`sender_id`, `reciever_id`, `message`) VALUES (?, ?, ?)");
    $query->bind_param("iis", $sender_id, $reciever_id, $message);
    var_dump($query->execute());

    $msg= mysqli_insert_id($mysqli);
    //If last query id is not equal to message id,send an error
    if ($msg=== null) {
        http_response_code(400);
        echo json_encode(['error' => 400,'message' => "Error: Message not sent"]);
        
        return;
    }

    echo json_encode(['message' => "success!"]);

?>