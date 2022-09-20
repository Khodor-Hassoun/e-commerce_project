<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');
    $userId = $_GET['q'];
    $not_ban = 0;
    $ban = 1;
    // I need to get the client Id
    // When I GET the client Id, we change is_banned to 1 (true)
    // First we will check if the user exists in the database
    if(!(isset($userId) && !empty($userId))){
        return;
    }
    $query = $mysqli ->prepare('SELECT * FROM users WHERE id=? AND is_banned = ?'); //Will return a single object
    $query ->bind_param('ii', $userId, $not_ban);
    $query->execute();
    $response = $query ->get_result(); // get result gives an onject
    $user = $response ->fetch_assoc(); //fetch_assoc gets an array of objects
    if($user == null){
        echo json_encode(['Banned'=>'False']);
    }else{
        $query = $mysqli ->prepare('UPDATE users SET is_banned = ? WHERE id=?'); //Will return a single object
        $query ->bind_param('ii', $ban, $userId);
        $query->execute();

        echo json_encode(["Banned" =>"True"]);
    }









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