<?php

    // DataBase connection
    include ("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $seller_id = $_POST["seller_id"];   

    //Validate seller id
    if(!isset($seller_id) || empty($seller)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid seller id'
        ]);
        
        return;   
    }

    //Prepare and execute SQL query to retrieve all products of a certain seller
    $query = $mysqli->prepare(
        "SELECT *, COUNT(*) as count
        FROM views, products
        where views.product_id IN (
            SELECT products.id 
            FROM products 
            INNER JOIN views
            ON products.id = views.product_id
            WHERE products.user_id = ?)
        GROUP BY views.product_id desc LIMIT 5"
        );

    $query->bind_param("i", $seller_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    echo json_encode($response);

?>
