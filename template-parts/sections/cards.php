<?php
$section_data = $args;
if ($section_data):
  ?>
  <!-- filepath: d:\Work\CMS\WordPress\OSP\ViteWP\wp-content\themes\Vite-UI-WP\template-parts\sections\cards.html -->
  <section class="container mx-auto mb-16 <?php echo esc_attr($section_data['template']); ?>">
    <?php if ($section_data['heading']): ?>
      <h2>
        <?php echo esc_html($section_data['heading']['title']); ?>
      </h2>
    <?php endif; ?>
    <div class="<?php echo esc_attr($section_data['wrapperClass']); ?>">
      <?php if (!empty($section_data['cards'])): ?>
        <?php foreach ($section_data['cards'] as $card): ?>
          <?php get_template_part('template-parts/components/simple/card', null, array('card' => $card)); ?>
          <?php endforeach; ?>
      <?php else: ?>
        <p><?php esc_html_e('No cards available.', 'text-domain'); ?></p>
      <?php endif; ?>
    </div>
  </section>
<?php endif; ?>