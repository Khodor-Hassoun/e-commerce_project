<?php
     header("Access-Control-Allow-Origin: *");
     include('connection.php');

     $userId = $_GET['id'];

     if(!isset($userId) || empty($userId)){
        http_response_code(400);
        echo json_encode(['Error' =>"400", "Message" => "Invalid Id"]);
        return;
     }

     $query = $mysqli ->prepare('SELECT * FROM users WHERE id = ?');
     $query ->bind_param('i',$userId);
     $query->execute();
     $query->store_result();
     $num_rows =$query->num_rows();
     if($num_rows == 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"User Doesn't exist"]);
        return;
     }

     $query = $mysqli->prepare('DELETE FROM users WHERE id =?');
     $query->bind_param('i',$userId);
     if(!($query ->execute())){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"Deletion Failed"]);
     }
     echo json_encode(['Deletion' =>'Successful']);

?>
