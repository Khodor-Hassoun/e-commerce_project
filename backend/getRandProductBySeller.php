<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    $seller_id = $_GET['id'];

    //Prepare and execute SQL query to retrieve 9 random products 
    $query = $mysqli->prepare(
        "SELECT * FROM products P
         WHERE user_id = ?
         ORDER BY rand()
         LIMIT 9");
    $query->bind_param('i', $seller_id);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    echo json_encode($response);

    $query->close();
    $mysqli->close();
?>
