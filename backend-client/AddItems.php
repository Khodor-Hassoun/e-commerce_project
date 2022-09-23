<?php
    include("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $product_id = $_POST["product_id"];
    $client_id = $_POST["client_id"];

    //Validate product id
    if(!isset($product_id) || empty($product_id)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid product id'
        ]);
        
        return;   
    }    

    //Validate client id
    if(!isset($client_id) || empty($client)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid client id'
        ]);
        
        return;   
    }

    //Prepare and execute query to add a new item to cart
    $query = $mysqli->prepare("INSERT INTO `carts` (`product_id`, `user_id`)
                                VALUES (?, ?);");

    $query->bind_param("ii", $product_id, $client_id);
    $query->execute();


    $json = json_encode(['message' => "success!"]);
    echo $json;

    $query->close();
    $mysqli->close();

?>
