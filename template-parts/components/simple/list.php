<?php
$list_data = $args['list_data'];
?>

<ul class="<?php echo esc_attr($list_data['class']); ?>">
  <?php if (!empty($list_data['listItems'])) : ?>
    <?php foreach ($list_data['listItems'] as $item) : ?>
      <li>
        <?php if (!empty($item['link'])) : ?>
          <a class="<?php echo esc_attr($item['link']['class']); ?>" href="<?php echo esc_url($item['link']['href']); ?>">
            <span class="<?php echo esc_attr($item['icon']['containerClass']); ?>">
              <svg class="<?php echo esc_attr($item['icon']['iconClass']); ?>" width="<?php echo esc_attr($item['icon']['w']); ?>" height="<?php echo esc_attr($item['icon']['h']); ?>"
                   viewBox="0 0 40 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="<?php echo esc_url(get_template_directory_uri() . '/assets/sprite.svg#sprite-' . esc_attr($item['icon']['id'])); ?>"></use>
              </svg>
            </span>
            <span class="<?php echo esc_attr($item['itemText']['class']); ?>"><?php echo esc_html($item['itemText']['text']); ?></span>
          </a>
        <?php else : ?>
          <?php echo esc_html($item['text']); ?>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  <?php endif; ?>
</ul>