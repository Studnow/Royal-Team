<?php
// Получаем данные меню из аргументов
$menu_items = isset($args['items']) ? $args['items'] : [];
$menu_class = isset($args['menuClass']) ? $args['menuClass'] : 'menu';
?>

<ul class="<?php echo esc_attr($menu_class); ?>">
  <?php if (!empty($menu_items['before'])) : ?>
    <?php foreach ($menu_items['before'] as $item) : ?>
      <li><a href="#"><?php echo esc_html($item); ?></a></li>
    <?php endforeach; ?>
  <?php endif; ?>

  <?php if (!empty($menu_items['sub'])) : ?>
    <li>
      <details>
        <summary><?php echo esc_html($menu_items['sub']['subHeading']); ?></summary>
        <ul class="<?php echo esc_attr($menu_items['sub']['menuClass']); ?>">
          <?php foreach ($menu_items['sub']['listItems'] as $sub_item) : ?>
            <li><a href="#"><?php echo esc_html($sub_item); ?></a></li>
          <?php endforeach; ?>
        </ul>
      </details>
    </li>
  <?php endif; ?>

  <?php if (!empty($menu_items['after'])) : ?>
    <?php foreach ($menu_items['after'] as $item) : ?>
      <li><a href="#"><?php echo esc_html($item); ?></a></li>
    <?php endforeach; ?>
  <?php endif; ?>
</ul>
