<?php 
// DataBase connection
include("connection.php");
require_once("headers.php");

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
$query = $mysqli->prepare("SELECT id  FROM users WHERE email = ? AND password = ?");
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

require __DIR__."/../vendor/autoload.php";

$privateKey = file_get_contents("./private-key.pem");

$payload = [
    'id' => '',
    'exp' => time() + 1000000000
];

$jwt = JWT::encode($payload, $privateKey, 'RS256');

$json = json_encode($array);
echo $json;

$query->close();
$mysqli->close();

?>