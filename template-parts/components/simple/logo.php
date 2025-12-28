<?php
$logo = $args['logo'] ?? [];

?>
<?php if ( has_custom_logo() ) {
	the_custom_logo();
} else { ?>
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="<?php echo esc_attr( $logo['containerClass'] ?? '' ); ?>">
		<!-- <img src="<?php echo esc_url( get_template_directory_uri() . ( $logo['img'] ?? '' ) ); ?>"
			class="<?php echo esc_attr( $logo['imgClass'] ?? '' ); ?>"
			width="<?php echo esc_attr( $logo['w'] ?? '' ); ?>" height="<?php echo esc_attr( $logo['h'] ?? '' ); ?>"
			alt="<?php bloginfo( 'name' ); ?>"> -->
		<span class="<?php echo esc_attr( $logo['spanClass'] ?? '' ); ?>">
			<?php echo esc_html( $logo['text'] ?? '' ); ?>
		</span>
	</a>
<?php } ?>