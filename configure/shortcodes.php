<?php
// Shortcodes code goes here
// Add a shortcode for Contact Form 7 rating
/**
 * Shortcode for Contact Form 7 rating
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML output for the rating.
 */

add_filter('wpcf7_form_elements', function ($content) {
    return do_shortcode($content);
});
function cf7_rating_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'name' => 'rating',
            'class' => 'mask mask-star-2 bg-yellow-400',
            'count' => 5, // Количество звезд
        ),
        $atts,
        'cf7_rating'
    );

    $output = '<div class="rating">';
    for ($i = 1; $i <= $atts['count']; $i++) {
        $output .= sprintf(
            '<input type="radio" name="%s" value="%d" class="%s" />',
            esc_attr($atts['name']),
            $i,
            esc_attr($atts['class'])
        );
    }
    $output .= '</div>';

    return $output;
}
add_shortcode('cf7_rating', 'cf7_rating_shortcode');