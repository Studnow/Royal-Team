<?php

// Ordered list component
function render_ordered_list($items, $class = '') {
if (empty($items)) {
return; // Если нет элементов, ничего не выводим
}

echo '<ol class="' . esc_attr($class) . ' lg:justify-center">';

	foreach ($items as $index => $item) {
	echo '<li class="flex gap-4 py-1">';

		if (!empty($item['link'])) {
		echo '<a class="' . esc_attr($class) . ' text-accent" href="' . esc_url($item['href']) . '">';
			echo '<span class="icon w-6 h-6">' . wp_kses_post($item['icon']) . '</span>';
			echo '<span class="border-b-2 border-accent py-1 hidden md:block">' . esc_html($item['text']) . '</span>';
			echo '</a>';
		} else {
		echo '<span class="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold">' .
			($index + 1) . '</span>';
		echo '<span class="w-[80%]">' . esc_html($item['text']) . '</span>';
		}

		echo '</li>';
	}

	echo '</ol>';
}