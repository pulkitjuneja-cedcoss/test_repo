<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


function ced_check_authorization(){
	
	if($_SERVER['HTTP_AUTHORIZATION']){
		header("HTTP/1.1 200 OK");
		http_response_code(200);
		return true;
	}else{
		header("HTTP/1.1 400 Not Authorised");
		http_response_code(400);
		return false;
	}

}


?>