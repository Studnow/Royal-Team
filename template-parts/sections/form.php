<?php
$section_data = $args;
if ( $section_data ) :
	?>

	<section class="mb-16 bg-primary/60 backdrop-blur-sm py-4">
		<div class="max-w-screen-xl mx-auto">
			<?php get_template_part( 'template-parts/components/simple/section-title', null, [ 'heading' => $section_data['heading'] ] ); ?>
			<?php get_template_part( 'template-parts/components/simple/list', null, [ 'list_data' => $section_data['list']['send'] ] ); ?>
			<?php get_template_part( 'template-parts/components/simple/cf7-form', null, [] ); ?>
			<?php get_template_part( 'template-parts/components/complex/dForm', null, [ 'dynForm_data' => $section_data['dynForm']['form'] ] ); ?>
		</div>
	</section>
<?php endif; ?>