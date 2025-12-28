<!-- filepath: d:\Work\CMS\WordPress\OSP\ViteWP\wp-content\themes\Vite-UI-WP\template-parts\components\simple\section-title.html -->
 <?php
$heading = isset($args['heading']) ? $args['heading'] : null;
if ($heading):
  ?>
<div class="mb-8 <?php echo esc_attr( $heading['class']['containerClass'] ); ?>">
  <?php if ( $heading['title'] ) : ?>
  <h<?php echo esc_attr( $heading['titleLevel'] ); ?>
    class="
    <?php echo esc_attr( $heading['class']['title'] ); ?>">
    <?php echo esc_html($heading['title'] ); ?>
  </<?php echo esc_html($heading['titleLevel'] ); ?>>
  <?php endif; ?>
  <?php if ($heading['description'] ) : ?>
  <p class="text-primary-content <?php echo esc_attr( $class['description'] ); ?>">
    <?php echo esc_html( $heading['description'] ); ?>
  </p>
  <?php endif; ?>
</div>
<?php endif; ?>