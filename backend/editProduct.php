<?php
    include("headers.php");
    include("connection.php");
    // require_once("jwtFunc.php");

    //Check JWT token
    // if(!jwtAuth()){
    //     return;
    // }

    $id = $_POST["id"];
    $thumbnail = $_POST['thumbnail'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $category_id = $_POST['category_id'];
    $price = $_POST['price'];
    $user_id = $_POST['user_id'];

    // Get views from table
    // $views = $_POST['views'];
    
    //Check if ID's are not empty
    if(!isset($id) || empty($id) || !isset($thumbnail) || empty($thumbnail)
        || !isset($name) || empty($name) || !isset($description) || empty($description)
        || !isset($category_id) || empty($category_id) || !isset($price) || empty($price)
        || !isset($user_id) ||empty($user_id)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'All fields are required']);
        
        return;   
    }   

    // Check if product name exists for the seller
    $query = $mysqli->prepare("SELECT name FROM products WHERE name = ? and user_id = ?");
    $query ->bind_param('si',$name, $user_id);
    $query ->execute();
    $query ->store_result();

    // If yes,send a message that product exists
    $num_rows = $query->num_rows();
    if($num_rows >0){
        http_response_code(400);
        echo json_encode(["status" => "400","message" =>"Product name Exists"]);
        return;
    }

    // Update product
    $query = $mysqli->prepare("UPDATE `products` SET thumbnail= ?,`name`= ?,`description`= ?,`category_id`= ? ,`price`= ? WHERE id = ?");
    $query->bind_param('sssiii', $thumbnail, $name, $description, $category_id, $price, $id);
    $query->execute();
    echo json_encode(["message" => "success"]);

?>