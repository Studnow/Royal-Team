<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ViteUiTheme
 */

get_header();
?>

<?php
$context = get_data();

$drawer = $context['/index.html']['layout']['drawer'] ?? null;
$modal = $context['/index.html']['layout']['modal'] ?? null;

if ( $context !== null ) {
	$mainClass = $context['/index.html']['mainClass'];
	$sections = $context['/index.html']['sections'];
	set_query_var( 'mainClass', $mainClass );
	set_query_var( 'sections', $sections );
	if ( $drawer ) {
		get_template_part( 'template-parts/layout/drawer', null, [ 'content' => $drawer ] );
	} else {
		get_template_part( 'template-parts/layout/modal', null, [ 
			'modal' => $modal
		] );
		get_template_part( 'template-parts/sections/main' );
	}
}
?>

<?php
// get_sidebar();
get_footer();