		</div> <!-- .wrap -->

		<?php wp_footer(); ?>

		<!--
		jQuery is loaded in functions.php file not here
		-->
		<script src="<?php bloginfo('template_directory'); ?>/js/scripts.btm.js"></script>
		 
		<script>
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-xxxxxx-1']);
			_gaq.push(['_trackPageview']);    
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();    
		</script>

	</body>

</html>
