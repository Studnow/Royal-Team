<?php
// Partial Template for Rating

$rating_data = $args['rating_data']; // Получаем аргументы
if ($rating_data && !empty($rating_data['ratings'])): // Проверяем наличие данных
?>
<div class="rating">
  <?php foreach ($rating_data['ratings'] as $rating): ?>
    <input type="radio" name="<?php echo esc_attr($rating['name']); ?>" class="<?php echo esc_attr($rating['class']); ?>" <?php echo esc_attr($rating['state'] ? 'checked' : ''); ?> />
  <?php endforeach; ?>
</div>
<?php else: ?>
  <p>No ratings available.</p>
<?php endif; ?>