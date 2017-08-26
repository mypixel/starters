<?php




// unlock admin settings
// 
function all_settings_link() {
	add_options_page(__('All Settings'), __('All Settings'), 'administrator', 'options.php');
}
add_action('admin_menu', 'all_settings_link');





// remove version info from head and feeds
// 
function complete_version_removal() {
	return '';
}
add_filter('the_generator', 'complete_version_removal');







// even more smart jquery inclusion
// 
add_action( 'init', 'jquery_register' );

// register from google and for footer
// 
function jquery_register() {
	if ( !is_admin() ) {
		wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', ( 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' ), false, null, true );
		wp_enqueue_script( 'jquery' );
	}
}





// set max. revisions for a page/post
// 
if (!defined('WP_POST_REVISIONS')) define('WP_POST_REVISIONS', 10);





// change except size
// change '100' to whatever is required
function new_excerpt_length($length) { 
    return 100;
}

add_filter('excerpt_length', 'new_excerpt_length');








// sharpen resized jpg's
// 
function ajx_sharpen_resized_files( $resized_file ) {

    $image = wp_load_image( $resized_file );
    if ( !is_resource( $image ) )
        return new WP_Error( 'error_loading_image', $image, $file );

    $size = @getimagesize( $resized_file );
    if ( !$size )
        return new WP_Error('invalid_image', __('Could not read image size'), $file);
    list($orig_w, $orig_h, $orig_type) = $size;

    switch ( $orig_type ) {
        case IMAGETYPE_JPEG:
            $matrix = array(
                array(-1, -1, -1),
                array(-1, 16, -1),
                array(-1, -1, -1),
            );

            $divisor = array_sum(array_map('array_sum', $matrix));
            $offset = 0; 
            imageconvolution($image, $matrix, $divisor, $offset);
            imagejpeg($image, $resized_file,apply_filters( 'jpeg_quality', 90, 'edit_image' ));
            break;
        case IMAGETYPE_PNG:
            return $resized_file;
        case IMAGETYPE_GIF:
            return $resized_file;
    }

    return $resized_file;
}   

add_filter('image_make_intermediate_size', 'ajx_sharpen_resized_files',900);







// show perf. info
// 
function performance( $visible = false ) {

    $stat = sprintf(  '%d queries in %.3f seconds, using %.2fMB memory',
        get_num_queries(),
        timer_stop( 0, 3 ),
        memory_get_peak_usage() / 1024 / 1024
        );

    echo $visible ? $stat : "<!-- {$stat} -->" ;
}
add_action( 'wp_footer', 'performance', 20 );




?>