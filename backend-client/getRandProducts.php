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

    //If no response was given, send back an error message
    if (empty($response)) {
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'unable to retrieve products'
        ]);

        return;
    }

    echo json_encode($response);

    $query->close();
    $mysqli->close();

?>