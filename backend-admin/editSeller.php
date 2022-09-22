<?php
    require_once('headers.php');
    include('connection.php');

    // initilize variables
    $userId = $_POST['id'];
    $username = trim($_POST['username']);
    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address = $_POST['address'];
    $phoneNumber = $_POST['phoneNumber'];
    $password =hash('sha256', $_POST["password"]) ;
    $userTypeSeller = 2;

    //  Get user
    $query = $mysqli ->prepare('SELECT * FROM users WHERE id = ? and user_type_id = ?');
    $query ->bind_param('ii',$userId, $userTypeSeller);
    $query->execute();
    $query->store_result();

   //  Check if user exists
    $num_rows =$query->num_rows();
    if($num_rows == 0){
       http_response_code(400);

       echo json_encode(["error" => "400",
                           "message" =>"Seller Doesn't exist"]);
       return;
    }


    // Check usernames
    $query = $mysqli->prepare("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();
    $query ->store_result();

    // If username exists
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"UserName Taken"]);
        return;
    }

    // Check emails
    $query = $mysqli->prepare("SELECT * FROM users where email = ?"); // checks for email if taken
    $query ->bind_param('s',$email);
    $query->execute();
    $query ->execute();$query ->store_result();

    // Check if email exists
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"UserName Taken"]);
        return;
    }

    // Update User
    $query = $mysqli->prepare("UPDATE users SET `first_name` = ?, `username` = ?, `email` = ?,`password`= ?, `address`= ?, `phone_number` = ? WHERE id= ?");
    $query->bind_param('sssssii', $first_name, $username, $email, $password, $address, $phoneNumber, $userId);
    $query->execute();
    var_dump($query); die();

    echo json_encode(["User" => "Updated"]);

?>