(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should rescat_ide in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not conscat_idered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 var ajax_url   = ced_umb_admin_obj.ajax_url;
	 var ajax_nonce = ced_umb_admin_obj.ajax_nonce;
	 var parsed_reponse,notice,classes,status;

	function parse_response( response = '' ) {
		return jQuery.parseJSON( response );
	}

	function show_loader() {
		$( ".ced_umb_loader" ).show();
	}

	function hide_loader() {
		$( ".ced_umb_loader" ).hide();
	}

	function reload_page( slow = false ) {
		var delay = 100;
		if ( slow ) {
			delay = 400;
		}
		window.setTimeout(
			function() {
				location.reload();
			} ,
			delay
		);
	}

	$( document ).on(
		'change' ,
		'.ced_umb_category' ,
		function() {
			var level    = $( this ).data( 'level' );
			var cat_name = $( this ).find( 'option:selected' ).text();
			var cat_id   = $( this ).val();
			$( '.ced_umb_marketplace_categories' ).hide();
			show_loader();
			$.ajax(
				{
					url : ajax_url,
					data:{
						ajax_nonce:ajax_nonce,
						cat_id:cat_id,
						cat_name:cat_name,
						level:level,
						action : 'ced_umb_fetch_next_level_category'
					},
					type:'POST',
					success: function( response ) {
						hide_loader();
						parsed_reponse = parse_response( response );
						status         = parsed_reponse.status;

						if ( 200 == status) {
							for (var i = 1; i < 8; i++) {
								$( document ).find( '.ced_umb_category_wrap_level_' + (parseInt( level ) + i) ).remove();
							}
							$( document ).find( '.ced_umb_category_wrap' ).append( parsed_reponse.response );
							$( '.ced_umb_select2' ).select2();
						} else if ( 300 == status || parsed_response == 0 || parsed_response == '0') {
							for (var i = 1; i < 8; i++) {
								$( document ).find( '.ced_umb_category_wrap_level_' + (parseInt( level ) + i) ).remove();
							}
							display_marketplace_category( cat_id );
							$( '.ced_umb_category_suggestion_wrap' ).show();
							$( '.ced_umb_category_suggestion_wrap' ).css( 'display','flex' );
							$( '.ced_umb_select2' ).select2();
						}
					},
					error: function( error ){

					}
				}
			);
		}
	);

	function display_marketplace_category( cat_id = 0 ) {
		show_loader();
		$.ajax(
			{
				url : ajax_url,
				data:{
					ajax_nonce:ajax_nonce,
					cat_id:cat_id,
					action : 'ced_umb_fetch_marketplace_categories'
				},
				type:'POST',
				success: function( response ) {
					hide_loader();
					parsed_reponse = parse_response( response );
					status         = parsed_reponse.status;
					if ( 200 == status) {
						$( document ).find( '.ced_umb_marketplace_categories' ).html( parsed_reponse.response );
						$( '.ced_umb_marketplace_categories' ).show();
						$( '.ced_umb_select2' ).select2();
					}
				},
				error: function( error ){

				}
			}
		);
	}

	$( document ).on(
		'click' ,
		'#ced_umb_save_mapping' ,
		function() {
			var cat_level            = $( '.ced_umb_category_wrap' ).find( "tr:last" ).data( 'level' );
			var ced_cat_id           = $( '.ced_umb_level_' + parseInt( cat_level ) + '_category' ).val();
			var ced_cat_name         = $( '.ced_umb_level_' + parseInt( cat_level ) + '_category' ).find( 'option:selected' ).data( 'path' );
			var marketplace_cat_info = {};
			var woo_cat_ids          = $( '.ced_umb_woo_categories' ).val();

			if ( woo_cat_ids.length < 1 ) {
				alert( 'please select atleast one woocommerce category' );
				return false;
			}

			var cat_info      = {};
			cat_info.cat_id   = ced_cat_id;
			cat_info.cat_name = ced_cat_name;

			marketplace_cat_info['cedcommerce'] = cat_info;

			$( document ).find( '.ced_umb_marketplace_category' ).each(
				function(){
					cat_info                          = {};
					var marketplace                   = $( this ).data( 'marketplace' );
					cat_info.cat_id                   = $( this ).val();
					cat_info.cat_name                 = $( this ).find( 'option:selected' ).text();
					marketplace_cat_info[marketplace] = cat_info;
				}
			);

			show_loader();

			$.ajax(
				{
					url : ajax_url,
					data:{
						ajax_nonce:ajax_nonce,
						action : 'ced_umb_save_mapping',
						woo_cat_ids : woo_cat_ids,
						marketplace_cat_info : marketplace_cat_info,
					},
					type:'POST',
					success: function( response ) {
						hide_loader();
						parsed_reponse = parse_response( response );
						reload_page();
					},
					error: function( error ){

					}
				}
			);
		}
	);

	$( document ).on(
		'change' ,
		'#ced_umb_marketplaces' ,
		function() {
			var marketplace = $( this ).val();
			if ( marketplace == "" ) {
				return false;
			}
			show_loader();
			$.ajax(
				{
					url : ajax_url,
					data:{
						ajax_nonce:ajax_nonce,
						action : 'ced_umb_connect_marketplace',
						marketplace : marketplace,
					},
					type:'POST',
					success: function( response ) {
						hide_loader();
						parsed_reponse = parse_response( response );
						if ( parsed_reponse.status == 200 ) {
							$( "#ced_umb_display_config_fields" ).html( "<div>" + parsed_reponse.html + "</div>" );
							$( "#ced_umb_display_config_fields" ).show();
						}
						$( "#ced_umb_connect_marketplace" ).show();
						$( "#ced_umb_connect_marketplace" ).val( marketplace );
					},
					error: function( error ){

					}
				}
			);

		}
	);

	jQuery( document ).ready(
		function($) {
			$( '.ced_umb_select2' ).select2();
		}
	);

})( jQuery );
