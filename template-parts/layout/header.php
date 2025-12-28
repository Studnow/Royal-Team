<header class="header<?php echo esc_attr($navbar['headerClass'] ?? ''); ?>">
  <div class="container<?php echo esc_attr($navbar['containerClass'] ?? ''); ?>">
    <div class="navbar<?php echo esc_attr($navbar['navbarClass'] ?? ''); ?>">
      <div class="navbar-start<?php echo esc_attr($navbar['navbarStart'] ?? ''); ?>">
        <?php if (!empty($center['components']['showMenu'])) : ?>
        <?php get_template_part('template-parts/dropdown', null, ['menu' => $center['menu']]); ?>
        <?php endif; ?>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo esc_attr($logo['containerClass'] ?? ''); ?>">
          <img src="<?php echo esc_url(get_template_directory_uri() . $logo['img']); ?>"
            alt="<?php echo esc_attr($logo['text'] ?? ''); ?>" class="<?php echo esc_attr($logo['imgClass'] ?? ''); ?>"
            width="<?php echo esc_attr($logo['w'] ?? ''); ?>" height="<?php echo esc_attr($logo['h'] ?? ''); ?>">
          <span class="<?php echo esc_attr($logo['spanClass'] ?? ''); ?>">
            <?php echo esc_html($logo['text'] ?? ''); ?>
          </span>
        </a>
      </div>
      <div class="navbar-center<?php echo esc_attr($navbar['navbarCenter'] ?? ''); ?>">
        <?php if (!empty($center['components']['showMenu'])) : ?>
        <?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'menu_class' => 'menu']); ?>
        <?php endif; ?>
        <?php if (!empty($center['components']['showContacts'])) : ?>
        <ul class="<?php echo esc_attr($center['list']['class'] ?? ''); ?>">
          <?php foreach ($center['list']['list-items'] as $item) : ?>
          <li>
            <a href="<?php echo esc_url($item['href']); ?>" class="<?php echo esc_attr($item['class'] ?? ''); ?>">
              <span class="<?php echo esc_attr($item['icon']['containerClass'] ?? ''); ?>">
                <img
                  src="<?php echo esc_url(get_template_directory_uri() . '/assets/icons/' . $item['icon']['id'] . '.svg'); ?>"
                  width="<?php echo esc_attr($item['icon']['w']); ?>"
                  height="<?php echo esc_attr($item['icon']['h']); ?>">
              </span>
              <span class="<?php echo esc_attr($item['span']['class'] ?? ''); ?>">
                <?php echo esc_html($item['span']['text']); ?>
              </span>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
        <?php endif; ?>
      </div>
      <div class="navbar-end<?php echo esc_attr($navbar['navbarEnd'] ?? ''); ?>">
        <a class="<?php echo esc_attr($right['class'] ?? ''); ?>">
          <?php echo esc_html($right['text'] ?? ''); ?>
        </a>
        <?php if (!empty($right['drawer'])) : ?>
        <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
        <?php endif; ?>
      </div>
    </div>
  </div>
</header>