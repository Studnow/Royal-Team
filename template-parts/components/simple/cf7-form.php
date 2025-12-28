<?php
/**
 * Template part for displaying a Contact Form 7 form.
 *
 * @package Vite-UI-WP
 */
?>

<div class="form-container max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
  <p class="mb-6 text-gray-600">Заполните форму, и мы свяжемся с вами в ближайшее время.</p>

  <?php
  // Replace 'your-form-id' with the actual ID or shortcode of your CF7 form.
  echo do_shortcode('[contact-form-7 id="2cbe693" title="Contact form"]');
  ?>
</div>
