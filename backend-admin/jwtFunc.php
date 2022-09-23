<?php 

require __DIR__."/../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function jwtAuth(){
    $publicKey = file_get_contents("./public-key.pem");

    $auth = getallheaders()["Authorization"];

    $publicKey = file_get_contents("./public-key.pem");

    try{
        JWT::decode($auth, new Key($publicKey, 'RS256'));
    }
    catch(\Exception $e){
        http_response_code(403);
        echo json_encode(['Error' =>"403", "Message" => "Invalid token"]);
        return false;
    }

    return true;
}

?>