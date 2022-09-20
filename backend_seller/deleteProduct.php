<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include("connection/connection.php");

$product_id = $_GET["product_id"];
//check if id is not empty
if(!isset($product_id)){ 
    echo json_encode(['status' => 400,'message' => 'ID cannot be empty']); 
    return;
}   
//check if id is valid in database
$query = $mysqli->prepare("SELECT * FROM products WHERE id = ?");
$query->bind_param("i", $product_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
    
if($num_rows == 0){
    echo json_encode(['status' => 400,'message' => 'ID not found']); 
    return;
}
//delete product by ID
$query = $mysqli->prepare("DELETE FROM products WHERE id = ?"); 
$query->bind_param("i", $product_id);
$query->execute();
echo json_encode(['status' => 200,'message' => 'success']); 

?>