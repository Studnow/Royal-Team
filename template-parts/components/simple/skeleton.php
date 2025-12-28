<?php
$blockClass = [
	'h-32 w-full',
	'h-16 w-1/2',
	'h-8 w-full',
	'h-8 w-full',
];
?>
<div class="flex w-full flex-col gap-4">
  <?php foreach ($blockClass as $class) : ?>
    <div class="skeleton <?php echo esc_attr($class); ?>"></div>
  <?php endforeach; ?>
</div>