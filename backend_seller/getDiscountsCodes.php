<?php
  include("headers/headers.php");
  include("connection/connection.php");

  $seller_id = $_GET["seller_id"];

    //Check if ID's are not empty
    if(!isset($seller_id) || empty($seller_id)){
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'Seller ID cannot be empty']);
        return;
    }
    //Check if these seller has discounts
    $query = $mysqli->prepare("SELECT code FROM discounts WHERE seller_id = ?");
    $query->bind_param("i", $seller_id);
    $query->execute();
    $array=$query->get_result();

    //if no,send a message that no discounts found
    if (empty($array)) {
        http_response_code(400);
        echo json_encode(['status' => 400,'message' => 'No discounts found']);
        return;
    }
    //if yes,echo result as json
    $discounts = [];
    while($a = $array->fetch_assoc()){
        $discounts[] = $a;
    }
    echo json_encode($discounts);

?>