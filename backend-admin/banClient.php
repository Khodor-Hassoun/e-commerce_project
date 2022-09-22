<?php
    require_once('headers.php');
    include('connection.php');

    $userId = $_GET['id'];
    $banned = 1;

    // Check input data
    if(!isset($userId) || empty($userId)){
        http_response_code(400);
        echo json_encode(["error" => "400",
                            "message" =>"Invalid user"]);
        return;
    }

    // Get user
    $query = $mysqli ->prepare('SELECT * FROM users WHERE id=? AND is_banned = ?'); //Will return a single object
    $query ->bind_param('ii', $userId, $banned);
    $query->execute();
    $response = $query ->get_result(); // get result gives an onject
    $user = $response ->fetch_assoc(); //fetch_assoc gets an array of objects
    
    // If doesn't exist then no need to continue
    if($user != null){
        http_response_code(400);
        echo json_encode(['Banned'=>'user is already banned']);

        return;
    }

    $query = $mysqli ->prepare('UPDATE users SET is_banned = ? WHERE id=?'); //Will return a single object
    $query ->bind_param('ii', $banned, $userId);
    $query->execute();

    echo json_encode(["Banned" =>"True"]);
?>