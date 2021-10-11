<?php
global $title;
ced_umb_header();
?>
<h2 class="ced_umb_uppercase ced_umb_page_heading"><?php esc_html_e( $title, CED_UMB_TEXT_DOMAIN ); ?></h2>
<?php

$section = isset( $_GET['section'] ) ? sanitize_text_field( $_GET['section'] ) : 'category';

$sections = ced_umb_page_sections( $title );

if ( ! empty( $sections ) ) {
	?>
	<div class="ced_umb_page_sections_wrap">
		<?php
		foreach ( $sections as $label ) {
			$class = '';
			if ( $label == $section ) {
				$class = 'active';
			}
			$url = isset( $_SERVER['REQUEST_URI'] ) ? esc_url( $_SERVER['REQUEST_URI'] . '&section=' . esc_attr( $label ) ) : esc_url( $_SERVER['REQUEST_URI'] );
			?>
		<a href="<?php echo esc_url( $url ); ?>" class="ced_umb_page_sections <?php echo esc_attr( $class ); ?>"><?php esc_html_e( ucwords( $label ), CED_UMB_TEXT_DOMAIN ); ?></a>
			<?php
		}
		?>
	</div>
	<?php
}

do_action( 'ced_umb_load_section', $title, $section );
