<?php
// Register custom Walker for menu

class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {
function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

// Получаем классы элемента
$classes = ! empty( $item->classes ) ? (array) $item->classes : [];
$class_names = esc_attr( implode( ' ', $classes ) );

// Проверяем, есть ли подменю
$has_children = ( $args->walker->has_children ) ? true : false;

// Если у элемента есть подменю, выводим его как <details>
	if ( $has_children ) {
	$output .= $indent . '<li class="' . $class_names . '">';
		$output .= '<details>';
			$output .= '<summary>' . esc_html( $item->title ) . '</summary>'; // Заголовок подменю
			} else {
			// Обычный элемент меню
			$output .= $indent . '
	<li class="' . $class_names . '">';
		$output .= '<a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a>';
		}
		}

		function start_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= "\n<ul class=\"sub-menu min-w-48\">\n"; // Начало списка подменю
			}

			function end_lvl( &$output, $depth = 0, $args = array() ) {
			$output .= "</ul>\n
</details>\n"; // Закрытие списка подменю и <details>
	}

	function end_el( &$output, $item, $depth = 0, $args = array() ) {
	$output .= "</li>\n";
	}
	}