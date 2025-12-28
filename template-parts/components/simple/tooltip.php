<?php
// Partial Template for Tooltip

$tooltip_data = $args['tooltip_data']; // Получаем аргументы
if ($tooltip_data && !empty($tooltip_data['tooltips'])): // Проверяем наличие данных
?>
  <div class="tooltip <?php echo esc_attr($tooltip_data['tooltip']['position']); ?> <?php echo esc_attr($tooltip_data['tooltip']['state']); ?>" data-tip="<?php echo esc_attr($tooltip_data['tooltip']['content']); ?>">
    <!-- content for tooltip -->
    <button class="btn"><?php echo esc_html($tooltip_data['tooltipName']); ?></button>
  </div>
<?php else: ?>
  <p>No tooltips available.</p>
<?php endif; ?>