<?php
    require_once("headers.php");
    include("connection.php");

    $user_id= $_GET["user_id"];
    $product_id = $_GET["product_id"];
    if(!isset($user_id) || empty($user_id) || !isset($product_id) || empty($product_id)){ 
        echo json_encode(['status' => 400,'message' => 'IDs cannot be empty']); 
        return;
        } 
        

    $query = $mysqli->prepare("SELECT * FROM wishlists  WHERE user_id=? and product_id=?");
    $query->bind_param("ii", $user_id,$product_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
?>