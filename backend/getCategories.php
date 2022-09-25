<?php
    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    $seller_id = $_GET['id'];


    if(!isset($seller_id) || empty($seller_id)){

        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid Seller id']);
        return;
    }

    $query = $mysqli->prepare("SELECT * FROM categories WHERE seller_id=?");
    $query->bind_param('i',$seller_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;



?>