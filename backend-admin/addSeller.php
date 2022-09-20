<?php
    header("Access-Control-Allow-Origin: *");
    include('connection.php');
    
    // To add a seller they must be registered and already exist in the db
    $userId = $_POST['id'];
    $userTypeSeller = 2;
    $userTypeBuyer = 3;
    // I will now select the user to check if they exist
    $query = $mysqli->prepare('SELECT * FROM users WHERE id=? AND user_types_id =?');
    $query ->bind_param('ii', $userId, $userTypeBuyer);
    $query->execute();
    $query ->store_result();
    $num_rows = $query->num_rows();
    if($num_rows == 0){
        echo 'All are sellers';
        echo var_dump(http_response_code());
    }else{
        if (isset($userId) && !empty($userId)){
            $query = $mysqli->prepare("UPDATE users SET user_types_id =? WHERE id =?");
            $query ->bind_param('ii',$userTypeSeller,$userId);
            $query ->execute();
            echo json_encode(['success'=>'True']);
        }
    }



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