<?php
global $title;
ced_umb_header();
if( isset($_POST['ced_umb_connect_marketplace'])  ) {
	$sanitize_post_data = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
	$marketplace = $_POST['ced_umb_connect_marketplace'];
	$path = CED_UMB_DIRPATH . 'admin/marketplaces/' . esc_attr( $marketplace ) . '/lib/authorisation.php';
	ced_umb_load_template( $path );
}

?>

<h2 class="ced_umb_uppercase ced_umb_page_heading"><?php esc_html_e( $title, CED_UMB_TEXT_DOMAIN ); ?></h2>
<select id="ced_umb_marketplaces">
	<option><?php esc_html_e( '--Select marketplace--' ); ?></option>
	<?php
	$marketplaces = ced_umb_get_marketplaces();
	if ( ! empty( $marketplaces ) ) {
		foreach ( $marketplaces as $marketplace ) {
			echo '<option value=' . esc_attr( $marketplace ) . '>' . __( ucwords( $marketplace ) ) . '</option>';
		}
	}
	?>
</select>
<div id="ced_umb_display_config_fields"></div>
<form method="post">
	<button type="submit" class="button-primary" id="ced_umb_connect_marketplace" name="ced_umb_connect_marketplace" value=""><?php esc_html_e( 'Connect with store', CED_UMB_TEXT_DOMAIN ); ?></button>
</form>
