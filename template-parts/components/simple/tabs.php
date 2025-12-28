<?php
// Получаем данные вкладок из аргументов
$tabs_data = isset($args['tabs']) ? $args['tabs'] : [];
$tab_name = isset($tabs_data['tabName']) ? $tabs_data['tabName'] : 'default_tabs'; // Устанавливаем значение по умолчанию
?>

<div role="tablist" class="tabs tabs-bordered">
  <?php if (!empty($tabs_data['tabs'])) : ?>
    <?php foreach ($tabs_data['tabs'] as $index => $tab) : ?>
      <input type="radio" name="<?php echo esc_attr($tab_name); ?>" role="tab" class="tab" aria-label="<?php echo esc_attr($tab['tabLabel']); ?>" <?php echo $tab['checked'] ? 'checked' : ''; ?> />
      <div role="tabpanel" class="tab-content p-10"><?php echo esc_html($tab['content']); ?></div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>