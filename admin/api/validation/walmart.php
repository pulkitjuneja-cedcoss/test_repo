<?php

require_once('../config.php');
require_once '../../../../../../wp-blog-header.php';


$check_auth=ced_check_authorization();

if($check_auth){// if Authorisation Success

	if(isset($_REQUEST['check']) && $_REQUEST['check']==true) {
		$ced_walmart_configuration_details = get_option( 'ced_unified_walmart_configuration_details', array() );

		$client_id                         = isset( $ced_walmart_configuration_details['client_id'] ) ? $ced_walmart_configuration_details['client_id'] : '';
		$client_secret                     = isset( $ced_walmart_configuration_details['client_secret'] ) ? $ced_walmart_configuration_details['client_secret'] : '';
		$environment                       = isset( $ced_walmart_configuration_details['environment'] ) ? $ced_walmart_configuration_details['environment'] : '';
		$is_details_saved=get_option( 'ced_unified_walmart_configuration_details_saved', true );

		if($is_details_saved && !empty(	$ced_walmart_configuration_details ) && isset($ced_walmart_configuration_details) ){

			echo json_encode(
				array(
					'status'  => 200,
					"walmart_client_id"=>$client_id,
					"walmart_client_secret"=>$client_secret,
					"walmart_environment"=>$environment ,
					"walmart_is_details_saved"=>$is_details_saved
				)
			);
		} else {
			echo json_encode(
				array(
					'status'  => 400,
					'message' => "Client Id and Secret key not found"
				)
			);
		}

	} else {
		$data = json_decode(file_get_contents("php://input"),true);
		$walmart_clientID=isset($data['client_id']) ? $data['client_id'] : "";
		$walmart_clientSecret=isset($data['secret_key']) ? $data['secret_key'] :"";
		$walmart_enviornment=isset($data['enviornment']) ? $data['enviornment']:"sandbox";

		if(empty($walmart_clientID)){
			echo "Walmart Client ID is Empty";
			return;
		}

		if(empty($walmart_clientSecret)){
			echo "Walmart Client Secretkey is Empty";
			return;
		}

		if(isset($walmart_clientID) && isset($walmart_clientSecret) ){
			$status                            = 400;
			$message                           = 'Some error occured';


			$environment                       = $walmart_enviornment;
			$channel_id                        ='7b2c8dab-c79c-4cee-97fb-0ac399e17ade';

			$ced_walmart_configuration_details = array(
				'client_id'     => $walmart_clientID,
				'client_secret' => $walmart_clientSecret,
				'channel_id'    => $channel_id,
				'environment'   => $environment,
			);

			$action     = 'token';
			$parameters = 'grant_type=client_credentials';
			$response   = ced_unified_walmart_get_request( $action, $parameters ,$walmart_clientID,$walmart_clientSecret,$walmart_enviornment);
			$token      = isset( $response['access_token'] ) ? $response['access_token'] : '';
			$expries_in = isset( $response['expires_in'] ) ? $response['expires_in'] : '';
			if ( ! empty( $token ) ) {
				update_option( 'ced_unified_walmart_token', $token );
				set_transient( 'ced_unified_walmart_token_transient', $token, $expries_in );
				update_option( 'ced_unified_walmart_configuration_details', $ced_walmart_configuration_details );
				update_option( 'ced_unified_walmart_configuration_details_saved', true );
				$status  = 200;
				$message = 'Credentials validated successfully';
			} elseif ( isset( $response['errors'] ) ) {
				$status  = 400;
				$message = isset( $response['errors']['error']['description'] ) ? $response['errors']['error']['description'] : '';
			} elseif ( isset( $response['error'][0] ) ) {
				$status  = 400;
				$message = isset( $response['error'][0]['description'] ) ? $response['error'][0]['description'] : '';
			}
			echo json_encode(
				array(
					'status'  => $status,
					'message' => $message
				)
			);
		}


	}


	

}


// Function for sending curl request for validation

function ced_unified_walmart_get_request( $action = '', $parameters = '', $walmart_clientID='',$walmart_clientSecret='',$walmart_enviornment='') {
	if ( empty( $action ) ) {
		return;
	}
	$headers[] = 'Authorization: Basic ' . base64_encode( $walmart_clientID . ':' . $walmart_clientSecret);
	$headers[] = 'WM_SVC.NAME: Walmart Marketplace';
	$headers[] = 'WM_QOS.CORRELATION_ID: ' . base64_encode( uniqid() );
	$headers[] = 'Accept: application/json';
	$headers[] = 'WM_SVC.VERSION: 1.0.0';
	$headers[] = 'Content-Type: application/x-www-form-urlencoded';

	if( 'sandbox' == $walmart_enviornment){
		$end_point_url="https://sandbox.walmartapis.com/v3/";
	}else {
		$end_point_url="https://marketplace.walmartapis.com/v3/";
	}
	$api_url = $end_point_url . $action;
	$connection = curl_init();
	curl_setopt( $connection, CURLOPT_URL, $api_url );
	curl_setopt( $connection, CURLOPT_HTTPHEADER, array_unique( $headers ) );
	curl_setopt( $connection, CURLOPT_SSL_VERIFYPEER, 0 );
	curl_setopt( $connection, CURLOPT_ENCODING, '' );
	if ( ! empty( $parameters ) ) {
		curl_setopt( $connection, CURLOPT_POST, 1 );
		curl_setopt( $connection, CURLOPT_POSTFIELDS, $parameters );
	}
	curl_setopt( $connection, CURLOPT_RETURNTRANSFER, 1 );
	$response = curl_exec( $connection );
	$error    = curl_error( $connection );
	if ( $error ) {
		return  $error;
	}
	curl_close( $connection );
	if(! empty( $response )){
		$response = json_decode( $response,true );
		return $response;
	}
	
}

?>
