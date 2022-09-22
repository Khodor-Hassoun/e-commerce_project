<?php
    include ("connection.php");
    require_once("headers.php");

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
              WHERE U.USER_TYPE_id = 2 
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
                WHERE U.USER_TYPE_id = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 month and now()
                Group by U.ID ) orders_count;"
    );
    $query->execute();
    $response["best client per month"] = $query->get_result()->fetch_assoc();

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
                WHERE U.USER_TYPE_id = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 year and now()
                Group by U.ID ) orders_count;"
    );

    $query->execute();
    $response["best client per year"] = $query->get_result()->fetch_assoc();

    echo json_encode($response);

?>
