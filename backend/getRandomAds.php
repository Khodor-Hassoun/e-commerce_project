<?php

    // DataBase connection
    include("connection.php");
    require_once("headers.php");

    //Prepare and execute SQL query to retrieve 9 random products 
    $query = $mysqli->prepare(
        "SELECT * FROM ads 
         ORDER BY rand()
         LIMIT 3");
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
