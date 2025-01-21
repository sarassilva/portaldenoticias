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
