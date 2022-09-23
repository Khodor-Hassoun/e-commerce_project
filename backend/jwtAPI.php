<?php 

require __DIR__."/../vendor/autoload.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    $token=getallheaders()['Authorization'];
    $publicKey = file_get_contents("./public-key.pem");

    try{
        $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
        var_dump($decoded);
    }
    catch(\Exception $e){
        http_response_code(403);//server doesn't authorize the request
        echo json_encode([
            'error' => 403,
            'message' => 'Not authorized'
        ]);
        return;
    }

?>