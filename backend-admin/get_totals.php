<?php
    include ("connection.php");
    require_once("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    //get total products
    $query = $mysqli->prepare(
        "SELECT  
            COUNT(products.ID)
        FROM products;"
    );
    $query->execute();

    $response["total_products"] = $query->get_result()->fetch_assoc()["COUNT(products.ID)"];

    //get total sellers 
    $query = $mysqli->prepare(

        "SELECT  
            COUNT(user_types.ID)
        FROM user_types
        WHERE user_types.type = 2;"
    );
    $query->execute();

    $response["total_sellers"] = $query->get_result()->fetch_assoc()["COUNT(user_types.ID)"];

    //get total clients
    $query = $mysqli->prepare(

        "SELECT  
            COUNT(user_types.ID)
        FROM user_types
        WHERE user_types.type = 3;"
    );
    $query->execute();

    $response["total_clients"] = $query->get_result()->fetch_assoc()["COUNT(user_types.ID)"];

    echo json_encode($response);

?>