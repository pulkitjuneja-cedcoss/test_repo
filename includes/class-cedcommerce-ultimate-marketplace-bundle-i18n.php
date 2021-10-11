<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       cedcommerce.com
 * @since      1.0.0
 *
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/includes
 * @author     CedCommerce <plugins@cedcommerce.com>
 */
class Cedcommerce_Ultimate_Marketplace_Bundle_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'cedcommerce-ultimate-marketplace-bundle',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
