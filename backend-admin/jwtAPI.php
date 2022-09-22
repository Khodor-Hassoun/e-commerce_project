<?php 

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__."/../vendor/autoload.php";

$privateKey = file_get_contents("./private-key.pem");
$publicKey = file_get_contents("./public-key.pem");

$payload = [
    'id' => '',
    'exp' => time() + 1000000000
];

$jwt = JWT::encode($payload, $privateKey, 'RS256');
$decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));

$result = [
    "token" => $jwt
];
echo json_encode($result);

?>