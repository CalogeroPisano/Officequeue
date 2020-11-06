<?php
require_once('dao.php');
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postBody = file_get_contents("php://input");
    $input = (json_decode($postBody));
    $return = login($input->username, $input->password);
    
    //LOGIN FAIL
    if($return == 0) {
        exit('Login failed');
    }
    //LOGIN SUCCESS
    else {
        $_SESSION['user_id'] = $return['user_id'];
        echo (json_encode($return));

        // $_SESSION['counter_id'] = $input->counter;
        // UPDATE COUNTERS SET idUser=$_SESSION['user_id'] WHERE idCounter=$_SESSION['counter_id']
    }
}

?>