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

    //Prepare and execute query to get best client of the week based on how much they paid
    $query = $mysqli->prepare(

        "SELECT  
            orders_count.client_id, 
            MAX(orders_count.orders_made)
        FROM ( SELECT 
              U.ID AS client_id, 
              sum(O.total_price) AS orders_made 
              FROM orders O  
              INNER JOIN users U ON U.ID = O.user_id 
              WHERE U.USER_TYPE = 2 
              AND O.CREATED_AT between now() - INTERVAL 1 week and now()
              Group by U.ID ) orders_count;"
    );

    $query->execute();
    $response["best client per week"] = $query->get_result()->fetch_assoc();

    //Prepare and execute query to get best client of the month based on how much they paid
    $query = $mysqli->prepare(

        "SELECT  
            orders_count.client_id, 
            MAX(orders_count.orders_made)
        FROM ( SELECT 
                    U.ID AS client_id, 
                    sum(O.total_price) AS orders_made 
                FROM orders O  
                INNER JOIN users U ON U.ID = O.user_id 
                WHERE U.USER_TYPE = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 month and now()
                Group by U.ID ) orders_count;"
    );

    $query->execute();
    $response["best client per month"] = $query->get_result()->fetch_assoc();

?>
