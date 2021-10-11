<?php

/**
 * Plugin Name:     Ced Unified Dashboard
 * Plugin URI:      https://cedcommerce.com/
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          CEDCOMMERCE
 * Author URI:      https://cedcommerce.com/
 * Text Domain:     ced-unified-dashboard
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Ced_Unified_Dashboard
 */

require_once('./config.php');
// require '../../ced-unified-dashboard.php';

$check_auth=ced_check_authorization();

if($check_auth){  // if Authorisation Success

//  echo  plugin_dir_url( __FILE__ ) ;
  //  $b= CED_UMB_DIRPATH ;
  //  echo CED_UMB_DIRPATH;

    $domain=isset($_POST['domain']) ? $_POST['domain'] : '';
    $email_id=isset($data['email_id']) ? $_POST['email_id'] : '';
    $marketplace=isset($_POST['marketplace']) ? $_POST['marketplace'] : '' ;
    $auth_key=isset($_POST['auth_key']) ? $_POST['auth_key'] : '';

    // check client verification code here  

     // $client_validation = get_options('marketplace_verification');

      // if(validation){
      //       // $client_validation[$marketplace] = true;     
      // } else{
      //       // $client_validation[$marketplace] = false;  
      // }                      

    // check client verification code here  


    echo json_encode(array( 'walmart' => true, 'facebook' => false, 'etsy'=> false ));
}   
?>