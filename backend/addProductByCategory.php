<?php

include("headers.php");
include("connection.php");
require_once("jwtFunc.php");

//Check JWT token
if(!jwtAuth()){
    return;
}

$category_id = $_POST["category_id"];
$seller_id = $_POST["seller_id"];
$quantity = $_POST["quantity"];
$name= $_POST["name"];
$thumbnail = $_POST["thumbnail"];
$description = $_POST["description"];
$price = $_POST["price"];
$views = 0;

//check if id is not empty
if(!isset($category_id) || empty($category_id) || !isset($seller_id) || empty($seller_id) || !isset($quantity) || empty($quantity)
 || !isset($name) || empty($name) || !isset($thumbnail) || empty($thumbnail) || !isset($description) || empty($description)
 || !isset($price) || empty($price)){ 
    echo json_encode(['status' => 400,'message' => 'All fields are required!']); 
    return;
}   

//decode base64 to image and upload it to images folder
$img = base64_decode(str_replace('data:image/png;base64,', '', $thumbnail));
    $split_image = 'png';
    //Save the file by using a random name
    $file_name = sprintf("images/%s.png", bin2hex(random_bytes(10)));

    //If file not saved in folder, send back an error
    if(!file_put_contents($file_name, $img)){
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => "Error: Invalid image"
    ]);
}

//insert new product
$query = $mysqli->prepare("INSERT INTO products (thumbnail, name, description, category_id, quantity, price, views, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) "); 
$query->bind_param("sssiiiii", $file_name, $name,$description, $category_id, $quantity, $price, $views, $seller_id);
$query->execute();
$product_id = mysqli_insert_id($mysqli);

//If no new id was inserted, return an error
if ($product_id === null) {
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => "Error: Can't add tweet"
    ]);
    
    return;
}
else{
    echo json_encode([
        'status' => 200,
        'message' => "Product added successfully!"
    ]);
}
?>
