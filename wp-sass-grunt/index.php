<?php get_header(); ?>
	
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<article>

				<header>
					<h1><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>
				</header>

				<div class="entry">
					<?php the_content(); ?>
				</div>

			</article>


<?php endwhile; else : ?>
				
				<h2>Not Found</h2>				

<?php endif; ?>
			


<?php get_footer(); ?>
