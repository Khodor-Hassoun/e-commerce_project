<?php 
// DataBase connection
include("connection.php");
require_once("headers.php");

require __DIR__."/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$email = $_POST["email"];
$password = $_POST["password"];

//Validate input
if(!isset($email) || empty($email)){
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid Email']);
    return;
}

//Validate input
if(!isset($password)  || empty($password)){
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid Password']);
    return;   
}

//Hash password
$password = hash("sha256", $password);

//Prepare and execute SQL query to log in
$query = $mysqli->prepare("SELECT users.id, type, users.is_banned
FROM users
INNER JOIN user_types
ON users.user_type_id = user_types.id
WHERE email = ?  AND password = ? ");
$query->bind_param("ss", $email, $password);
$query->execute();

$array = $query->get_result()->fetch_assoc();

//If no result was given, send an error
if (empty($array)) {
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'incorrect username or password'
    ]);

    return;
}

$privateKey = file_get_contents("./private-key.pem");

//Save the data we need in the payload
$payload = [
    'id' => $array['id'],
    'exp' => time() + 1500*2000
];

//encode and get the JWT 
$jwt = JWT::encode($payload, $privateKey, 'RS256');

//Save the user id and the JWT
$response = [];
$response['token'] = $jwt;
$response['id'] = $array['id'];
$response['type'] = $array['type'];
$response['is_banned'] = $array['is_banned'];
$json = json_encode($response);
echo $json;

$query->close();
$mysqli->close();

?>
