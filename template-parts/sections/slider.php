<?php
$section_data = $args;
if ($section_data):
  ?>

  <section class="<?php echo esc_attr($section_data['class']); ?>">
    <?php get_template_part('template-parts/components/simple/section-title', null, array('heading' => $section_data['heading'])); ?>
    <?php get_template_part('template-parts/components/complex/splide-slider', null, array('slides' => $section_data['slides']['slideData'], 'sliderCommon' => $section_data['sliderCommon'])); ?>
  </section>
<?php endif; ?>