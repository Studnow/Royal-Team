<?php
$slide = $args['items'];
$img_src = ( strpos( $slide['cardBImg']['path'], 'http' ) === 0 )
	? $slide['cardBImg']['path']
	: get_template_directory_uri() . $slide['cardBImg']['path'];
?>

<div class="card rounded-xl">
  <?php if ( ! empty( $slide['cardBImg']['path'] ) ) : ?>
		<img src="<?php echo esc_url( $img_src ); ?>" alt="<?php echo esc_attr( $slide['cardBImg']['title'] ?? '' ); ?>"
			class="<?php echo esc_attr( $slide['cardBImg']['class'] ?? '' ); ?>"
			width="<?php echo esc_attr( $slide['cardBImg']['w'] ?? '' ); ?>"
			height="<?php echo esc_attr( $slide['cardBImg']['h'] ?? '' ); ?>">
	<?php endif; ?>

	<?php if ( ! empty( $slide['cardBody'] ) && is_array( $slide['cardBody'] ) ) : ?>
		<div class="slide-content">
			<?php if ( ! empty( $slide['cardBody']['cardBTitle'] ) ) : ?>
				<h3 class="slide-title">
					<?php echo esc_html( $slide['cardBody']['cardBTitle'] ); ?>
				</h3>
			<?php endif; ?>

			<?php if ( ! empty( $slide['cardBody']['cardBDesc'] ) ) : ?>
				<p class="slide-description">
					<?php echo esc_html( $slide['cardBody']['cardBDesc'] ); ?>
				</p>
			<?php endif; ?>
		</div>
	<?php endif; ?>
</div>