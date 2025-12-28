<?php
/**
 * Template part for displaying testimonial submission form
 */
$rating_data = $args['rating_data'];

$success_message = '';
$error_message = '';

// Обработка отправки формы
if (isset($_POST['submit_testimonial']) && wp_verify_nonce($_POST['testimonial_nonce'], 'submit_testimonial')) {
    
    // Проверка на спам
    if (!empty($_POST['honeypot'])) {
        $error_message = 'Обнаружена попытка спама.';
    } else {
        // Получаем данные из формы
		$testimonial_title = isset( $_POST['testimonial_title'] ) ? sanitize_text_field( $_POST['testimonial_title'] ) : '';
		$testimonial_content = isset( $_POST['testimonial_content'] ) ? wp_kses_post( $_POST['testimonial_content'] ) : '';
		$author_name = isset( $_POST['author_name'] ) ? sanitize_text_field( $_POST['author_name'] ) : '';
		$author_position = isset( $_POST['author_position'] ) ? sanitize_text_field( $_POST['author_position'] ) : '';
		$rating = isset( $_POST['rating'] ) ? intval( $_POST['rating'] ) : 0;


		// Валидация данных
        if (empty($testimonial_content) || empty($author_name)) {
            $error_message = 'Пожалуйста, заполните все обязательные поля.';
        } else {
            // Создаем отзыв
            $testimonial_data = array(
                'post_title'    => !empty($testimonial_title) ? $testimonial_title : 'Отзыв от ' . $author_name,
                'post_content'  => $testimonial_content,
                'post_status'   => 'pending', // Отзыв требует одобрения
                'post_type'     => 'testimonial',
            );
            
            // Вставляем отзыв
            $testimonial_id = wp_insert_post($testimonial_data);
            
            if (!is_wp_error($testimonial_id)) {
                // Сохраняем мета-данные
                update_post_meta($testimonial_id, '_testimonial_author', $author_name);
                update_post_meta($testimonial_id, '_testimonial_position', $author_position);
                update_post_meta($testimonial_id, '_testimonial_rating', $rating);
                
                // Обработка загрузки изображения
                if (!empty($_FILES['author_image']['name'])) {
                    require_once(ABSPATH . 'wp-admin/includes/image.php');
                    require_once(ABSPATH . 'wp-admin/includes/file.php');
                    require_once(ABSPATH . 'wp-admin/includes/media.php');
                    
                    $attachment_id = media_handle_upload('author_image', $testimonial_id);
                    
                    if (!is_wp_error($attachment_id)) {
                        set_post_thumbnail($testimonial_id, $attachment_id);
                    }
                }
                
                $success_message = 'Спасибо! Ваш отзыв отправлен на модерацию и будет опубликован после проверки.';
                
                // Отправка уведомления администратору
                $admin_email = get_option('admin_email');
                $subject = 'Новый отзыв на сайте ' . get_bloginfo('name');
                $message = 'Получен новый отзыв от ' . $author_name . '. Проверьте его в админ-панели.';
                
                wp_mail($admin_email, $subject, $message);
                
            } else {
                $error_message = 'Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.';
            }
        }
    }
}
?>

<div class="testimonial-form-container bg-gray-50/90 p-6 rounded-lg shadow-sm my-8">
    <h3 class="text-2xl font-bold mb-4">Оставьте свой отзыв</h3>
    
    <?php if ($success_message) : ?>
        <div class="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <?php echo esc_html($success_message); ?>
        </div>
    <?php endif; ?>
    
    <?php if ($error_message) : ?>
        <div class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <?php echo esc_html($error_message); ?>
        </div>
    <?php endif; ?>
    
    <form method="post" enctype="multipart/form-data" class="testimonial-submission-form">
        <?php wp_nonce_field('submit_testimonial', 'testimonial_nonce'); ?>
        
        <!-- Поле-ловушка для спама -->
        <div class="honeypot-field" style="display:none">
            <input type="text" name="honeypot" value="">
        </div>

        <div class="form-group mb-4">
            <label for="author_name" class="block text-gray-700 font-medium mb-2">Ваше имя *</label>
            <input type="text" id="author_name" name="author_name" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <div class="form-group mb-4">
            <label for="testimonial_title" class="block text-gray-700 font-medium mb-2">Заголовок отзыва (необязательно)</label>
            <input type="text" id="testimonial_title" name="testimonial_title" class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <div class="form-group mb-4">
            <label for="testimonial_content" class="block text-gray-700 font-medium mb-2">Текст отзыва *</label>
            <textarea id="testimonial_content" name="testimonial_content" rows="5" required class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
        </div>
        
        <div class="form-group mb-4">
            <label for="rating" class="block text-gray-700 font-medium mb-2">Оценка</label>
            <?php get_template_part( "template-parts/components/simple/rating", null, array( "is_review_page" => true, "rating_data" => $rating_data, "rating" => 1 ) ); ?>
        </div>
        
        <!-- <div class="form-group mb-4">
            <label for="author_position" class="block text-gray-700 font-medium mb-2">Должность/компания</label>
            <input type="text" id="author_position" name="author_position" class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div> -->
        
        <!-- <div class="form-group mb-6">
            <label for="author_image" class="block text-gray-700 font-medium mb-2">Ваше фото (необязательно)</label>
            <input type="file" id="author_image" name="author_image" accept="image/*" class="w-full">
            <p class="text-sm text-gray-500 mt-1">Максимальный размер файла: 2MB</p>
        </div> -->
        
        <div class="form-group">
            <button type="submit" name="submit_testimonial" class="btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l text-base-100 font-bold py-2 px-6 rounded-md">
                Отправить отзыв
            </button>
        </div>
    </form>
</div>