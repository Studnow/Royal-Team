<?php
// Получаем данные аккордеона из аргументов
$accordion_data = isset($args['accordion']) ? $args['accordion'] : [];
?>

<?php if (!empty($accordion_data['heading'])) : ?>
    <h3 class="section-title"><?php echo esc_html($accordion_data['heading']['title']); ?></h3>
    <p><?php echo esc_html($accordion_data['heading']['description']); ?></p>
<?php endif; ?>

<?php if (!empty($accordion_data['body'])) : ?>
    <?php foreach ($accordion_data['body'] as $item) : ?>
        <div class="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-1" />
            <div class="collapse-title font-semibold"><?php echo esc_html($item['title']); ?></div>
            <div class="collapse-content text-sm"><?php echo esc_html($item['text']); ?></div>
        </div>
    <?php endforeach; ?>
<?php endif; ?>