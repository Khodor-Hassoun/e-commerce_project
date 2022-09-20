<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');

    $userId = $_POST["userId"];
    $username = $_POST["username"];
    $first_name = $_POST["first_name"];
    $email = $_POST["email"];
    $password =hash('sha256', $_POST["password"]) ;
    $flag = 1;

    $query = $mysqli("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();
    $array = $query->get_result();
    $response[0] = $array->fetch_all(MYSQLI_ASSOC);
    if(($response[0])){
        $response[0] = 1;
        $flag = 0;
    }else $response[0] = 0;

    $query = $mysqli->prepare("SELECT * FROM users where email = '$email'"); // checks for email if taken
    $query->execute();
    $array = $query->get_result();

    $response[1] = $array->fetch_all(MYSQLI_ASSOC);
    if(($response[1])){
        $response[1] = 1;
        $flag = 0;
    }else $response[1] = 0;
    
    if($flag){
        $query = $mysqli->prepare("UPDATE users SET first_name='$first_name',username='$username',email='$email',`password`='$password' WHERE id=$userId");
        $query->execute();
    }$response[2] = $flag;
    $json = json_encode($response);
    echo $json;
?>