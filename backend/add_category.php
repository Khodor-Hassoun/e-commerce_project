<?php
    include ("connection.php");
    include ("headers.php");
    require_once("jwtFunc.php");

    // //Check JWT token
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
    $query = $mysqli->prepare("SELECT name FROM categories WHERE name = ? AND seller_id = ?");
    $query->bind_param("si", $name, $seller_id);
    $query->execute();

    $query->store_result();
    $num_rows = $query->num_rows;

    if($num_rows != 0){
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => 'category Exists']);
        return;}

    //decode base64 to image and upload it to images folder
    $img = base64_decode(str_replace('data:image/png;base64,', '', $thumbnail));
    $split_image = 'png';
    //Save the file by using a random name
    $file_name = sprintf("images/%s.png", bin2hex(random_bytes(10)));

    //If file not saved in folder, send back an error
    if(!file_put_contents($file_name, $img)){
        http_response_code(400);
        echo json_encode([
            'error' => 400,
            'message' => "Error: Invalid image"
    ]);
    }

    
    //Prepare and execute query to add a new category
    $query = $mysqli->prepare("INSERT INTO `categories` (`description`, `thumbnail`, `name`, `seller_id`)
    VALUE (?,?,?,?)");

    $query->bind_param("sssi", $description, $file_name, $name, $seller_id);
    $query->execute();


    $json = json_encode(['message' => "success!"]);
    echo $json;

    $query->close();
    $mysqli->close();
?>
