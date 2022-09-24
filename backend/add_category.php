<?php
    include ("connection.php");
    include ("headers.php");
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }
    
    $description = $_POST["description"];
    $thumbnail = $_POST["thumbnail"];
    $name = $_POST["name"];
    $seller_id = $_POST["seller_id"];

    // validate category name
    if(!isset($name) || empty($name) ){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid name'
        ]);
        
        return;   
    }

    //validate seller_id
    if(!isset($seller_id) || empty($seller_id) ){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid user id'
        ]);
        
        return;   
    }

    //validate category thumbnail
    if(!isset($thumbnail) || empty($thumbnail) ){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid user thumbnail'
        ]);
        
        return;   
    }

    //validate category description
    if(!isset($description) || empty($description) ){ 
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'Invalid user description'
        ]);
        
        return;   
    }

    //check if category name exists
    $query = $mysqli->prepare("SELECT name FROM categories WHERE name = ? AND user_id = ?");
    $query->bind_param("si", $name, $user_id);
    $query->execute();

    $query->store_result();
    $num_rows = $query->num_rows;

    if($num_rows != 0){
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'category Exists']);
        return;}
    
    //Prepare and execute query to add a new category
    $query = $mysqli->prepare("INSERT INTO `categories` (`description`, `thumbnail`, `name`, `user_id`)
    VALUE (?,?,?,?)");

    $query->bind_param("sssi", $description, $thumbnail, $name, $user_id);
    $query->execute();


    $json = json_encode(['message' => "success!"]);
    echo $json;

    $query->close();
    $mysqli->close();
?>
