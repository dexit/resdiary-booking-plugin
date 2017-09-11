<?php

class ResDiary {
	private static $token_url = 'https://api.rdbranch.com/api/Jwt/Token';
	private static $api = 'https://api.rdbranch.com/api/ConsumerApi/v1';
	private static $username = 'jonny+resdiaryapi@kotacreative.co.uk';
	private static $password = ':Nq){_NAP28n79([5:fzKH|R|A7v/q';
	private static $count = 0;

	private static function checkUrl( $method, $url ) {
		$url_list = array(
			'GET'  => array( 'ClosedDates', 'Setup' ),
			'POST' => array( 'AvailabilitySearch' )
		);

		preg_match( '/([^\/]+$)/', $url, $resource );

		if ( isset( $url_list[ $method ] ) && in_array( $resource[0], $url_list[ $method ] ) ) {
			return true;
		}

		return false;
	}

	private static function getToken() {
		$token = get_transient( 'resdiary_token' );

		if ( ! empty( $token ) ) {
			return $token;
		}

		return self::fetchToken();

	}

	private static function fetchToken() {
		$response = wp_remote_post( self::$token_url, array(
			'headers' => array( 'Content-type' => 'application/json;charset=utf-8' ),
			'body'    => json_encode( array( 'Username' => self::$username, 'Password' => self::$password ) )
		) );

		if ( is_wp_error( $response ) ) {
			error_log( $response->get_error_message() . __LINE__ );
			wp_send_json_error( null, 500 );
		} elseif ( $response['response']['code'] !== 200 ) {
			error_log( json_encode( $response['body'] ) . __LINE__ );
			wp_send_json_error( null, 500 );
		} else {
			$token = 'Bearer ' . trim( $response['body'], '"' );

			set_transient( 'resdiary_token', $token, DAY_IN_SECONDS );

			return $token;
		}

		return null;
	}

	private static function handleResponse( $response, $data ) {

		if ( is_wp_error( $response ) ) {
			error_log( $response->get_error_message() . __LINE__ );
			wp_send_json_error( $response->get_error_message(), 500 );
		} elseif ( $response['response']['code'] === 401 ) {
			error_log( json_encode( $response['body'] ) . __LINE__ );
			if ( self::$count < 1 ) {
				self::$count ++;
				delete_transient( 'resdiary_token' );
				self::makeRequest( $data );
			} else {
				wp_send_json_error( null, 500 );
			}

		} elseif ( $response['response']['code'] !== 200 ) {
//      error_log( json_encode( $response['body'] ) . __LINE__ );
			wp_send_json_error( json_decode( $response['body'] ), $response['response']['code'] );
		} else {
			wp_send_json_success( json_decode( $response['body'] ), $response['response']['code'] );
		}

	}

	public static function makeRequest( $data ) {

		if ( self::checkUrl( $data['method'], $data['url'] ) ) {
			$token    = self::getToken();
			$headers  = array(
				'Content-type'  => 'application/json;charset=utf-8',
				'Authorization' => $token
			);
			$body     = $data['data'];
			$response = null;
			error_log( json_encode( $body ) . __LINE__ );

			if ( $data['method'] === 'POST' ) {

				$response = wp_remote_post( self::$api . $data['url'], array(
					'headers' => $headers,
					'body'    => json_encode( $body )
				) );

			} else {
				$url      = $body ? $data['url'] . '?' . http_build_query( $body ) : $data['url'];
				$response = wp_remote_get( self::$api . $url, array(
					'headers' => $headers
				) );
			}

			self::handleResponse( $response, $data );

		} else {
			wp_send_json_error( null, 500 );
		}

	}

}
