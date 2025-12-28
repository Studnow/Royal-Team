<?php
// Partial Template for Steps

$steps_data = $args['steps_data']; // Получаем аргументы
if ($steps_data && !empty($steps_data['steps'])): // Проверяем наличие данных
?>
<div class="steps">
  <?php foreach ($steps_data['steps'] as $index => $step): ?>
    <div class="step <?php echo esc_attr($step['state'] === 'completed' ? 'step-completed' : ''); ?> <?php echo esc_attr($step['state'] === 'current' ? 'step-current' : ''); ?>">
      <?php echo esc_html($step['content']); ?>
    </div>
  <?php endforeach; ?>
</div>
<?php else: ?>
  <p>No steps available.</p>
<?php endif; ?>
