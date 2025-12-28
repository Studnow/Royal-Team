<?php
// Register custom post type for testimonials

function register_testimonials_post_type() {
	$labels = array(
		'name' => 'Отзывы',
		'singular_name' => 'Отзыв',
		'menu_name' => 'Отзывы',
		'add_new' => 'Добавить новый',
		'add_new_item' => 'Добавить новый отзыв',
		'edit_item' => 'Редактировать отзыв',
		'view_item' => 'Просмотреть отзыв',
		'all_items' => 'Все отзывы',
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => true, // Включаем архивную страницу
		'menu_icon' => 'dashicons-format-quote',
		'supports' => array( 'title', 'editor', 'thumbnail', 'author' ),
		'menu_position' => 20,
		'rewrite' => array( 'slug' => 'testimonials' ), // URL для архивной страницы
	);

	register_post_type( 'testimonial', $args );
}
add_action( 'init', 'register_testimonials_post_type' );

// Meta box for testimonials

function add_testimonials_metabox() {
	add_meta_box(
		'testimonials_settings',
		'Настройки отзывов',
		'testimonials_settings_callback',
		'page', // Тип поста - страница
		'side',
		'default'
	);
}
add_action( 'add_meta_boxes', 'add_testimonials_metabox' );

function testimonials_settings_callback( $post ) {
	wp_nonce_field( basename( __FILE__ ), 'testimonials_settings_nonce' );

	$show_testimonials = get_post_meta( $post->ID, '_show_testimonials', true );

	echo '<p>';
	echo '<input type="checkbox" id="show_testimonials" name="show_testimonials" value="1" ' . checked( $show_testimonials, 1, false ) . '>';
	echo '<label for="show_testimonials"> Показывать блок с отзывами</label>';
	echo '</p>';
}

function save_testimonials_settings( $post_id ) {
	// Проверка безопасности
	if ( ! isset( $_POST['testimonials_settings_nonce'] ) || ! wp_verify_nonce( $_POST['testimonials_settings_nonce'], basename( __FILE__ ) ) )
		return $post_id;

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
		return $post_id;

	if ( 'page' != $_POST['post_type'] || ! current_user_can( 'edit_page', $post_id ) )
		return $post_id;

	$show_testimonials = isset( $_POST['show_testimonials'] ) ? 1 : 0;
	update_post_meta( $post_id, '_show_testimonials', $show_testimonials );
}
add_action( 'save_post', 'save_testimonials_settings' );

// Function to get latest testimonials
// Функция для получения последних отзывов
function get_latest_testimonials( $args = [] ) {
	$default_args = [ 
		'post_type' => 'testimonial',
		'posts_per_page' => 3,
		'orderby' => 'date',
		'order' => 'DESC',
		'post_status' => 'publish',
	];

	$query_args = wp_parse_args( $args, $default_args );

	$testimonials_query = new WP_Query( $query_args );

	if ( $testimonials_query->have_posts() ) {
		$testimonials = [];
		while ( $testimonials_query->have_posts() ) {
			$testimonials_query->the_post();
			$testimonials[] = [ 
				'post_id' => get_the_ID(),
				'author' => get_post_meta( get_the_ID(), '_testimonial_author', true ),
				'position' => get_post_meta( get_the_ID(), '_testimonial_position', true ),
				'rating' => get_post_meta( get_the_ID(), '_testimonial_rating', true ),
			];
		}
		wp_reset_postdata();
		return $testimonials;
	}

	return [];
}