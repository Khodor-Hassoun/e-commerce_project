<?php
    include("headers.php");
    include("connection.php");

    $product_id = $_GET["product_id"];
    $user_id = $_GET["user_id"];

    //Check if ID's are not empty
    if(!isset($product_id) || empty($product_id) || !isset($user_id) || empty($user_id)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'Product ID and User ID cannot be empty']);
        
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

//Insert like item record to database
$query = $mysqli->prepare("INSERT INTO favourite_items (product_id, user_id) VALUE (?, ?) "); 
$query->bind_param("ii", $product_id, $user_id);
$query->execute();

$product= mysqli_insert_id($mysqli);
//If last query id is not equal to product id,send an error
if ($product=== null) {
    http_response_code(400);
    echo json_encode(['error' => 400,'message' => "Error: Like not sent"
    ]);
    
    return;
}

echo json_encode(['message' => "success!"]);

?>