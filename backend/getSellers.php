<?php
    require_once("headers.php");
    include("connection.php");

    //Execute a query to get all sellers
    $query = $mysqli->prepare("SELECT * FROM users WHERE user_type_id =2");
    $query->execute();
    $array = $query->get_result();

    $response = [];

    //Save data in an array
    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
?>
