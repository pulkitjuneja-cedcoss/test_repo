<?php
if ( ! class_exists( 'Category_Mapping_List' ) ) {

	if ( ! defined( 'ABSPATH' ) ) {
		die;
	}

	if ( ! class_exists( 'WP_List_Table' ) ) {
		include_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
	}
	/**
	 *
	 */
	class Category_Mapping_List extends WP_List_Table {

		public function __construct() {
			parent::__construct(
				array(
					'singular' => __( 'Profile', CED_UMB_TEXT_DOMAIN ),
					'plural'   => __( 'Profiles', CED_UMB_TEXT_DOMAIN ),
					'ajax'     => false,
				)
			);

		}

		public function prepare_items() {
			global $wpdb;
			$per_page = apply_filters( 'ced_umb_mapping_list', 10 );
			$columns  = $this->get_columns();
			$hidden   = array();
			$sortable = $this->get_sortable_columns();

			$this->_column_headers = array( $columns, $hidden, $sortable );

			$current_page = $this->get_pagenum();
			if ( 1 < $current_page ) {
				$offset = $per_page * ( $current_page - 1 );
			} else {
				$offset = 0;
			}

			$this->items = self::get_mapping_list( $per_page, $current_page );

			$count = self::get_count();

			if ( ! $this->current_action() ) {
				$this->set_pagination_args(
					array(
						'total_items' => $count,
						'per_page'    => $per_page,
						'total_pages' => ceil( $count / $per_page ),
					)
				);
				$this->render_html();
			} else {
				$this->process_bulk_action();
			}

		}

		public function get_count() {
			global $wpdb;
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}ced_umb_profiles WHERE %d", 1 ), 'ARRAY_A' );
			return count( $result );
		}

		public function get_mapping_list( $per_page, $current_page ) {
			global $wpdb;
			$offset = ( $current_page - 1 ) * $per_page;
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}ced_umb_profiles WHERE %d ORDER BY `id` DESC LIMIT %d OFFSET %d", 1, $per_page, $offset ), 'ARRAY_A' );
			return $result;
		}


		public function no_items() {
			esc_html_e( 'No mapping found.', CED_UMB_TEXT_DOMAIN );
		}

		public function column_cb( $item ) {

			return sprintf(
				'<input type="checkbox" name="ced_umb_profile-ids[]" value="%s" />',
				$item['id']
			);

		}

		public function column_ced_category( $item ) {
			$profile_name = isset( $item['profile_name'] ) ? json_decode( $item['profile_name'], true ) : array();
			return isset( $profile_name['cat_name'] ) ? '<p>' . $profile_name['cat_name'] . '</p>' : '';
		}

		public function column_marketplace_categories( $item ) {
			$marketplace_categories = isset( $item['marketplace_categories'] ) ? json_decode( $item['marketplace_categories'], true ) : array();
			if ( ! empty( $marketplace_categories ) ) {
				foreach ( $marketplace_categories as $marketplace => $category_info ) {
					echo '<p>' . ucwords( $marketplace ) . ' : ' . ( isset( $category_info['cat_name'] ) ? $category_info['cat_name'] : '' ) . '</p>';
				}
			}
		}

		public function column_woo_category( $item ) {
			$woo_categories = isset( $item['woo_categories'] ) ? json_decode( $item['woo_categories'], true ) : array();
			foreach ( $woo_categories as $term_id ) {
				echo '<p>' . esc_attr( get_the_category_by_ID( $term_id ) ) . '</p>';
			}
		}

		public function get_columns() {
			$columns = array(
				'cb'                     => '<input type="checkbox" />',
				'ced_category'           => __( 'CedCommerce category', CED_UMB_TEXT_DOMAIN ),
				'marketplace_categories' => __( 'Marketplace categories', CED_UMB_TEXT_DOMAIN ),
				'woo_category'           => __( 'WooCommerce categories', CED_UMB_TEXT_DOMAIN ),
			);

			$columns = apply_filters( 'ced_umb_category_mapping_columns', $columns );
			return $columns;
		}

		public function render_html() {
			$this->display();
		}

	}

	$list_obj = new Category_Mapping_List();
	$list_obj->prepare_items();
}
