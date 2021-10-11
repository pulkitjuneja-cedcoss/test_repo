<?php

$filepath = CED_UMB_URL . 'admin/cedcommerce/json/connector-mapping.json';

$options = array(
	'ssl' => array(
		'verify_peer'      => false,
		'verify_peer_name' => false,
	),
);

$cedcommerce_categories = @file_get_contents( $filepath, false, stream_context_create( $options ) );
$cedcommerce_categories = json_decode( $cedcommerce_categories, true );
?>

<div class="ced_umb_content">
	<div class="ced_umb_mapping_wrap">
	<div class="ced_umb_mapping_child_element">
		<label class="ced_umb_label"><?php esc_html_e( 'Choose Marketplace Category', CED_UMB_TEXT_DOMAIN ); ?></label>
		<?php
		$instruction = 'Please choose the marketplace category in which you want to list your WooCommerce store products.';
		ced_umb_instruction( $instruction );
		?>
	</div>
	<div class="ced_umb_mapping_child_element">
		<table class="ced_umb_category_wrap">
			<tr class="ced_umb_category_wrap_level_1" data-level="1">
				<td data-level="1" >
					<select class="ced_umb_level_1_category ced_umb_category ced_umb_select2" data-level="1">
						<option value="0"><?php esc_html_e( '--Select category--', CED_UMB_TEXT_DOMAIN ); ?></option>
						<?php
						foreach ( $cedcommerce_categories as $category_data ) {
							if ( isset( $category_data['level'] ) && ( 0 == $category_data['level'] || '0' == $category_data['level'] ) && 'cedcommerce' == strtolower( $category_data['marketplace'] ) && isset( $category_data['full_path'] ) ) {
								?>
								<option value="<?php echo esc_attr( $category_data['marketplace_id'] ); ?>" data-path="<?php echo esc_attr( $category_data['full_path'] ); ?>"><?php esc_html_e( str_replace( '_', '', $category_data['name'] ), CED_UMB_TEXT_DOMAIN ); ?></option>
								<?php
							}
						}
						?>
					</select>
				</td>
			</tr>
		</table>
	</div>
	
</div>
<div class="ced_umb_category_suggestion_wrap"> 
	<div class="ced_umb_mapping_child_element">
		<label><?php esc_html_e( 'Choose WooCommerce Categories' ); ?></label>
		<?php

		$woo_categories = get_terms( 'product_cat', array( 'hide_empty' => true ) );
		if ( ! empty( $woo_categories ) ) {
			?>
				<select class="ced_umb_woo_categories ced_umb_select2" multiple="">
			<?php
			foreach ( $woo_categories as $cat_info ) {
				?>
				<option value="<?php echo esc_attr( $cat_info->term_id ); ?>"><?php esc_html_e( $cat_info->name ); ?></option>
				<?php
			}

			?>
			</select>
			<?php
		}

		?>
	</div>
	<div class="ced_umb_mapping_child_element ced_umb_marketplace_categories">		
	</div>
</div>
	<div class="ced_umb_save_button ced_umb_mapping_save_button">
		<button class="button-primary" id="ced_umb_save_mapping"><?php esc_html_e( 'Save mapping', CED_UMB_TEXT_DOMAIN ); ?></button>
		<a class="button-primary" href=""><?php esc_html_e( 'Cancel mapping', CED_UMB_TEXT_DOMAIN ); ?></a>
	</div>
</div>

	<?php

	$path = CED_UMB_DIRPATH . 'admin/lists/class-category-mapping-list.php';
	ced_umb_load_template( $path );




