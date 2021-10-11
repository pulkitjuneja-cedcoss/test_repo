<?php require_once CED_UMB_DIRPATH . 'admin/marketplaces/etsy/lib/vendor/http.php'; ?>
<?php require_once CED_UMB_DIRPATH . 'admin/marketplaces/etsy/lib/vendor/oauth_client.php'; ?>
<?php
unset( $_SESSION['OAUTH_ACCESS_TOKEN'] );
if ( session_status() == PHP_SESSION_NONE ) {
	session_start();
}
$client                   = new oauth_client_class();
$client->debug        = true;
$client->debug_http   = true;
$client->server       = 'Etsy';
$client->redirect_uri = admin_url( 'admin.php?page=configuration' );

$application_line      = __LINE__;
$client->client_id     = 'ghvcvauxf2taqidkdx2sw4g4';
$client->client_secret = '27u2kvhfmo';

if ( strlen( $client->client_id ) != 0 || strlen( $client->client_secret ) != 0 ) {
	$success = $client->Initialize();
	if ( $success ) {
		$client->Process();
	}
}

if( isset( $_GET['oauth_token'] ) && isset( $_GET['oauth_verifier'] ) ) {

 require_once CED_UMB_DIRPATH . 'admin/marketplaces/etsy/lib/vendor/http.php';
 require_once CED_UMB_DIRPATH . 'admin/marketplaces/etsy/lib/vendor/oauth_client.php';

$client                   = new oauth_client_class();
$client->debug        = true;
$client->debug_http   = true;
$client->server       = 'Etsy';
$client->redirect_uri = admin_url( 'admin.php?page=configuration' );

$application_line      = __LINE__;
$client->client_id     = 'ghvcvauxf2taqidkdx2sw4g4';
$client->client_secret = '27u2kvhfmo';
	// var_dump($_SESSION);
	$success = $client->CallAPI( "https://openapi.etsy.com/v2/shops/GoApple/" , 'GET', array(), array( 'FailOnAccessError' => true ), $user_details );
	var_dump($success);
	print_r($user_details);die;
}


