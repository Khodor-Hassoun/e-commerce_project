<?php
    include("headers.php");
    include("connection.php");
    require_once("jwtFunc.php");

    $product_id = $_GET["product_id"];

    //Check if ID is not empty
    if(!isset($product_id) || empty($product_id)){ 
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'User ID cannot be empty']);
        
        return;   
    }   

    //Check if their's favourite items  for this user id
    $query = $mysqli->prepare("SELECT product_id, COUNT(user_id) as views FROM views WHERE product_id = ?");

    $query->bind_param("i", $product_id);
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

    //If response is empty, send back an error message
    if (empty($response)) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Product does not have any views'
        ]);

        return;
    }

    echo json_encode($response);

    $query->close();
    $mysqli->close();

?>
