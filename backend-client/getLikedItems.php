<?php
    include("headers.php");
    include("connection.php");

    $user_id = $_GET["user_id"];

    //Check if ID is not empty
    if(!isset($user_id) || empty($user_id)){ 
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'User ID cannot be empty']);
        
        return;   
    }   

    //Check if their's favourite items  for this user id
    $query = $mysqli->prepare("SELECT * FROM favourite_items WHERE user_id = ?");
    $query->bind_param("i", $user_id);
    $query->execute();
    $res=$query->store_result();
    $num_rows = $query->num_rows;

    //if no,send a message that their is no favourite items
    if ($num_rows==0) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'No favourite items found']);
        return;
    }
    //get favourite items for this user
    $query = $mysqli->prepare("
    Select * FROM favourite_items, products
    WHERE favourite_items.product_id = products.id and favourite_items.user_id = ?"); 
    $query->bind_param("i", $user_id);
    $query->execute();
    $array = $query->get_result();

    $favItems = [];
    while($a = $array->fetch_assoc()){
        $favItems[] = $a;
    }

    echo json_encode($favItems);

?>