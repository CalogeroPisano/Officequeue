<?php
require_once('dao.php');
header('Content-Type: application/json');

$msg = "Invalid API!";
if(isset($_GET['url'])){
    $var = $_GET['url'];
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        $number = intval(preg_replace('/[^0-9]+/', '', $var));
        switch($var){
            case "users":
                //GET ALL USERS TABLE INFO
                echo json_encode(getAllUsers());
            break;
            case "tickets":
                //GET ALL TICKETS INFO
                echo json_encode(getAllTickets());
            break;
            case "counters":
                //GET ALL COUNTERS INFO
                echo json_encode(getAllCounters());
            break;
            case "requests":
                //GET ALL REQUESTS INFO
                echo json_encode(getAllRequests());
            break;
            case "servedTickets":
                //GET ALL SERVED TICKETS INFO
                echo json_encode(getAllServedTickets());
            break;
            case "getTicketsWithRequestType":
            $requestType = $_GET['req'];
            $requestType = strtoupper($requestType);
            $return = getTicketsWithRequestType($requestType);
            if($return == 0){ 
                echo (json_encode($return));
            }
            else {
                $conv = json_encode($return);
                echo ($conv);
            }
            break;
            
            case "getServingTickets":
                $return = json_encode(getServingTickets());
                echo $return;
            break;
            default:
                echo $msg;
        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'POST') {
        //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        $number = intval(preg_replace('/[^0-9]+/', '', $var));
        switch($var){
            //RETURNS THE TICKET NUMBER GIVEN A REQUEST TYPE; RETURNS 0 ON ERROR
            case "insertTicketsWithType":
                $ticketType = file_get_contents("php://input");
                $inputTicket = (json_decode($ticketType));
                echo json_encode(insertTicket($inputTicket->type));
            break;
            case "getTicketToBeServed":
                //to be implemented
                $postBody = file_get_contents("php://input");
                    $input = (json_decode($postBody));
                    $return = getTicketToBeServed($input->idCounter, $input->ticketNumber);
                    if($return == 0){
                        echo (json_encode($return));
                    }
                    else {
                        // session_start();
                        // $_SESSION['user_id'] = $return['user_id'];
                        $conv = json_encode($return);
                        echo ($conv);
                    }
                break;
            default:
                echo $msg;
        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        $number = intval(preg_replace('/[^0-9]+/', '', $var));
        switch($var){
            //DELETES ALL TICKETS FROM PREVIOUS DAYS
            case "tickets":
                echo deleteAllTickets();
            break;
            default:
                echo $msg;
        }
    }
    else if($_SERVER['REQUEST_METHOD'] == 'PUT') {
        //id number user for query; it is found in  the url ex: localhost:80/users/id if there is one
        $number = intval(preg_replace('/[^0-9]+/', '', $var));
        switch($var){
            //SET THE TICKET WITH THE GIVEN ID AS SERVED; RETURNS THE NUMBER OF AFFECTED ROWS (0 OR 1)
            case "ticketServed/$number":
                echo ticketHasBeenServed($number);
            break;
            //SET THE COUNTER WITH THE GIVEN ID AS FREE; RETURNS THE NUMBER OF AFFECTED ROWS.
            case "counterReady/$number":
                echo setCounterAsReady($number);
            break;
            default:
                echo $msg;
        }
    }
    else{
        echo $msg;
    }
}
else{
    echo $msg;
}
?>
