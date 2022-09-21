<?php
     header("Access-Control-Allow-Origin: *");
     include('connection.php');

    //  Initialize variable
     $userId = $_GET['id'];

    // Check if data is set
     if(!isset($userId) || empty($userId)){
        http_response_code(400);
        echo json_encode(['Error' =>"400", "Message" => "Invalid Id"]);
        return;
     }

    //  Get user
     $query = $mysqli ->prepare('SELECT * FROM users WHERE id = ?');
     $query ->bind_param('i',$userId);
     $query->execute();
     $query->store_result();

    //  Check if user exists
     $num_rows =$query->num_rows();
     if($num_rows == 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"User Doesn't exist"]);
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
     }
     echo json_encode(['Deletion' =>'Successful']);

?>
