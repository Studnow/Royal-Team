<?php
/**
 * Кнопка для переиспользования
 *
 */
  $button = $args['button'];
?>

<?php if ( $button['isLink'] && $button['url'] ) : ?>
	<a href="<?php echo esc_url( $button['url'] ); ?>"
		class="<?php echo esc_attr( $button['class'] ); ?>"><?php echo esc_html( $button['text'] ); ?>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
			<use
				xlink:href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/sprite1.svg#sprite-<?php echo esc_attr( $button['icon']['id'] ); ?>" />
		</svg>
	</a>
<?php else : ?>
	<button type="<?php echo esc_attr( $button['type'] ); ?>" class="<?php echo esc_attr( $button['class'] ); ?>"><span
			class="<?php echo esc_attr( $button['textClass'] ); ?>"><?php echo esc_html( $button['text'] ); ?></span><?php if ( $button['isIcon'] && $button['isVerified'] ) : ?>
			<svg class="<?php echo esc_attr( $button['icon']['iconClass'] ); ?>" xmlns="http://www.w3.org/2000/svg"
				fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
				<use
					xlink:href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/sprite1.svg#sprite-<?php echo esc_attr( $button['icon']['id'] ); ?>" />
			</svg>
		<?php endif; ?>
	</button>
<?php endif; ?>

<!-- <?php
get_template_part( 'template-parts/components/button', null, [ 
	'text' => 'Нажми меня',
	'type' => 'button',
	'class' => 'primary',
] );
?> -->