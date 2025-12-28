<?php
$form = $args['dynForm_data'];
?>
<form action="/submit" method="post" class="<?php echo esc_attr($form['formClass']); ?>">
  <?php if (!empty($form['fields']['Name'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <input id="name" name="name" type="text" class="input input-bordered w-full"
      placeholder="<?php echo esc_attr($form['placeholder']['name']); ?>" />
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['Phone'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <input id="phone" name="phone" type="text" class="input input-bordered w-full"
      placeholder="<?php echo esc_attr($form['placeholder']['phone']); ?>" />
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['Email'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <label for="email" class="label">
      <span class="label-text">Email</span>
    </label>
    <input id="email" name="email" type="email" class="input input-bordered w-full" placeholder="<?php echo esc_attr($form['placeholder']['email']); ?>" />
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['check'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <label class="cursor-pointer label">
      <span class="label-text">Согласие с условиями</span>
      <input type="checkbox" class="checkbox" />
    </label>
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['radio'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <span class="label-text">Выберите опцию:</span>
    <label class="cursor-pointer label">
      <input type="radio" name="option" value="1" class="radio" />
      <span class="label-text">Опция 1</span>
    </label>
    <label class="cursor-pointer label">
      <input type="radio" name="option" value="2" class="radio" />
      <span class="label-text">Опция 2</span>
    </label>
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['select'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <label for="select" class="label">
      <span class="label-text">Выберите значение</span>
    </label>
    <select id="select" name="select" class="select select-bordered w-full">
      <option disabled selected>Выберите</option>
      <option>Опция 1</option>
      <option>Опция 2</option>
    </select>
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['rating'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <label class="label">
      <span class="label-text">Рейтинг</span>
    </label>
    <div class="rating">
      <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" />
      <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" />
      <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" />
      <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" />
      <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" />
    </div>
    <!-- <?php get_template_part( "template-parts/components/simple/rating", null, array( "is_review_page" => true, "rating_data" => $rating_data, "rating" => 1 ) ); ?>
  </div> -->
  <?php endif; ?>

  <?php if (!empty($form['fields']['toggle'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <label class="label cursor-pointer">
      <span class="label-text">Запомнить меня</span>
      <input type="checkbox" class="toggle" checked="checked" />
    </label>
  </div>
  <?php endif; ?>

  <?php if (!empty($form['fields']['button'])) : ?>
  <div class="form-control <?php echo esc_attr($form['controlClass']); ?>">
    <button type="submit" class="<?php echo esc_attr($form['submit']['class']); ?>"><?php echo esc_html($form['submit']['text']); ?></button>
  </div>
  <?php endif; ?>
</form> 