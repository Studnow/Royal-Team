<?php
$section_data = $args;
if ( $section_data ) :
	?>

	<section class="<?php echo esc_attr( $args['class'] ); ?>">
		<div class="text col-span-2">
			<?php if ( $section_data['heading'] ) : ?>
				<h2 class="text-2xl font-bold text-center">
					<?php echo esc_html( $section_data['heading']['title'] ); ?>
					<span class="text-warning">Krabikmoney</span>
				</h2>
			<?php endif; ?>
			<div class="p-2">
				<?php foreach ( $section_data['description'] as $field ) : ?>
					<p class="<?php echo esc_attr( $section_data['heading']['class']['description'] ); ?>">
						<?php echo esc_html( $field ); ?>
					</p>
				<?php endforeach; ?>
				<p class="font-bold <?php echo esc_attr( $section_data['heading']['class']['description'] ); ?>">
					<?php echo esc_html( $section_data["lastP"] ); ?>
				</p>
			</div>
			<?php get_template_part( 'template-parts/components/simple/button', null, array( 'button' => $section_data['cardBtn'] ) ); ?>
		</div>
		<?php get_template_part( 'template-parts/components/simple/picture', null, array( 'image' => $section_data['picture']['aboutImg'] ) ); ?>
		<?php get_template_part( 'template-parts/components/simple/rating', null, [ 'rating_data' => isset( $section_data['rating'] ) ] ); ?>
		<!-- // Testimonials -->
		<!-- <?php get_template_part( "template-parts/sections/testimonial", null, [ 'section_data' => $section_data ] ); ?> -->
	</section>
<?php endif; ?>