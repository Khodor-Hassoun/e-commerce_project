<?php

    include ("connection.php");
    require_once("headers.php");

    $admin_id = $_GET["admin_id"];  

    //Validate input
    if(!isset($admin_id) || empty($admin_id)){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid admin id'
        ]);
        
        return;   
    }

    //get total products
    $mysqli->prepare(

        "SELECT  
            COUNT(products.ID)
        FROM products;"
    );
    $query->execute();

    $response["total_products"] = $query->get_result()->fetch_assoc();
?>