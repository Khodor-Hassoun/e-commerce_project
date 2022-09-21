<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');

    $userId = $_POST["userId"];
    $username = $_POST["username"];
    $first_name = $_POST["first_name"];
    $email = $_POST["email"];
    $password =hash('sha256', $_POST["password"]) ;
    $isUsernTaken = true;
    $isEmailTaken = true;

    $query = $mysqli("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();$query ->store_result();
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"UserName Taken"]);
        return;
    }

    $query = $mysqli->prepare("SELECT * FROM users where email = ?"); // checks for email if taken
    $query ->bind_param('s',$email);
    $query->execute();
    $query ->execute();$query ->store_result();
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"UserName Taken"]);
        return;
    }


    $query = $mysqli->prepare("UPDATE users SET first_name= ?,username= ?,email= ?,`password`= ? WHERE id= ?");
    $query->bind_param('ssssi', $first_name, $username, $email, $password, $userId);
    $query->execute();
    echo json_encode(["User" => "Updated"]);

?>