<?php
$image = get_image_data();
$image_formats = get_image_formats( $image['url'] );
?>

<picture
	class="rounded-lg p-6">
	<?php foreach ( $image_formats as $mime => $url ) : ?>
		<source
		type="<?php echo esc_attr( $mime ); ?>" srcset="<?php echo esc_url( $url ); ?>">
	<?php endforeach; ?>
	<img src="<?php echo esc_url( $image['url'] ); ?>" alt="<?php echo esc_attr( $image['alt'] ); ?>" width="<?php echo esc_attr( $image['width'] ); ?>" height="<?php echo esc_attr( $image['height'] ); ?>" loading="lazy" decoding="async"/>
</picture>

