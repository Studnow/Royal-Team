<?php
// Получаем данные меню из аргументов
$menu_class = isset( $args['menuClass'] ) ? $args['menuClass'] : 'menu';

?>

<ul class="<?php echo esc_attr( $menu_class ); ?>">
	<?php
	// Выводим меню
	wp_nav_menu( array(
		'theme_location' => 'menu-1',
		'container' => false,
		'items_wrap' => '%3$s', // Убираем обертку <ul>
		'depth' => 2, // Указываем глубину для многоуровневого меню
		'walker' => new Custom_Walker_Nav_Menu(), // Используем кастомный walker
		'fallback_cb' => false, // Отключаем fallback, если меню не задано
	) );
	?>
</ul>