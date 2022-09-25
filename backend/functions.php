<?php
  include ("connection.php");

//sanitize data: remove free spaces and convert special characters into HTML entities  
function check_input($data){
    
    $data = htmlspecialchars($data);
    $data = trim($data);
   
    return $data;
}
?>