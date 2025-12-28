<?php
// Partial Template for Carousel

$carousel_data = $args['carousel_data']; // Получаем аргументы
if ($carousel_data && !empty($carousel_data['slides'])): // Проверяем наличие данных
?>
<div class="carousel">
  <?php foreach ($carousel_data['slides'] as $slide): ?>
    <div class="carousel-item <?php echo esc_attr($slide['state'] === 'active' ? 'active' : ''); ?>">
      <?php echo esc_html($slide['content']); ?>
    </div>
  <?php endforeach; ?>
</div>
<?php else: ?>
  <p>No slides available.</p>
<?php endif; ?>
