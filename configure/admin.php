<?php
// Admin configuration code goes here

function register_my_menus() {
    register_nav_menus(
        array(
            'primary' => __( 'Primary Menu' ),
            'footer' => __( 'Footer Menu' ),
        )
    );
}
add_action( 'init', 'register_my_menus' );

// class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {
//     function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
//         $indent = ($depth) ? str_repeat("\t", $depth) : '';
//         $output .= $indent . '<li class="' . implode(' ', $item->classes) . '">';
//         $output .= '<a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a>';
//     }

//     function end_el(&$output, $item, $depth = 0, $args = array()) {
//         $output .= "</li>\n";
//     }
// }
