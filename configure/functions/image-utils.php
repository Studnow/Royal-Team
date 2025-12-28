<?php
// Utility functions for image management

function get_image_data() {
    $image = null;

    if (function_exists('get_field')) {
        $image = get_field('card_image');
    }

    if (!$image && function_exists('get_post_thumbnail_id')) {
        $image_id = get_post_thumbnail_id();
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'full');
            $image = [
                'url' => $image_data[0] ?? '',
                'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title($image_id),
                'width' => $image_data[1] ?? 640,
                'height' => $image_data[2] ?? 480,
            ];
        }
    }

    if (empty($image['url'])) {
        $image['url'] = get_template_directory_uri() . '/assets/img/placeholder.jpg';
        $image['alt'] = 'Placeholder image';
        $image['width'] = 640;
        $image['height'] = 480;
    }

    return $image;
}

function get_image_formats($image_url) {
    $file_info = pathinfo($image_url);
    $file_name = $file_info['filename'];
    $file_ext = $file_info['extension'];
    $file_dir = dirname($image_url) . '/';

    $formats = apply_filters('custom_image_formats', [
        'avif' => 'image/avif',
        'webp' => 'image/webp',
        $file_ext => $file_info['extension'],
    ]);

    $image_formats = [];

    foreach ($formats as $ext => $mime) {
        $alt_path = $file_dir . $file_name . '.' . $ext;
        if (attachment_url_to_postid($alt_path) || $ext === $file_ext) {
            $image_formats[$mime] = $alt_path;
        }
    }

    return $image_formats;
}
