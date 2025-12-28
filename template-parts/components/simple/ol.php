<?php
$items = [
	[ 'link' => true, 'href' => 'https://example.com', 'icon' => '<svg>...</svg>', 'text' => 'Example Link' ],
	[ 'link' => false, 'text' => 'Item without link' ],
	// Добавьте другие элементы по мере необходимости
];

render_ordered_list( $items, 'your-custom-class' );