<?php
// Partial Template for Countdown

$countdown_data = $args['countdown_data']; // Получаем аргументы
if ($countdown_data && !empty($countdown_data['targetDate'])): // Проверяем наличие данных
?>
<div class="countdown">
  <span id="countdown-timer" style="--value: <?php echo esc_attr($countdown_data['targetDate']); ?>;"></span>
</div>
<?php else: ?>
  <p>No countdown available.</p>
<?php endif; ?>
