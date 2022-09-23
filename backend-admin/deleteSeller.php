<?php
     require_once('headers.php');
     include('connection.php');
     require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    //  Initialize variable
     $userId = $_GET['id'];
     $user_type_id = 2;

    // Check if data is set
     if(!isset($userId) || empty($userId)){
        http_response_code(400);
        echo json_encode(['Error' =>"400", "Message" => "Invalid Id"]);
        return;
     }

    //  Get user
     $query = $mysqli ->prepare('SELECT * FROM users WHERE id = ? and user_type_id = ?');
     $query ->bind_param('ii',$userId, $user_type_id);
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

    // Delete user
     $query = $mysqli->prepare('DELETE FROM users WHERE id =?');
     $query->bind_param('i',$userId);
     
    //  Check if failed
     if(!($query ->execute())){
        http_response_code(400);

        echo json_encode(["error" => "400",
                          "message" =>"Deletion Failed"]);
      return;
     }

     echo json_encode(['Deletion' =>'Successful']);
?>
