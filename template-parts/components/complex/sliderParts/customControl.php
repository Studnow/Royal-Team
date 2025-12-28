<?php
$customControl = $args['customControl'];
?>

<div class="splide__arrows">
  <button
    class="splide__arrow splide__arrow--prev <?php if ($customControl['controlClass'])
      echo esc_attr($customControl['controlClass']); ?>">
    <svg class="<?php if ($customControl['iconClass'])
      echo esc_attr($customControl['iconClass']); ?>" width="56"
      height="56" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use
        xlink:href="<?php echo get_svg_sprite_path(); ?>#sprite-<?php echo esc_attr($customControl['controlIcon']); ?>">
      </use>
    </svg>
  </button>
  <button
    class="splide__arrow splide__arrow--next <?php if ($customControl['controlClass'])
      echo esc_attr($customControl['controlClass']); ?>">
    <svg class="<?php if ($customControl['iconClass'])
      echo esc_attr($customControl['iconClass']); ?>" width="56" height="56" viewBox="0 0 40 26" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <use
        xlink:href="<?php echo get_svg_sprite_path(); ?>#sprite-<?php echo esc_attr($customControl['controlIcon']); ?>">
      </use>
    </svg>
  </button>
</div>