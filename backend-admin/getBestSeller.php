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

    //Prepare and execute query to get best seller based on how many items are sold
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

?>
