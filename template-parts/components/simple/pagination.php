<?php
// Partial Template for Pagination

$pagination_data = $args['pagination_data']; // Получаем аргументы
if ($pagination_data && !empty($pagination_data['pages'])): // Проверяем наличие данных
?>
<div class="btn-group">
  <?php foreach ($pagination_data['pages'] as $page): ?>
    <button class="btn <?php echo esc_attr($page['state'] === 'active' ? 'btn-active' : ''); ?>">
      <?php echo esc_html($page['number']); ?>
    </button>
  <?php endforeach; ?>
</div>
<?php else: ?>
  <p>No pages available.</p>
<?php endif; ?>
