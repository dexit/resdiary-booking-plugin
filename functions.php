<?php

class Resdiary {
	private static $token_url = 'https://api.resdiary.com/api/Jwt/Token';
	private static $api = 'https://api.resdiary.com/api/ConsumerApi/v1'
	private static $username = 'incipio.resdiaryapi@kotacreative.co.uk';
	private static $password = '(cS9F=SqFz{{y+7^a0=JuG/wu)8n[0';
	private static $token = null;

	private static function checkUrl( $method, $url ) {
		$url_list = array(
			'GET' => 'ClosedDates'
		);

		if ( isset( $url_list[ $method ] ) && $url_list[ $method ] === $url ) {
			return true;
		}

		return false;
	}

	private static function getToken() {

		if ( ! empty( self::$token ) ) {
			return self::$token;
		}

		return self::fetchToken();

	}

	private static function fetchToken() {

		$response = wp_remote_post( self::$token_url, array(
			'headers' => array( 'Content-type' => 'application/json;charset=utf-8' ),
			'body'    => json_encode( array( 'Username' => self::$username, 'Password' => self::$password ) )
		) );

		if ( is_wp_error( $response ) ) {
//			error_log( $response->get_error_message() );
			wp_send_json_error( null, 500 );
		} elseif ( $response['response']['code'] !== 200 ) {
//			error_log( $response['body'] );
			wp_send_json_error( null, 500 );
		} else {
			self::$token = $response['body'];

			return self::$token;
		}

		return null;
	}

	private static function handleResponse( $response, $data ) {

		if ( is_wp_error( $response ) ) {
//			error_log( $response->get_error_message() );
			wp_send_json_error( $response->get_error_message(), 500 );
		} elseif ( $response['response']['code'] !== 200 ) {
//			error_log( $response['body'] );
			wp_send_json_error( $response['body'], $response['response']['code'] );
		} elseif ( $response['response']['code'] === 401 ) {
//			error_log( $response['body'] );
			self::$token = null;
			self::makeRequest( $data );
			wp_send_json_error( $response['body'], $response['response']['code'] );
		} else {
			wp_send_json_success( $response['body'], $response['response']['code'] );
		}

	}

	public static function makeRequest( $data ) {

		if ( self::checkUrl( $data['url'] ) ) {
			$token    = self::getToken();
			$headers  = array(
				'Content-type' => 'application/json;charset=utf-8',
				"Authorization: Bearer $token"
			);
			$body     = $data['data'];
			$response = null;

			if ( $data['method'] === 'POST' ) {

				$response = wp_remote_post( $data['url'], array(
					'headers' => $headers,
					'body'    => $body
				) );

			} else {
				$response = wp_remote_get( $data['url'], array(
					'headers' => $headers,
					'body'    => $body
				) );
			}

			self::handleResponse( $response, $data );

		} else {
			wp_send_json_error( null, 500 );
		}

	}
}

function resdiary() {
	Resdiary::makeRequest( $data );
}

add_action( 'wp_ajax_resdiary', 'resdiary' );
add_action( 'wp_ajax_nopriv_resdiary', 'resdiary' );
