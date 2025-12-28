<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ViteUiTheme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> data-theme="mytheme">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div id="page" class="site">
		<?php
		$header = get_data()['/index.html']['layout']['header'];
		$navbar = $header['navbar'];
		$logo = $header['logo'];
		$center = $header['center'];
		$right = $header['right'];
		?>
		<header class="header<?php echo esc_attr( $navbar['headerClass'] ); ?>">
			<div class="container<?php echo esc_attr( $navbar['containerClass'] ); ?>">
				<div class="navbar<?php echo esc_attr( $navbar['navbarClass'] ); ?>">
					<div class="navbar-start<?php echo esc_attr( $navbar['navbarStart'] ); ?>">

						<?php if ( $center['components']['showMenu'] ) : ?>
							<?php get_template_part( 'template-parts/components/simple/dropdown', null, [ 'menu' => $center['menu'] ] ); ?>
						<?php endif; ?>

						<?php get_template_part( 'template-parts/components/simple/logo', null, [ 'logo' => $logo ] ); ?>
					</div>

					<div class="navbar-center<?php echo esc_attr( $navbar['navbarCenter'] ); ?>">
						<?php if ( $center['components']['showMenu'] ) : ?>
							<nav id="site-navigation" class="main-navigation">
						<?php
						$menu_data = [ 
							'menuClass' => esc_attr( $center['menu']['menuClass'] ),
						];

						get_template_part( 'template-parts/components/simple/menu', null, $menu_data );
						?>
							</nav>
						<?php endif; ?>
					</div>

					<div class="navbar-end<?php echo esc_attr( $navbar['navbarEnd'] ); ?>">
						<a class="<?php echo esc_attr( $right['class'] ); ?>">
							<?php echo esc_html( $right['text'] ); ?>
						</a>
					</div>
				</div>
			</div>
		</header>