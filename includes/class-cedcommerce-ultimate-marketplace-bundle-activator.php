<?php

/**
 * Fired during plugin activation
 *
 * @link       cedcommerce.com
 * @since      1.0.0
 *
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/includes
 * @author     CedCommerce <plugins@cedcommerce.com>
 */
class Cedcommerce_Ultimate_Marketplace_Bundle_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

		global $wpdb;

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$table_name = $wpdb->prefix . 'ced_umb_profiles';

		$create_profile_table =
			"CREATE TABLE $table_name (
			id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			profile_name VARCHAR(255) NOT NULL,
			ced_category VARCHAR(255) NOT NULL,
			profile_data TEXT DEFAULT NULL,
			marketplace_categories TEXT DEFAULT NULL,
			woo_categories TEXT DEFAULT NULL,
			PRIMARY KEY (id)
		);";
		dbDelta( $create_profile_table );

	}

}
