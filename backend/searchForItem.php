<?php
// DataBase connection
include("connection.php");

//files needed
require_once("headers.php");
require('functions.php');

//sanitize the data
$productName = check_input($_POST['name']);

// Check if the input is exists
if (
    !isset($productName) || empty($productName)
) {
    http_response_code(400);
    echo json_encode(['Error' => "400", "Message" => "Incomplete data"]);
    return;
}
//search for an item
$query = $mysqli->prepare("SELECT * FROM products where name LIKE'?");
$query->bind_param("s", "%{$productName}%");
$query->execute();

$array = $query->get_result();

$response = [];

while($a = $array->fetch_assoc()){
    $response[] = $a;
}

echo json_encode($response);

?>
