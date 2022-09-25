<?php
include("connection.php");
require_once("headers.php");

require __DIR__."/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// initilize variables
$username = trim($_POST['username']);
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$address = $_POST['address'];
$phoneNumber = $_POST['phoneNumber'];
$password =hash('sha256', $_POST["password"]) ;
$userTypeSeller = 2;

//Check if the inputs are correct
if(
    !isset($username) || empty($username)
    || !isset($email) || empty($email)
    || !isset($firstName) || empty($firstName)
    || !isset($lastName) || empty($lastName)
    || !isset($password) || empty($password)
) {
    http_response_code(400);
    echo json_encode(['Error' =>"400", "Message" => "Incomplete data"]);
    return;
}     

//Hash password
$password = hash("sha256", $password);

//Prepare and execute SQL query to add a new user
$query = $mysqli->prepare("INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `address`, `phone_number`, `is_banned`, `user_type_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"); 
$query->bind_param("ssss", $username, $email, $password, $birthDate);
$query->execute();

$userID = mysqli_insert_id($mysqli);

//If no new id was inserted, return an error
if ($userID === null) {
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Incorrect data'
    ]);
    
    return;
}

$privateKey = file_get_contents("./private-key.pem");

//Save the data we need in the payload
$payload = [
    'id' => $userID,
    'exp' => time() + 1500
];

//encode and get the JWT 
$jwt = JWT::encode($payload, $privateKey, 'RS256');

//Save the user id and the JWT
$response = [];
$response['token'] = $jwt;
$response['id'] = $userID;
$json = json_encode($response);
echo $json;

$query->close();
$mysqli->close();

?>