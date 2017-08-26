<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
	<head>		
		<meta charset="<?php bloginfo('charset'); ?>">		
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">		
		<?php if (is_search()) { ?>
		<meta name="robots" content="noindex, nofollow" /> 
		<?php } ?>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">	

		<title><?php wp_title(''); ?></title>	

		<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">

		<script src="<?php bloginfo('template_directory'); ?>/js/jstop.min.js"></script>

		<?php wp_head(); ?>

	</head>
	<body <?php body_class(); ?>>
		
		<div class="wrap">

			<header>			
			
				<a class="logo" href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_directory');?>/images/logo.png" alt="<?php bloginfo('name'); ?>" title="<?php bloginfo('name'); ?>" /></a>
					
				<?php wp_nav_menu( array('menu' => 'Main' )); ?>

			</header>
			
