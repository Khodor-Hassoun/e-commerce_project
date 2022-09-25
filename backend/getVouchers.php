<?php
    require_once("headers.php");
    include("connection.php");

    $sender_id= $_GET["sender_id"];
    $reciever_id = $_GET["reciever_id"];
    if(!isset($sender_id) || empty($sender_id) || !isset($reciever_id) || empty($reciever_id)){ 
        echo json_encode(['status' => 400,'message' => 'IDs cannot be empty']); 
        return;
        } 
        

    $query = $mysqli->prepare("SELECT * FROM vouchers  WHERE sender_id=? and reciever_id=?");
    $query->bind_param("ii", $sender_id,$reciever_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
?>