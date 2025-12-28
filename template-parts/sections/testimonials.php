<?php
$section_data = $args;

if (is_front_page() || get_post_meta(get_the_ID(), '_show_testimonials', true) || is_post_type_archive('testimonial')) {
    $testimonials = get_latest_testimonials(['posts_per_page' => 3]);
    ?>
    <section class="<?php echo esc_attr($args['class']); ?>">
        <?php if ($section_data['heading']) : ?>
            <h2 class="<?php echo esc_attr($section_data['heading']['class']['title']); ?>">
                <?php echo esc_html($section_data['heading']['title']); ?>
            </h2>
        <?php endif; ?>

        <div class="testimonials-grid grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <?php if (!empty($testimonials)) : ?>
                <?php foreach ($testimonials as $testimonial) : ?>
                    <?php get_template_part('template-parts/components/complex/testimonial-card', null, [
                        'post_id'  => $testimonial['post_id'],
                        'author'   => $testimonial['author'],
                        'position' => $testimonial['position'],
                        'rating'   => $testimonial['rating'],
                    ]); ?>
                <?php endforeach; ?>

                <?php if (!is_post_type_archive('testimonial')) : ?>
                    <div class="view-all-testimonials text-center col-span-1 md:col-span-4">
                        <a href="<?php echo esc_url(get_post_type_archive_link('testimonial')); ?>"
                           class="btn no-underline text-base-100 bg-gradient-to-r from-primary to-secondary font-bold py-2 px-6 rounded-md hover:bg-gradient-to-l hover:opacity-90">
                            Смотреть все отзывы
                        </a>
                    </div>
                <?php endif; ?>

                <?php if (is_post_type_archive('testimonial')) : ?>
                    <div class="view-all-testimonials text-center mt-8 col-span-1 md:col-span-4">
                        <?php get_template_part('template-parts/components/complex/testimonial-form', null, [
                            'rating_data' => isset($section_data['rating']),
                        ]); ?>
                    </div>
                <?php endif; ?>
            <?php else : ?>
                <div class="no-testimonials text-center col-span-3 min-h-48 flex flex-col items-center justify-between">
                    <p>Отзывов пока нет.</p>
                    <a href="<?php echo esc_url(get_post_type_archive_link('testimonial')); ?>"
                       class="btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l text-base-100 font-bold py-2 px-6 rounded-md">
                        Оставить отзыв
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
}
?>