<?php
    require_once("headers.php");
    include("connection.php");

        $user_id= $_GET["user_id"];
       
        //check if ID's empty
        if(!isset($user_id) || empty($user_id)){ 
            echo json_encode(['status' => 400,'message' => 'IDs cannot be empty']); 
            return;
        } 
        //check if there's wishlist items
        $query = $mysqli->prepare("SELECT * FROM wishlists WHERE user_id = ?");
        $query->bind_param("i", $user_id);
        $query->execute();
        $res=$query->store_result();
        $num_rows = $query->num_rows;
    
        //if no,send a message that their is no wishlist items
        if ($num_rows==0) {
            http_response_code(400);
            echo json_encode(['status' => 400,'message' => 'No Wishlist items found']);
            return;
        }
        
        //execute query
        $query = $mysqli->prepare("Select * FROM wishlists, products
        WHERE wishlists.product_id = products.id and wishlists.user_id = ?");
        $query->bind_param("i", $user_id);
        $query->execute();
        $array = $query->get_result();

        $response = [];

        while($a = $array->fetch_assoc()){
            $response[] = $a;
        }

        $json = json_encode($response);
        echo $json;
?>