<?php
$section_data = $args;
if ($section_data):
  ?>
  <section class="container mx-auto mb-16 <?php echo esc_attr($section_data['template']); ?>">
    <?php if ($section_data['heading']): ?>
      <h2>
        <?php echo esc_html($section_data['heading']['title']); ?>
      </h2>
    <?php endif; ?>
    <div class="<?php echo esc_attr($section_data['content']['class']); ?>">
      <div class="<?php echo esc_attr($section_data['content']['col1']); ?>">
        <?php if (!empty($section_data['buttons'])): ?>
          <?php foreach ($section_data['buttons'] as $button): ?>
            <button class="<?php echo esc_attr($button['class']); ?>">
              <?php echo esc_html($button['text']); ?>
            </button>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
      <div class="<?php echo esc_attr($section_data['content']['col2']); ?>">
        <?php if (!empty($section_data['img'])): ?>
          <img src="<?php echo get_template_directory_uri() . esc_url($section_data['img']['path']); ?>" alt="<?php echo esc_attr($section_data['img']['alt']); ?>">
        <?php endif; ?>
      </div>
      <?php if (!empty($section_data['priceList'])): ?>
        <!-- Add price list rendering logic here -->
      <?php endif; ?>
    </div>
  </section>
<?php endif; ?>