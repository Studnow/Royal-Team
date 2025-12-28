<?php
/**
 * Template Name: Default Layout
 * Description: A default layout template for WordPress.
 */

?>

<main id="main" class="site-main">
    <div class="container">
        <?php
        // Начинаем цикл WordPress
        if (have_posts()) :
            while (have_posts()) : the_post();
                // Выводим содержимое поста
                the_content();
            endwhile;
        else :
            // Если постов нет, выводим сообщение
            echo '<p>' . esc_html__('No content found', 'text-domain') . '</p>';
        endif;
        ?>
    </div>
</main>