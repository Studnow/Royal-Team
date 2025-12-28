<?php
$slides = $args['slides'];
$sliderCommon = $args['sliderCommon'];
?>

<div id="splide" class="splide">
	<?php if ( $sliderCommon['customControl']['control'] ) : ?>
		<?php get_template_part( 'template-parts/components/complex/sliderParts/customControl', null, [ 'customControl' => $sliderCommon['customControl'] ] ); ?>
	<?php endif; ?>
	<?php
	$slideCount = count( $slides ); // Количество слайдов
	?>
	<div class="splide__track">
		<ul class="splide__list">
			<?php if ( $slideCount > 0 ) : ?>
				<?php foreach ( $slides as $slide ) : ?>
					<li class="splide__slide text-center">
						<?php get_template_part( 'template-parts/components/complex/sliderParts/slide', null, [ 
							'common' => $sliderCommon,
							'items' => $slide
						] ); ?>
					</li>
				<?php endforeach; ?>
			<?php else : ?>
				<?php for ( $i = 0; $i < ( $args['defaultSlideCount'] ?? 3 ); $i++ ) : ?>
					<li class="splide__slide text-center">
						<?php get_template_part( 'template-parts/components/card', null, [ 'items' => null ] ); ?>
					</li>
				<?php endfor; ?>
			<?php endif; ?>
		</ul>
	</div>
</div>