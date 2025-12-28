<?php
$mainClass = get_query_var('mainClass');
$sections = get_query_var('sections');
?>
<main class="main <?php echo esc_attr($mainClass); ?>">
<label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
  <?php foreach ($sections as $section_key => $section_data): ?>
    <?php if ($section_data): ?>
      <?php get_template_part('template-parts/sections/' . $section_key, null, $section_data); ?>
    <?php endif; ?>
  <?php endforeach; ?>
</main>