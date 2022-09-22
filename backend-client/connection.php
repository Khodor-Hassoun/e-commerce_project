
<?php
header("Access-Control-Allow-Origin: *");
$db_host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "e-commerce_db";
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

?>