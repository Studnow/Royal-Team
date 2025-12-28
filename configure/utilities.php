<?php
// Utility functions code goes here
/**
 * Include a template part from the vite3UI folder.
 *
 * @param string $template The template part to include.
 * @param array $args Arguments to pass to the template part.
 */

function get_data() {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		$context = stream_context_create( [ 
			'http' => [ 'timeout' => 1 ]
		] );

		// Try to get the development data, but gracefully fall back if it fails
		$json_data = @file_get_contents( 'http://localhost:5173/data.json', false, $context );
		// If we failed to get the development data, fall back to the production file
		if ( $json_data === false ) {
			$json_file_path = get_template_directory() . '/dist/assets/data/combinedData.json';
			if ( file_exists( $json_file_path ) ) {
				$json_data = file_get_contents( $json_file_path );
			}
		}
	} else {
		$json_file_path = get_template_directory() . '/dist/assets/data/combinedData.json';
		if ( file_exists( $json_file_path ) ) {
			$json_data = file_get_contents( $json_file_path );
		} else {
			$json_data = false;
		}
	}

	if ( $json_data ) {
		$combined_data = json_decode( $json_data, true );
		return $combined_data;
	}

	return null;
}

require_once get_template_directory() . '/configure/functions/svg-utils.php';
require_once get_template_directory() . '/configure/functions/image-utils.php';
require_once get_template_directory() . '/configure/functions/menu-walker.php';
