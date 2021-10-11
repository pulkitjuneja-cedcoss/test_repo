<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       cedcommerce.com
 * @since      1.0.0
 *
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Cedcommerce_Ultimate_Marketplace_Bundle
 * @subpackage Cedcommerce_Ultimate_Marketplace_Bundle/admin
 * @author     CedCommerce <plugins@cedcommerce.com>
 */
class Cedcommerce_Ultimate_Marketplace_Bundle_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		session_start();
		ini_set( 'display_errors', 1 );
		ini_set( 'display_startup_errors', 1 );
		error_reporting( E_ALL );
		$this->plugin_name = $plugin_name;
		$this->version     = $version;

		add_action( 'admin_menu', array( $this, 'ced_add_extension_register_page' ) );
	}

	public function ced_add_extension_register_page() {
		if ( ! function_exists( 'wc_admin_register_page' ) ) {
			return;
		}

		wc_admin_register_page(
			array(
				'id'       => 'ced-sales-channel',
				'title'    => 'Sales Channel',
				'parent'   => 'woocommerce',
				'path'     => '/ced-sales-channel',
				'nav_args' => array(
					'order'  => 10,
					'parent' => 'woocommerce',
				),
			)
		);
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Cedcommerce_Ultimate_Marketplace_Bundle_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Cedcommerce_Ultimate_Marketplace_Bundle_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

				 // Add the Select2 CSS file
		wp_enqueue_style( 'select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), '4.1.0-rc.0' );

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cedcommerce-ultimate-marketplace-bundle-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Cedcommerce_Ultimate_Marketplace_Bundle_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Cedcommerce_Ultimate_Marketplace_Bundle_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// Add the Select2 JavaScript file
		wp_enqueue_script( 'select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', 'jquery', '4.1.0-rc.0' );

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cedcommerce-ultimate-marketplace-bundle-admin.js', array( 'jquery' ), $this->version, false );

		$ajax_nonce     = wp_create_nonce( 'ced-umb-ajax-seurity-string' );
		$localize_array = array(
			'ajax_url'   => admin_url( 'admin-ajax.php' ),
			'ajax_nonce' => $ajax_nonce,
		);
		wp_localize_script( $this->plugin_name, 'ced_umb_admin_obj', $localize_array );

	}

	/**
	 * Add admin menus and submenus
	 *
	 * @since    1.0.0
	 */
	public function ced_umb_add_cedcommerce_menu() {
		global $submenu;
		if ( empty( $GLOBALS['admin_page_hooks']['cedcommerce'] ) ) {
			add_menu_page( __( 'CEDCOMMERCE', 'cedcommerce-ultimate-marketplace-bundle' ), __( 'CEDCOMMERCE', 'cedcommerce-ultimate-marketplace-bundle' ), 'manage_woocommerce', 'cedcommerce', array( $this, 'ced_marketplace_dashboard' ), plugins_url( 'cedcommerce-ultimate-marketplace-bundle/admin/images/cedcommerce-logo.png' ), 12 );
			// Adding submenus
			$submenus = ced_umb_submenu_options();
			foreach ( $submenus as $key => $option ) {
				add_submenu_page( 'cedcommerce', $option, ucwords( $option ), 'manage_woocommerce', $option, array( $this, 'ced_marketplace_dashboard' ) );
			}
		}

	}

	/**
	 * CedCommerce initial dashboard.
	 *
	 * @since 1.0.0
	 */
	public function ced_marketplace_dashboard() {
		global $title;
		$path = CED_UMB_DIRPATH . 'admin/partials/ced-umb-' . esc_attr( $title ) . '.php';
		if ( 'cedcommerce' == strtolower( $title ) ) {
			$path = '';
		}
		?>
		<div class="ced-umb-wrapper">
			<?php
			ced_umb_load_template( $path );
			?>
		</div>
		<?php
	}

	/**
	 * CedCommerce initial dashboard.
	 *
	 * @since 1.0.0
	 */
	public function ced_umb_load_section( $page = '', $section = '' ) {
		$path = CED_UMB_DIRPATH . 'admin/sections/' . esc_attr( $page ) . '/' . esc_attr( $section ) . '.php';
		ced_umb_load_template( $path );
	}


	public function ced_umb_fetch_next_level_category() {
		$check_ajax = check_ajax_referer( 'ced-umb-ajax-seurity-string', 'ajax_nonce' );
		if ( $check_ajax ) {
			ini_set( 'max_execution_time', -1 );
			ini_set( 'memory_limit', -1 );
			$data               = '';
			$sanitize_post_data = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
			$cat_id             = isset( $sanitize_post_data['cat_id'] ) ? $sanitize_post_data['cat_id'] : '';
			$cat_name           = isset( $sanitize_post_data['cat_name'] ) ? $sanitize_post_data['cat_name'] : '';
			$level              = isset( $sanitize_post_data['level'] ) ? $sanitize_post_data['level'] : '';
			$next_level         = (int) $level + 1;

			$filepath = CED_UMB_URL . 'admin/cedcommerce/json/connector-mapping.json';
			$options  = array(
				'ssl' => array(
					'verify_peer'      => false,
					'verify_peer_name' => false,
				),
			);

			$cedcommerce_categories = @file_get_contents( $filepath, false, stream_context_create( $options ) );
			$cedcommerce_categories = json_decode( $cedcommerce_categories, true );
			$category_found         = false;

			$select_html  = '';
			$select_html .= "<tr class='ced_umb_category_wrap_level_" . esc_attr( $next_level ) . "' data-level='" . esc_attr( $next_level ) . "'><td data-level='" . esc_attr( $next_level ) . "' >";
			$select_html .= "<select class='ced_umb_level_" . esc_attr( $next_level ) . "_category ced_umb_category ced_umb_select2' data-level='" . esc_attr( $next_level ) . "'>";
			$select_html .= "<option value='0'>" . __( '--Select category--', CED_UMB_TEXT_DOMAIN ) . '</option>';

			foreach ( $cedcommerce_categories as $category_data ) {
				if ( isset( $category_data['level'] ) && $level == $category_data['level'] && 'cedcommerce' == strtolower( $category_data['marketplace'] ) && $cat_id == $category_data['marketplace_parent_id'] && isset( $category_data['full_path'] ) ) {
					$select_html   .= "<option value='" . esc_attr( $category_data['marketplace_id'] ) . "' data-path='" . esc_attr( $category_data['full_path'] ) . "'>" . __( str_replace( '_', '', $category_data['name'] ), CED_UMB_TEXT_DOMAIN ) . '</option>';
					$category_found = true;
				}
			}

			$select_html .= '</select></td></tr>';

			if ( $category_found ) {
				$data   = $select_html;
				$status = 200;
			} else {
				$status = 300;
			}

			echo json_encode(
				array(
					'status'   => $status,
					'response' => $data,
				)
			);
			wp_die();
		}
	}

	public function ced_umb_fetch_marketplace_categories() {
		$check_ajax = check_ajax_referer( 'ced-umb-ajax-seurity-string', 'ajax_nonce' );
		if ( $check_ajax ) {
			ini_set( 'max_execution_time', -1 );
			ini_set( 'memory_limit', -1 );
			$data               = '';
			$sanitize_post_data = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
			$cat_id             = isset( $sanitize_post_data['cat_id'] ) ? $sanitize_post_data['cat_id'] : '';
			$filepath           = CED_UMB_URL . 'admin/cedcommerce/json/connector-mapping.json';
			$options            = array(
				'ssl' => array(
					'verify_peer'      => false,
					'verify_peer_name' => false,
				),
			);

			$cedcommerce_categories       = @file_get_contents( $filepath, false, stream_context_create( $options ) );
			$cedcommerce_categories       = json_decode( $cedcommerce_categories, true );
			$this->cedcommerce_categories = $cedcommerce_categories;
			$category_found               = false;

			foreach ( $cedcommerce_categories as $category_data ) {
				if ( 'cedcommerce' == strtolower( $category_data['marketplace'] ) && $cat_id == $category_data['marketplace_id'] && isset( $category_data['full_path'] ) ) {
					$marketplace_categories = isset( $category_data['mapping'] ) ? $category_data['mapping'] : array();
					if ( ! empty( $marketplace_categories ) ) {
						$select_html    = $this->prepare_marketplace_category_data( $marketplace_categories );
						$category_found = true;
					}
					break;
				}
			}

			if ( $category_found ) {
				$data   = $select_html;
				$status = 200;
			} else {
				$status = 300;
			}

			echo json_encode(
				array(
					'status'   => $status,
					'response' => $data,
				)
			);
			wp_die();
		}
	}

	public function prepare_marketplace_category_data( $marketplace_categories ) {
		$select_html = '';
		foreach ( $marketplace_categories as $marketplace => $categories ) {
			$select_html .= '<label>' . esc_attr( ucwords( $marketplace ) ) . '</label>';
			$select_html .= '<select class="ced_umb_marketplace_category ced_umb_select2" data-marketplace="' . esc_attr( $marketplace ) . '">';
			foreach ( $categories as $cat_id ) {
				$category_data = $this->get_category_data( $cat_id );
				$select_html  .= "<option value='" . esc_attr( $category_data['marketplace_id'] ) . "'>" . __( str_replace( '_', '', $category_data['custom_category_path'] ), CED_UMB_TEXT_DOMAIN ) . '</option>';
			}
			$select_html .= '</select>';
		}
		return $select_html;
	}

	public function get_category_data( $cat_id = '' ) {
		foreach ( $this->cedcommerce_categories as $category_data ) {
			if ( isset( $category_data['_id']['$oid'] ) && $cat_id == $category_data['_id']['$oid'] ) {
				return $category_data;
			}
		}
		return false;
	}

	public function ced_umb_save_mapping() {
		$check_ajax = check_ajax_referer( 'ced-umb-ajax-seurity-string', 'ajax_nonce' );
		if ( $check_ajax ) {
			$sanitize_post_data         = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
			$marketplace_cat_info       = isset( $sanitize_post_data['marketplace_cat_info'] ) ? $sanitize_post_data['marketplace_cat_info'] : array();
			$this->cedcommerce_category = isset( $marketplace_cat_info['cedcommerce'] ) ? $marketplace_cat_info['cedcommerce'] : array();
			unset( $marketplace_cat_info['cedcommerce'] );
			$this->marketplace_category = isset( $marketplace_cat_info ) ? $marketplace_cat_info : array();
			$this->ced_category         = isset( $this->cedcommerce_category['cat_id'] ) ? $this->cedcommerce_category['cat_id'] : '';
			$this->woo_cat_ids          = isset( $sanitize_post_data['woo_cat_ids'] ) ? $sanitize_post_data['woo_cat_ids'] : array();
			$this->profile_data         = array();

			$this->profile_info = $this->prepare_profile_info();

			$profile_id = $this->insert_profile();

			foreach ( $this->woo_cat_ids as $term_id ) {
				update_term_meta( $term_id, 'ced_umb_category_mapped', 'yes' );
				update_term_meta( $term_id, 'ced_umb_profile_id', $profile_id );
				update_term_meta( $term_id, 'ced_umb_marketplace_category', $this->marketplace_category );
			}
		}
	}

	public function prepare_profile_info() {
		$profile_info = array(
			'profile_name'           => json_encode( $this->cedcommerce_category ),
			'profile_data'           => json_encode( $this->profile_data ),
			'marketplace_categories' => json_encode( $this->marketplace_category ),
			'woo_categories'         => json_encode( $this->woo_cat_ids ),
			'ced_category'           => json_encode( $this->ced_category ),
		);
		return $profile_info;
	}

	public function insert_profile() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'ced_umb_profiles';
		$wpdb->insert( $table_name, $this->profile_info );
		$profile_id = $wpdb->insert_id;
		return $profile_id;
	}

	public function ced_umb_connect_marketplace() {
		$check_ajax = check_ajax_referer( 'ced-umb-ajax-seurity-string', 'ajax_nonce' );
		if ( $check_ajax ) {
			$sanitize_post_data = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
			$marketplace        = isset( $sanitize_post_data['marketplace'] ) ? $sanitize_post_data['marketplace'] : '';
			// $input_required = ced_umb_input_required( $marketplace );
			$input_required = false;
			if ( $input_required ) {
				$display_fields = get_configuration_fields_if_required( $marketplace );
				if ( $display_fields ) {
					$html = $this->ced_umb_render_fields( $display_fields );
					echo json_encode(
						array(
							'status' => 200,
							'html'   => $html,
						)
					);
				}
			}
			echo json_encode(
				array(
					'status' => 400,
				)
			);
			wp_die();
		}
	}

	public function ced_umb_render_fields( $fields = array() ) {
		if ( empty( $fields ) ) {
			return;
		}
		$html  = '';
		$html .= "<table class='ced_umb_mapping_table'>";
		foreach ( $fields as $info ) {
			$html .= '<tr>';
			$type  = isset( $info['type'] ) ? $info['type'] : 'text';
			switch ( $type ) {
				case 'text':
					$html .= $this->display_text_field( $info );
					break;
			}
			$html .= '</tr>';
		}
		$html .= '</table>';
		return $html;
	}

	public function display_text_field( $info = array() ) {

		$html  = '';
		$html .= '<td><label>' . $info['fields']['label'] . '<label></td>';
		$html .= "<td><input type='text' name='' id='" . $info['id'] . "'></td>";
		return $html;

	}



}
