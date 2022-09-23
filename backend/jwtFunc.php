<?php 

require __DIR__."/vendor/autoload.php";
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function jwtAuth(){
    $auth = getallheaders()["Authorization"] ?? '';

    $publicKey = file_get_contents("./public-key.pem");

    try{
        JWT::decode($auth, new Key($publicKey, 'RS256'));
    }
    catch(\Throwable $e){
        http_response_code(403);
        echo json_encode(['Error' =>"403", "Message" => "Invalid token"]);
        return false;
    }

    return true;
}

?>