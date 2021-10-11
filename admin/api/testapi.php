<?php

require_once('./config.php');

$check_auth=ced_check_authorization();

if($check_auth){   // if Authorisation Success

    //  $client_validation = get_options('marketplace_verification');
    // echo json_encode($client_validation);

    echo json_encode( array( 'walmart' => false, 'facebook' => false, 'etsy'=> false ) );
}   
?>