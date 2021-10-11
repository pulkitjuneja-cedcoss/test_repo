<?php

require_once('../config.php');
require_once '../../../../../../wp-blog-header.php';


$check_auth=ced_check_authorization();


if($check_auth){// if Authorisation Success

$method=$_SERVER['REQUEST_METHOD'];

if(isset($method) && 'GET' == $method){


		$args = array(
			'post_type'=>"product",
			'post_status'    => 'publish',
			'posts_per_page' => 50,

		);

		$loop = new WP_Query( $args );
		$product_data   = $loop->posts;

		$woo_products   = array();
		foreach ( $product_data as $key => $value ) {
			$get_product_data                     = wc_get_product( $value->ID );
			$get_product_data                     = $get_product_data->get_data();
			
			$woo_products[ $key ]['id']           = $value->ID;
			$woo_products[ $key ]['name']         = isset( $get_product_data['name'] ) ? $get_product_data['name'] : '';
			$woo_products[ $key ]['stock']        = ! empty( $get_product_data['stock_quantity'] ) ? $get_product_data['stock_quantity'] : 0;
			$woo_products[ $key ]['stock_status'] = ! empty( $get_product_data['stock_status'] ) ? $get_product_data['stock_status'] : '';
			$woo_products[ $key ]['sku']          = ! empty( $get_product_data['sku'] ) ? $get_product_data['sku'] : '';
			$woo_products[ $key ]['price']        = $get_product_data['price'];
			$image_url_id                         = $get_product_data['image_id'];
			$woo_products[ $key ]['image']        = wp_get_attachment_url( $image_url_id );
		}

		
		if(isset($woo_products) && !empty($woo_products)){
			http_response_code(200);
			echo json_encode(
				array(
					'status'  => 200,
					'product_data'=>$woo_products
				)
			);
			return;
		} else {
			http_response_code(400);
			echo json_encode(
				array(
					'status'  => 400,
					'message' => "Some Error Occured or Product Not Found"
				)
			);
			return;
		}

		

}



}




?>