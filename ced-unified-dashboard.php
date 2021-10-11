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


/* DEFINE CONSTANTS */
define( 'CED_UNIFIED_DASHBOARD_URL', plugin_dir_url( __FILE__ ) );
define( 'CED_UNIFIED_DASHBOARD_PATH', plugin_dir_path( __FILE__ ) );

/** Dynamic .env file creation */
function ced_create_env() {
	$base_url=CED_UNIFIED_DASHBOARD_URL;
	$base_path=CED_UNIFIED_DASHBOARD_PATH;
	$site_url=get_site_url();
	$admin_email=get_option('admin_email');
	$file = CED_UNIFIED_DASHBOARD_PATH.'.env';
	$contents = 'REACT_APP_APP_URL='.$base_url.PHP_EOL;
	$contents.= 'REACT_APP_SITE_URL='.$site_url.PHP_EOL;     
	$contents.= 'REACT_APP_ADMIN_EMAIL='.$admin_email;           // Some simple example content.
	file_put_contents($file, $contents);     // Save our content to the file.
	}
	
register_activation_hook( __FILE__, 'ced_create_env' );


/** Submnenu options */
if ( ! function_exists( 'ced_umb_submenu_options' ) ) {
	function ced_umb_submenu_options() {
		$submenus = apply_filters(
			'ced_umb_submenu_options',
			array(
				'configuration',
				'mapping',
				'templates',
				'products',
				'orders',
				'logs',
			)
		);
		return $submenus;
	}
} 

/**
 * Register a Sales Channel menu page.
 */
function ced_register_sales_channel_menu_page(){
    add_menu_page( 
        __( 'Sales Channel', 'ced-unified-dashboard' ),
        'Cedcommerce Sales Channel',
        'manage_options',
        'ced_sales_channel',
        'ced_sales_channel_menu_page',
		'dashicons-cart',
        30
    ); 
	$submenus = ced_umb_submenu_options();
	foreach ( $submenus as $key => $option ) {
		add_submenu_page( 'ced_sales_channel', $option, ucwords( $option ), 'manage_woocommerce', $option, 'ced_marketplace_dashboard'  );
	}
}
add_action( 'admin_menu', 'ced_register_sales_channel_menu_page' );


/**
 * Display a submenu page
 */
function ced_marketplace_dashboard(){
	global $title;
	echo "<div class='ced-main-" . $title . "-page' data-ajax=".admin_url('admin-ajax.php')."></div>";
  }

/**
 * Display a Ced Sales Channel menu page
 */
function ced_sales_channel_menu_page(){
	echo "<div class='ced-main-wrap-sales-channel' data-ajax=".admin_url('admin-ajax.php')."></div>";
}
// Setting hook to load files.


add_action('admin_enqueue_scripts','ced_load_react_app');

/**
 * Load react app files in WordPress admin.
 *
 * @return bool|void
 */
function ced_load_react_app($hook){



	// $is_main_dashboard = $hook === 'index.php';
    // $_REQUEST['page']='';
	// // Only load react app scripts in main admin page.
	// if( !$_REQUEST['page']=="cedcommerce-integrations")
	// 	return;

	// Setting path variables.
	$plugin_app_dir_url =plugin_dir_url( __FILE__ );
	$react_app_build = $plugin_app_dir_url .'build/';
	$manifest_url = $react_app_build. 'asset-manifest.json';

	// Request manifest file.
	$request = file_get_contents( $manifest_url );

	// If the remote request fails, wp_remote_get() will return a WP_Error, so let’s check if the $request variable is an error:
	if( !$request )
		return false;

	// Convert json to php array.
	$files_data = json_decode($request);
	if($files_data === null)
		return ;

	if(!property_exists($files_data,'entrypoints'))
		return false;

	// Get assets links.
	$assets_files = $files_data->entrypoints;

	$js_files = array_filter($assets_files,'rp_filter_js_files');
	$css_files = array_filter($assets_files,'rp_filter_css_files');

	// Load css files.
	foreach ($css_files as $index => $css_file){
		wp_enqueue_style('ced-unified-dashboard-'.$index, $react_app_build . $css_file);
	}

	// Load js files.
	foreach ($js_files as $index => $js_file){
		wp_enqueue_script('ced-unified-dashboard-'.$index, $react_app_build . $js_file, array(), 1, true);
	}
	$ced_marketplaces = array(
		'walmart'=> array(
			'exists'=>false,
			'card_image_link'=>'walmart-card.png',
		),
		'etsy'=> array(
			'exists'=>false,
			'card_image_link'=>'etsy-card.png',
		),
		'amazon'=> array(
			'exists'=>false,
			'card_image_link'=>'amazon-card.png',
		),
		'google'=> array(
			'exists'=>false,
			'card_image_link'=>'google-card.png',
		),
		'ebay'=> array(
			'exists'=>false,
			'card_image_link'=>'ebay-card.png',
		),
	);

	foreach($ced_marketplaces as $marketplace => $data) {
		if ( in_array( 'walmart-integration-for-woocommerce/'. $marketplace .'-woocommerce-integration.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
			$ced_marketplaces[$marketplace]['exists'] = true;
		}

	}
	// Variables for app use.
	wp_localize_script('ced-unified-dashboard-0', 'cedReactApp',
		array(
			'appSelector' => '#wpbody .ced-main-wrap-sales-channel',
			'apiUrl' => site_url(),
			'apiPath' => CED_UNIFIED_DASHBOARD_URL,
			'marketplaces' => $ced_marketplaces
		)
	);
}

/**
 * Get js files from assets array.
 *
 * @param array $file_string
 *
 * @return bool
 */
function rp_filter_js_files ($file_string){
  return pathinfo($file_string, PATHINFO_EXTENSION) === 'js';
}

/**
 * Get css files from assets array.
 *
 * @param array $file_string
 *
 * @return bool
 */
function rp_filter_css_files ($file_string) {
	return pathinfo( $file_string, PATHINFO_EXTENSION ) === 'css';
}