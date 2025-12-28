<?php
$runner = $args['runner'];
?>

<div class="runner relative">
	<div class="runner-content overflow-hidden">
		<div class="runner-top">
			<?php get_template_part( 'template-parts/components/simple/list', null, [ 'list_data' => $runner['runnerTop'] ] ); ?>
		</div>
		<div class="<?php echo esc_attr( $runner['runnerBottom']['class'] ); ?>">
			<?php foreach ( $runner['runnerBottom']['listItems'] as $item ) : ?>
				<div class="currency-card card w-[19rem] bg-base-100">
					<header class="card-header flex justify-between p-2">
						<div class="date">01.01.2025</div>
						<div class="time">12:00</div>
					</header>
					<div class="card-body p-2">
						<div class="card-content flex justify-between gap-1">
							<div class="currency-left flex-nowrap flex items-center gap-1">
								<img
									src="<?php echo get_template_directory_uri(); ?>/assets/project/images/<?php echo esc_attr( $item['iconLeft'] ); ?>"
									alt="<?php echo esc_attr( $item['text'] ); ?>"
									width="<?php echo esc_attr( $runner['runnerBottom']['itemStyle']['icon']['w'] ) ?>"
									height="<?php echo esc_attr( $runner['runnerBottom']['itemStyle']['icon']['h'] ) ?>">
								<span class="truncate max-w-16"><?php echo esc_html( $item['text'] ); ?></span>
							</div>
							<svg class="w-6 h-6" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<use
									xlink:href="<?php echo get_template_directory_uri() . '/assets/sprite1.svg#sprite-' . esc_attr( $item["iconMid"] ); ?>">
								</use>
							</svg>
							<div class="currency-right flex-nowrap flex items-center gap-1">
								<img
									src="<?php echo get_template_directory_uri(); ?>/assets/project/images/<?php echo esc_attr( $item['iconRight'] ); ?>"
									alt="<?php echo esc_attr( $item['text'] ); ?>"
									width="<?php echo esc_attr( $runner['runnerBottom']['itemStyle']['icon']['w'] ) ?>"
									height="<?php echo esc_attr( $runner['runnerBottom']['itemStyle']['icon']['h'] ) ?>">
								<span class="truncate max-w-16"><?php echo esc_html( $item['text'] ); ?></span>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>