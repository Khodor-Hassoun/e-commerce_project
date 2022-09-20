<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');
    $userId = $_GET['q'];
    $ban = 0;
    // I need to get the client Id
    // When I GET the client Id, we change is_banned to 1 (true)
    // First we will check if the user exists in the database
    $query = $mysqli ->prepare('SELECT * FROM users WHERE id=? AND is_banned = ?');
    $query ->bind_param('ii', $userId, $ban);
    $query->execute();
    $response = $query ->get_result();
    $user = $response->fetch_assoc();
    echo ($user["is_banned"]);
    echo json_encode($user);
    // if($user && $user[6] == 0){
    //     $query = $mysqli->prepare('UPDATE users SET is_banned = 1 WHERE id =? AND user_types_id = 3');
    //     $query ->bind_param('i', $userId);
    //     $query->execute();
    //     $response = $query->get_result();
    //     echo json_encode(["status" => "success!"]);

    // }elseif($user[6] == 1){
    //     echo json_encode(['User' =>'Already banned']);
    // }else{
    //     echo json_encode(['User' =>'Does not exist']);
    // }

    // $query = $mysqli->prepare('UPDATE users SET is_banned = 1 WHERE id =? AND user_types_id = 3');
    // $query ->bind_param('i', $userId);
    // $query->execute();
    // $response = $query->get_result();
    // echo json_encode(["status" => "success!"]);

?>