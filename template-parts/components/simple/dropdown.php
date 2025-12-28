<!-- <div class="dropdown">
	<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
		</svg>
	</div>
	{{>menu-sm}}
</div> -->

<?php
$menu = $args['menu'] ?? [];
?>
<div class="dropdown">
	<div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-controls="primary-menu" aria-expanded="false">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
		</svg>
	</div>
  <nav id="primary-menu">
    <?php
    wp_nav_menu( [ 
      'theme_location' => 'menu-1',
      'menu_class' => esc_attr( $menu['menuSmClass'] ?? 'menu' ),
    ] );
    ?>
  </nav>
</div>
