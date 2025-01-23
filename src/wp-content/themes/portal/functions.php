<?php
function react_theme_scripts() {
    wp_enqueue_script(
        'react-app',
        get_template_directory_uri() . '/dist/main.js', 
        array(), 
        null, 
        true 
    );
}
add_action('wp_enqueue_scripts', 'react_theme_scripts');

add_theme_support( 'post-thumbnails' );

add_action('rest_api_init', function () {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Credentials: true');
});
