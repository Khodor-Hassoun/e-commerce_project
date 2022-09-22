<?php
    include("headers.php");
    include("connection.php");

    $id = $_POST["id"];
    $username = $_POST["username"];
    $password= hash('sha256', $_POST["password"]) ;
    $email = $_POST["email"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];

    //Check if ID's are not empty
    if(!isset($id) || empty($id) || !isset($username) || empty($username)
        || !isset($password) || empty($password) || !isset($email) || empty($email)
        || !isset($first_name) || empty($first_name) || !isset($last_name) || empty($last_name)){ 
        http_response_code(400);
        echo json_encode([
            'status' => 400,'message' => 'All fields are required']);
        
        return;   
    }   

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
    $query = $mysqli->prepare("UPDATE users SET first_name= ?, last_name= ?,username= ?,email= ?,password= ? WHERE id= ?");
    $query->bind_param('sssssi', $first_name, $last_name, $username, $email, $password, $id);
    $query->execute();
    echo json_encode(["message" => "success"]);



?>