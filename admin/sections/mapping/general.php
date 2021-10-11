<?php

$path = CED_UMB_DIRPATH . 'admin/cedcommerce/json/product-general-attributes.json';

$general_attribues = apply_filters( 'ced_umb_general_attributes', ced_umb_read_json( $path ) );

if ( is_array( $general_attribues ) && ! empty( $general_attribues ) ) {
	echo "<table class='ced_umb_mapping_table'>";
	echo '<tr>';
	echo '<th>' . __( 'Marketplace Field', CED_UMB_TEXT_DOMAIN ) . '</th>';
	echo '<th>' . __( 'Default Value', CED_UMB_TEXT_DOMAIN ) . '</th>';
	echo '<th>' . __( 'Your Online Store Field', CED_UMB_TEXT_DOMAIN ) . '</th>';
	echo '</tr>';
	foreach ( $general_attribues as $label => $field_info ) {
		echo '<tr>';
		switch ( $field_info['type'] ) {
			case 'text':
				display_text_field( $field_info );
				break;

			default:
				// code...
				break;
		}
		echo '</tr>';
	}
	echo '</table>';
}


function display_text_field( $field_info = array() ) {
	$attributes      = wc_get_attribute_taxonomies();
	$attr_options    = array();
	$added_meta_keys = get_option( 'ced_umb_selected_metakeys', array() );
	$terms           = get_taxonomies( array(), 'objects' );
	if ( $added_meta_keys && count( $added_meta_keys ) > 0 ) {
		foreach ( $added_meta_keys as $meta_key ) {
			$attr_options['custom fields'][ $meta_key ] = $meta_key;
		}
	}
	if ( ! empty( $attributes ) ) {
		foreach ( $attributes as $attributes_object ) {
			$attr_options['global attributes'][ 'umb_pattr_' . $attributes_object->attribute_name ] = $attributes_object->attribute_label;
		}
	}
	?>
	<td><label class="ced_umb_mapping_label"><?php esc_html_e( ucwords( $field_info['label'] ), 'CED_UMB_TEXT_DOMAIN' ); ?></label>
		<?php
		if ( /* !$field_info['required'] */ false ) {
			?>
			<span class="ced_umb_required"><?php esc_html_e( '[ Required ]', CED_UMB_TEXT_DOMAIN ); ?></span>
			<?php
		}
		?>
	</td>
	<td><input type="text" name="ced_umb_general_attributes[<?php echo esc_attr( $field_info['ced_umb_id'] ); ?>]"></td>
	<td>

	<select id="" name="" multiple="" class="ced_umb_select2">
		<?php
		if ( is_array( $attr_options ) ) {
			foreach ( $attr_options as $attr_key => $attr_info ) {
				echo "<optgroup label='" . esc_attr( ucwords( $attr_key ) ) . "'>";
				foreach ( $attr_info as $key => $attr_name ) {

					?>
				<option value="<?php echo esc_attr( $key ); ?>"><?php echo esc_attr( $attr_name ); ?></option>
					<?php

				}
				echo '</optgroup>';
			}
		}
		?>
	</select>
</td>
	<?php
}
