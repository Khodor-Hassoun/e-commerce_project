<?php 
    include ("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

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

    //Prepare and execute query to get best seller of the week based on how many items are sold
    $query = $mysqli->prepare(

        "SELECT  
            products_count.seller_id, 
            MAX(products_count.SOLD_products)
        FROM ( SELECT 
                    U.ID AS seller_id, 
                    sum(O.quantity) AS SOLD_products 
                FROM orders_catalog O 
                INNER JOIN products P ON P.ID = O.product_id 
                INNER JOIN categories C ON C.ID = P.CATEGORY_ID 
                INNER JOIN users U ON U.ID = C.SELLER_ID 
                WHERE U.USER_TYPE = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 week and now()
                Group by U.ID ) products_count;"
    );

    $query->execute();
    $response["best seller week"] = $query->get_result()->fetch_assoc();

    //Prepare and execute query to get best seller of the month based on how many items are sold
    $query = $mysqli->prepare(

        "SELECT  
            products_count.seller_id, 
            MAX(products_count.SOLD_products)
        FROM ( SELECT 
                    U.ID AS seller_id, 
                    sum(O.quantity) AS SOLD_products 
                FROM orders_catalog O 
                INNER JOIN products P ON P.ID = O.product_id 
                INNER JOIN categories C ON C.ID = P.CATEGORY_ID 
                INNER JOIN users U ON U.ID = C.SELLER_ID 
                WHERE U.USER_TYPE = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 month and now()
                Group by U.ID ) products_count;"
    );

    $query->execute();
    $response["best seller per month"] = $query->get_result()->fetch_assoc();

    //Prepare and execute query to get best seller of the year based on how many items are sold
    $query = $mysqli->prepare(

        "SELECT  
            products_count.seller_id, 
            MAX(products_count.SOLD_products)
        FROM ( SELECT 
                    U.ID AS seller_id, 
                    sum(O.quantity) AS SOLD_products 
                FROM orders_catalog O 
                INNER JOIN products P ON P.ID = O.product_id 
                INNER JOIN categories C ON C.ID = P.CATEGORY_ID 
                INNER JOIN users U ON U.ID = C.SELLER_ID 
                WHERE U.USER_TYPE = 2 
                AND O.CREATED_AT between now() - INTERVAL 1 year and now()
                Group by U.ID ) products_count;"
    );

    $query->execute();
    $response["best seller per year"] = $query->get_result()->fetch_assoc();

    echo json_encode($response);

?>
