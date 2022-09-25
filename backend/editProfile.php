<?php
    include("headers.php");
    include("connection.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    $id = $_POST["id"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];

    // Check if username exists
    $query = $mysqli->prepare("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();
    $query ->store_result();

    // If yes,send a message that username exists
    $num_rows = $query->num_rows();
    if($num_rows >0){
        http_response_code(400);
        echo json_encode(["status" => "400","message" =>"Username Exists"]);
        return;
    }

    // Check if email exists
    $query = $mysqli->prepare("SELECT * FROM users where email = ?"); // checks for email if taken
    $query ->bind_param('s',$email);
    $query->execute();
    $query ->execute();$query ->store_result();
    // If yes,send a message that email exists
    $num_rows = $query->num_rows();
    if($num_rows >0){
        http_response_code(400);
        echo json_encode(["status" => "400","message" =>"Email Exists"]);
        return;
    }

    // Update User
    $query = $mysqli->prepare("UPDATE users SET first_name= ?, last_name= ?,username= ?,email= ? WHERE id= ?");
    $query->bind_param('ssssi', $first_name, $last_name, $username, $email, $id);
    $query->execute();

    echo json_encode(["message" => "success"]);
?>
