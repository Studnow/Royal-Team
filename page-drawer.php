<?php
/**
 * Template Name: Drawer Page
 */
$context = get_data();
$drawer = $context['/index.html']['layout']['drawer'] ?? null;
ob_start();
if ( have_posts() ) :
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
endif;
$content = ob_get_clean();
	get_header();

// get_template_part( 'template-parts/layout/drawer', null, [ 'content' => $drawer ] );

get_footer();
