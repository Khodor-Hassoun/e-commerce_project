<?php
    include("headers.php");
    include("connection.php");
    // require_once("jwtFunc.php");
    // //Check JWT token
    // if(!jwtAuth()){
    //     return;
    // }
    $seller_id= $_POST["seller_id"];
    $user_id= $_POST["user_id"];
    
    $query = $mysqli->prepare("SELECT * FROM messages WHERE (sender_id =? and reciever_id=?) or (sender_id =? and reciever_id=?)");
    $query->bind_param("iiii", $seller_id,$user_id,$user_id,$seller_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
?>