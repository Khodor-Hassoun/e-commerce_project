<?php
// initilize variables
    // $userId = $_POST['id'];
    $username = trim($_POST['username']);
    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $password =hash('sha256', $_POST["password"]) ;
    $userTypeSeller = 3;
    $isBanned = 0;

    // Check if the inputs are correct
    if (
        !isset($username) || empty($username)
        || !isset($email) || empty($email)
        || !isset($firstName) || empty($firstName)
        || !isset($lastName) || empty($lastName)
        || !isset($password) || empty($password)
    ) {
        http_response_code(400);
        echo json_encode(['Error' =>"400", "Message" => "Incomplete data"]);
        return;
    }

    // Get usernames
    $query = $mysqli->prepare("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();
    $query ->store_result();

    //Check if username exists 
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"Username Taken"]);
        return;
    }