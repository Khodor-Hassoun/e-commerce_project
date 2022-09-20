<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');
    
    // To add a seller they must be registered and already exist in the db
    $userId = $_POST['q'];
    $userTypeSeller = 2;

    if (isset($userId) && !empty($userId)){
        $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
        $query ->bind_param('ii',$userTypeSeller,$userId);
        $query ->execute();
        echo json_encode(['success'=>'True']);
    }
    // $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
    // $query ->bind_param('ii',$userTypeSeller,$userId);
    // $query ->execute();
    // echo json_encode(['success'=>'True'])
?>