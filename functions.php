<?php

function get_resdiary_token() {
	$url      = 'https://api.resdiary.com/api/Jwt/Token';
	$username = 'incipio.resdiaryapi@kotacreative.co.uk';
	$password = '(cS9F=SqFz{{y+7^a0=JuG/wu)8n[0';
	$response = wp_remote_post( $url, array(
		'headers' => array( 'Content-type' => 'application/json;charset=utf-8' ),
		'body'    => json_encode( array( 'Username' => $username, 'Password' => $password ) )
	) );

	if ( is_wp_error( $response ) ) {
		http_response_code( 500 );
		echo $response->get_error_message();
	} else {
		http_response_code( $response['response']['code'] );
		echo $response['body'];
	}

	die();
}

add_action( 'wp_ajax__get_resdiary_token', 'get_resdiary_token' );
add_action( 'wp_ajax_nopriv_get_resdiary_token', 'get_resdiary_token' );
