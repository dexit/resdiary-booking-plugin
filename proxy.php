<?php

$method = $_SERVER['REQUEST_METHOD'];

function isResDiaryUrl() {
	$api = 'https://api.resdiary.com/api/';

	return strncmp( $_GET['url'], $api, strlen( $api ) ) === 0;
}

if ( $_GET && $_GET['url'] && isResDiaryUrl() ) {
	$url           = $_GET['url'];
	$headers       = getallheaders();
	$headers_str   = [];
	$auth          = array_key_exists( 'authorization', $headers ) ? $headers['authorization'] : $headers['Authorization'];
	$headers_str[] = "Authorization: $auth";

	$ch = curl_init( $url );

	curl_setopt( $ch, CURLOPT_URL, $url );

	if ( $method !== 'GET' ) {
		curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, $method );
	}

	if ( $method == "PUT" || $method == "PATCH" || ( $method == "POST" && empty( $_FILES ) ) ) {
		$data_str = file_get_contents( 'php://input' );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_str );
		//error_log($method.': '.$data_str.serialize($_POST).'\n',3, 'err.log');
	} elseif ( $method == "POST" ) {
		$data_str = array();
		if ( ! empty( $_FILES ) ) {
			foreach ( $_FILES as $key => $value ) {
				$full_path        = realpath( $_FILES[ $key ]['tmp_name'] );
				$data_str[ $key ] = '@' . $full_path;
			}
		}
		//error_log($method.': '.serialize($data_str+$_POST).'\n',3, 'err.log');

		curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_str + $_POST );
	}

	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers_str );

	$result = curl_exec( $ch );
	$info   = curl_getinfo( $ch );
	curl_close( $ch );

	header( "Content-Type: $info[content_type]" );

	http_response_code( $info['http_code'] );

	echo $result;

} else {
	http_response_code( 403 );
	exit;
}