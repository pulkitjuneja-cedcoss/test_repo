<?php

/** Load templates */
if ( ! function_exists( 'ced_umb_load_template' ) ) {
	function ced_umb_load_template( $path = '' ) {
		if ( empty( $path ) ) {
			$path = CED_UMB_DIRPATH . 'admin/partials/cedcommerce-ultimate-marketplace-bundle-admin-display.php';
		}
		if ( file_exists( $path ) ) {
			load_template( $path, true, array() );
			return true;
		}
		return false;
	}
}


/** Page sections */
if ( ! function_exists( 'ced_umb_page_sections' ) ) {
	function ced_umb_page_sections( $page = '' ) {
		$sections['mapping'] = array(
			'category',
			// 'attribute',
			'general',
		);
		$sections            = apply_filters(
			'ced_umb_page_sections',
			$sections
		);
		return isset( $sections[ $page ] ) ? $sections[ $page ] : array();
	}
}

/** Display instruction */
if ( ! function_exists( 'ced_umb_instruction' ) ) {
	function ced_umb_instruction( $instruction = '' ) {
		print_r( "</br><span class='cedcommerce-tip'>[ $instruction ]</span>" );
	}
}

/** Display ced_umb_header */
if ( ! function_exists( 'ced_umb_header' ) ) {
	function ced_umb_header() {
		$path = CED_UMB_DIRPATH . 'admin/partials/ced-umb-header.php';
		ced_umb_load_template( $path );
	}
}

/** ced_umb_read_json */
if ( ! function_exists( 'ced_umb_read_json' ) ) {
	function ced_umb_read_json( $path = '' ) {
		if ( file_exists( $path ) ) {
			$content = @file_get_contents( $path );
			return json_decode( $content, true );
		}
		return false;
	}
}

/** ced_umb_get_marketplaces */
if ( ! function_exists( 'ced_umb_get_marketplaces' ) ) {
	function ced_umb_get_marketplaces() {
		$marketplaces = array(
			'etsy',
			'walmart',
			'facebook',
			'google',
		);
		return $marketplaces;
	}
}

/** get_configuration_fields_if_required */
if ( ! function_exists( 'get_configuration_fields_if_required' ) ) {
	function get_configuration_fields_if_required( $marketplace = '' ) {
		$configuration_fieds['etsy'] = array(
			array(
				'type'     => 'text',
				'id'       => '_ced_etsy_shop_name',
				'fields'   => array(
					'id'          => '_ced_etsy_shop_name',
					'label'       => __( 'Etsy shop name', 'kogan-integration-for-woocommerce' ),
					'desc_tip'    => true,
					'description' => array(
						'Enter your Etsy shop name.It must be exactly as on Etsy .Click <a class="get_etsy_sop_name" href="https://www.etsy.com/your/shops/me?ref=seller-platform-mcnav" target="#"><i>[ Get Shop Name -> ]</i></a> to view Etsy shop name.' .
						'Click on the "Authorize" button which will redirect you to <b>"https://openapi.etsy.com/v2".</b>',
						'On the etsy authorization page you have to log in with your seller login details.' .
						'You have to then click on "Allow Access" button to enable access to API.',
					),
					'type'        => 'text',
					'class'       => 'wc_input_price ced_umb_config_fields',
				),
				'required' => true,
			),
		);

		return isset( $configuration_fieds[ $marketplace ] ) ? $configuration_fieds[ $marketplace ] : array();
	}
}
