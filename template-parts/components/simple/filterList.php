<?php
$list_data = $args['list_data'];
$list_style = $args['list_data']['itemStyle'];
?>

<ul class="<?php echo esc_attr($list_data['class']); ?>">
  <?php if (!empty($list_data['listItems'])) : ?>
    <?php foreach ($list_data['listItems'] as $item) : ?>
      <li>
        <?php if (!empty($list_style['link'])) : ?>
          <button class="<?php echo esc_attr($list_style['link']['class']); ?>" href="<?php echo esc_url($list_style['link']['href']); ?>" data-id="<?php echo esc_attr($item['text']); ?>">
            <?php if (!empty($list_style['icon']['showIcon'])) : ?>  
            <span class="<?php echo esc_attr($list_style['icon']['containerClass']); ?>">
              <?php if (!empty($list_style['svg']['type']) && $list_style['icon']['type'] === 'svg') : ?>
            <svg class="<?php echo esc_attr($list_style['icon']['iconClass']); ?>" width="<?php echo esc_attr($list_style['icon']['w']); ?>" height="<?php echo esc_attr($list_style['icon']['h']); ?>"
                   viewBox="0 0 40 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="<?php echo esc_url(get_template_directory_uri() . '/assets/sprite.svg#sprite-' . esc_attr($item['icon'])); ?>"></use>
              </svg>
              <?php elseif (!empty($list_style['icon']['type']) && $list_style['icon']['type'] === 'img') : ?>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/project/images/<?php echo esc_attr($item['icon']); ?>" alt="<?php echo esc_attr($item['text']); ?>" width="40" height="40">
              <?php endif; ?>
            </span>
            <?php endif; ?>
            <span class="<?php echo esc_attr($list_style['textClass']); ?>"><?php echo esc_html($item['text']); ?></span>
            </button>
        <?php else : ?>
          <?php echo esc_html($list_style['text']); ?>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  <?php endif; ?>
</ul>