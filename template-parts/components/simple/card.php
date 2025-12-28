<?php
// Получаем данные карточки
$card = $args['card'];
?>

<div class="card <?php echo esc_attr( $card['cardClass'] ); ?>">
	<?php if ( ! empty( $card['cardPicture'] ) ) : ?>
		<figure>
			<?php get_template_part( 'template-parts/components/simple/picture' ); ?>
		</figure>
	<?php endif; ?>
	<div class="card-body h-full">
		<?php if ( ! empty( $card['cardHeading']['title'] ) ) : ?>
			<h3 class="<?php echo esc_attr( $card['cardHeading']['class']['classTitle'] ); ?>">
				<?php echo esc_html( $card['cardHeading']['title'] ); ?>
			</h3>
		<?php endif; ?>
		<?php if ( ! empty( $card['cardHeading']['description'] ) ) : ?>
			<p class="<?php echo esc_attr( $card['cardHeading']['class']['classDesc'] ); ?>">
				<?php echo esc_html( $card['cardHeading']['description'] ); ?>
			</p>
		<?php endif; ?>
		<?php if ( ! empty( $card['cardActions'] ) ) : ?>
			<div class="card-actions justify-end">
				<?php get_template_part( 'template-parts/components/simple/button', null, [ 
					'button' => $card['cardBtn']
				] ); ?>
			</div>
		<?php endif; ?>
	</div>
</div>