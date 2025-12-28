<?php 

$context = get_data();

$content = $args['content'];

if ( $context !== null ) {
	$mainClass = $context['/index.html']['mainClass'];
	$sections = $context['/index.html']['sections'];
	set_query_var( 'mainClass', $mainClass );
	set_query_var( 'sections', $sections );
	get_template_part( 'template-parts/layout/modal', null, [ 
		'modal' => $context['/index.html']['layout']['modal']
	] );
}
?>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<!-- <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> -->
		<?php get_template_part( 'template-parts/sections/main' ); ?>
	</div>
	<div class="drawer-side z-10">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			<!-- Sidebar content here -->
			<?php get_template_part( 'template-parts/components/simple/accordion', null, [ 'accordion' => $content['accordion'] ] ); ?>
		</ul>
	</div>
</div>