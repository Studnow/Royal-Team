<?php
$footer = $args['footer'] ?? [];
?>

<footer class="<?php echo esc_attr( $footer['containerClass'] ?? '' ); ?>">
	<aside class="flex gap-4">
		<?php if ( ! empty( $footer['social'] ) ) : ?>
			<?php foreach ( $footer['social'] as $social ) : ?>
				<a href="<?php echo esc_url( $social['href'] ?? '#' ); ?>" class="link">
					<svg class="w-10 h-10">
						<use
							xlink:href="<?php echo get_template_directory_uri() . '/assets/sprite.svg#sprite-' . esc_attr( $social['icon'] ?? '' ); ?>">
						</use>
					</svg>
				</a>
			<?php endforeach; ?>
		<?php endif; ?>
	</aside>

	<p>
		<?php if ( ! empty( $footer['business'] ) ) : ?>
			<?php foreach ( $footer['business'] as $item ) : ?>
				<span class="link link-hover">
					<?php echo esc_html( $item ); ?>
				</span>
			<?php endforeach; ?>
		<?php endif; ?>
	</p>

	<nav class="flex flex-col items-center">
		<?php if ( ! empty( $footer['policy'] ) ) : ?>
			<?php foreach ( $footer['policy'] as $policy ) : ?>
				<a class="link link-hover">
					<?php echo esc_html( $policy ); ?>
				</a>
			<?php endforeach; ?>
		<?php endif; ?>

		<?php if ( ! empty( $footer['logo'] ) ) : ?>
			<?php get_template_part( 'template-parts/components/simple/logo', null, [ 'logo' => $footer['logo'] ] ); ?>
		<?php endif; ?>
	</nav>
</footer>