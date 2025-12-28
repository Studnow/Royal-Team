<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ViteUiTheme
 */

?>

	<footer id="colophon" class="site-footer">
		<?php
		$footer = get_data()['/index.html']['layout']['footer'];
		get_template_part( 'template-parts/layout/footer', null, [ 
			'footer' => $footer
		] );
		?>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'viteuitheme' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'viteuitheme' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'viteuitheme' ), 'viteuitheme', '<a href="http://underscores.me/">Underscores.me</a>' );
				?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
