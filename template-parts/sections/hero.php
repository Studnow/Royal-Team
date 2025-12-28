<?php
$hero_data = $args;
if ($hero_data):
  ?>
  <section class="container mx-auto">
    <div class="<?php echo esc_attr($hero_data['class']); ?>">
      <div class="<?php echo esc_attr($hero_data['classContent']); ?>">
        <div class="mb-8 <?php echo esc_attr($hero_data['heading']['class']['containerClass']); ?>">
          <h1 class="<?php echo esc_attr($hero_data['heading']['class']['title']); ?>">
            <?php echo esc_html($hero_data['heading']['title']); ?>
          </h1>
          <p class="py-6 <?php echo esc_attr($hero_data['heading']['class']['description']); ?>">
            <?php echo esc_html($hero_data['heading']['description']); ?>
          </p>
        </div>
        <?php get_template_part('template-parts/button', null, array('button' => $hero_data['button'])); ?>
        <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
      </div>
    </div>
  </section>
<?php endif; ?>