<?php
require_once('dao.php');
header('Content-Type: application/json');

$result = logout();
//LOGOUT SUCCESS
if($result) {
    session_unset();
    session_destroy();
} 
//LOGOUT FAIL
else {
    exit('Logout failed');
}
?>