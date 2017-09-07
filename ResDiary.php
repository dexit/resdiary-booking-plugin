<?php

class ResDiary {
  private static $token_url = 'https://api.resdiary.com/api/Jwt/Token';
  private static $api = 'https://api.resdiary.com/api/ConsumerApi/v1';
  private static $username = 'incipio.resdiaryapi@kotacreative.co.uk';
  private static $password = '(cS9F=SqFz{{y+7^a0=JuG/wu)8n[0';
  private static $count = 0;

  private static function checkUrl( $method, $url ) {
    $url_list = array(
      'GET' => 'ClosedDates'
    );

    preg_match( '/([^\/]+$)/', $url, $resource );

    if ( isset( $url_list[ $method ] ) && $url_list[ $method ] === $resource[0] ) {
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
    $response_body = json_decode( $response['body'] );
    $response      = wp_remote_post( self::$token_url, array(
      'headers' => array( 'Content-type' => 'application/json;charset=utf-8' ),
      'body'    => json_encode( array( 'Username' => self::$username, 'Password' => self::$password ) )
    ) );

    if ( is_wp_error( $response ) ) {
      error_log( $response->get_error_message() );
      wp_send_json_error( null, 500 );
    } elseif ( $response['response']['code'] !== 200 ) {
      error_log( $response_body );
      wp_send_json_error( null, 500 );
    } else {
      $token = 'Bearer ' . trim( $response['body'], '"' );

      set_transient( 'resdiary_token', $token, DAY_IN_SECONDS );

      return $token;
    }

    return null;
  }

  private static function handleResponse( $response, $data ) {
    $response_body = json_decode( $response['body'] );

    if ( is_wp_error( $response ) ) {
      error_log( $response->get_error_message() );
      wp_send_json_error( $response->get_error_message(), 500 );
    } elseif ( $response['response']['code'] === 401 ) {
      error_log( $response['body'] );
      if ( self::$count < 1 ) {
        self::$count ++;
        self::makeRequest( $data );
      } else {
        wp_send_json_error( null, 500 );
      }

    } elseif ( $response['response']['code'] !== 200 ) {
      error_log( $response['body'] );
      wp_send_json_error( $response_body, $response['response']['code'] );
    } else {
      wp_send_json_success( $response_body, $response['response']['code'] );
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

      if ( $data['method'] === 'POST' ) {

        $response = wp_remote_post( self::$api . $data['url'], array(
          'headers' => $headers,
          'body'    => $body
        ) );

      } else {
        $response = wp_remote_get( self::$api . $data['url'], array(
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
