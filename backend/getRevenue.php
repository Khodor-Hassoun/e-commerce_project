<?php
    include("headers.php");
    include("connection.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $seller_id= $_GET["seller_id"];
    //check if id is not empty
    if(!isset($seller_id) || empty($seller_id)){ 
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'ID cannot be empty']); 
        return;
    } 

    //check if seller is valid in database
    $query = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
    $query->bind_param("i", $seller_id);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;
        
    if($num_rows == 0){
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Seller not found']); 
        return;
    }
//Get revenues of last week
    $query = $mysqli->prepare(
        "SELECT  
        sum(P.price)*O.quantity AS revenue 
        FROM orders_catalog O
        INNER JOIN products P ON P.ID = O.product_id 
        INNER JOIN users U ON U.ID = ?
        WHERE U.USER_TYPE = 2 
        AND O.CREATED_AT between now() - INTERVAL 1 week and now()
        Group by U.ID ");
    $query->bind_param("i", $seller_id);
    $query->execute();
    $array = $query->get_result();

    //Save result in followings array
    $revenues = [];
    while($a = $array->fetch_assoc()){
        $revenues[] = $a;
    }

    //If the array was empty, send back an error
    if (empty($revenues)) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'No revenues for the last week']);
        
        return;
    }

    echo json_encode($revenues);

?>
