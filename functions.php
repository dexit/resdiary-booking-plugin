<?php
locate_template( 'ResDiary.php', true );

function resdiary() {
	ResDiary::makeRequest( $_REQUEST );
}

add_action( 'wp_ajax_resdiary', 'resdiary' );
add_action( 'wp_ajax_nopriv_resdiary', 'resdiary' );
