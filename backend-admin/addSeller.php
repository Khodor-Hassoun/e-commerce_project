<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');
    
    // To add a seller they must be registered and already exist in the db
    $userId = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $password =hash('sha256', $_POST["password"]) ;
    $userTypeSeller = 2;
    $isBanned = 0;

    // I will now select the user to check if they exist
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

    $query = $mysqli->prepare("INSERT INTO users (`username`, `password`, `email`, `first_name`, `last_name`, `is_banned`, `user_type`) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $query ->bind_param('sssssii',$username, $password, $email, $firstName, $lastName, $isBanned, $userTypeSeller);
    $query ->execute();
    $response = [];
    $response["success"] = true;
    echo json_encode($response);

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ////////////////////////////////////////////////////////////
    // $query = $mysqli->prepare('SELECT * FROM users WHERE id=? AND user_type =?');
    // $query ->bind_param('ii', $userId, $userTypeBuyer);
    // $query->execute();
    // $query ->store_result();
    // $num_rows = $query->num_rows();
    // if($num_rows == 0){
    //     echo json_encode(['Operation'=>'False']);
    //     echo var_dump(http_response_code());
    // }else{
    //     if (isset($userId) && !empty($userId)){
    //         $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
    //         $query ->bind_param('ii',$userTypeSeller,$userId);
    //         $query ->execute();
    //         echo json_encode(['success'=>'True']);
    //     }
    // }



    // if (isset($userId) && !empty($userId)){
    //     $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
    //     $query ->bind_param('ii',$userTypeSeller,$userId);
    //     $query ->execute();
    //     echo json_encode(['success'=>'True']);
    // }

    // $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
    // $query ->bind_param('ii',$userTypeSeller,$userId);
    // $query ->execute();
    // echo json_encode(['success'=>'True'])
?>