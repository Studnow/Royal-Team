<?php
// Partial Template for Timeline

$timeline_data = $args['timeline_data']; // Получаем аргументы
if ($timeline_data && !empty($timeline_data['events'])): // Проверяем наличие данных
?>
<ul class="timeline">
  <?php foreach ($timeline_data['events'] as $index => $event): ?>
    <li class="timeline-item">
      <?php if ($index > 0): ?><hr class="timeline-line" /><?php endif; ?>
      <div class="timeline-start"><?php echo esc_html($event['start']); ?></div>
      <div class="timeline-middle"><?php echo $event['middle']; ?></div>
      <div class="timeline-end timeline-box"><?php echo esc_html($event['end']); ?></div>
      <?php if ($index < count($timeline_data['events']) - 1): ?><hr class="timeline-line" /><?php endif; ?>
    </li>
  <?php endforeach; ?>
</ul>
<?php else: ?>
  <p>No events available.</p>
<?php endif; ?>
