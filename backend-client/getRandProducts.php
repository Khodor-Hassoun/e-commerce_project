<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    //Prepare and execute SQL query to retrieve 6 random products
    $query = $mysqli->prepare(
        "SELECT * FROM products
        ORDER BY rand()
        LIMIT 6");
    $query->execute();

    $response = $query->get_result()->fetch_assoc();

?>