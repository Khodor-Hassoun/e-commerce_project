<?php
include("connection.php");
require_once("headers.php");

require __DIR__."/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// initilize variables
$username = trim($_POST['username']);
$phoneNumber = $_POST['phoneNumber'];
$address = $_POST['address'];
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$password =hash('sha256', $_POST["password"]) ;
$userTypeID = 3;
$isBanned=0;

//Check if the inputs are correct
if(
    !isset($username) || empty($username)
    || !isset($email) || empty($email)
    || !isset($firstName) || empty($firstName)
    || !isset($lastName) || empty($lastName)
    || !isset($password) || empty($password)
    || !isset($phoneNumber) || empty($phoneNumber)
    || !isset($address) || empty($address)

) {
    http_response_code(400);
    echo json_encode(['Error' =>"400", "Message" => "Incomplete data"]);
    return;
}     
 //check if email and password already exists in database
 $query = $mysqli->prepare("SELECT * FROM users WHERE email= ?");
 $query->bind_param("s", $email);
 $query->execute();
 $query->store_result();
 $num_rows = $query->num_rows;
     
 if($num_rows != 0){
     http_response_code(400);
     echo json_encode(['status' => 400,'message' => 'User Already Exists']); 
     return;
 }
 //check if username is taken
 $query = $mysqli->prepare("SELECT * FROM users WHERE username=?");
 $query->bind_param("s", $username);
 $query->execute();
 $query->store_result();
 $num_rows = $query->num_rows;
     
 if($num_rows != 0){
     http_response_code(400);
     echo json_encode(['status' => 400,'message' => 'Username taken']); 
     return;
 }
//Prepare and execute SQL query to add a new user
$query = $mysqli->prepare("INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `address`, `phone_number`,`is_banned`, `user_type_id`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"); 
$query->bind_param("sssssssii", $username,$password, $email,  $firstName,$lastName,$address,$phoneNumber,$isBanned,$userTypeID);
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
    'exp' => time() + 1500*2000
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