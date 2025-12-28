<?php
// Partial Template for Section

$section_data = $args; // Получаем аргументы
if ( $section_data ) :
	?>
	<div class="section">
		<h2><?php esc_html_e( $section_data['title'] ?? 'Section', 'text-domain' ); ?></h2>
		<?php get_template_part( 'template-parts/components/simple/skeleton') ?>
		<?php get_template_part( 'template-parts/components/simple/ol') ?>
		<?php if ( ! empty( $section_data['tabs'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/tabs', null, [ 'tabs' => $section_data['tabs'] ] ); ?>
		<?php endif; ?>
		<?php if ( ! empty( $section_data['table'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/complex/table', null, [ 'table' => $section_data['table'] ] ); ?>
		<?php endif; ?>
		<?php if ( ! empty( $section_data['dynForm'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/complex/dForm', null, [ 'dynForm_data' => $section_data['dynForm']['form'] ] ); ?>
		<?php endif; ?>
		<?php if ( ! empty( $section_data['list'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/list', null, [ 'list_data' => $section_data['list'] ] ); ?>
		<?php endif; ?>
		<?php if ( ! empty( $section_data['pagination'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/pagination', null, array( 'pagination_data' => $section_data['pagination'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['rating'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/rating', null, array( 'rating_data' => $section_data['rating'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['tooltip'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/tooltip', null, array( 'tooltip_data' => $section_data['tooltip'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['carousel'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/carousel', null, array( 'carousel_data' => $section_data['carousel'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['countdown'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/countdown', null, array( 'countdown_data' => $section_data['countdown'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['timeline'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/timeline', null, array( 'timeline_data' => $section_data['timeline'] ) ); ?>
		<?php endif; ?>

		<?php if ( ! empty( $section_data['steps'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/steps', null, array( 'steps_data' => $section_data['steps'] ) ); ?>
		<?php endif; ?>
	</div>
<?php endif; ?>
