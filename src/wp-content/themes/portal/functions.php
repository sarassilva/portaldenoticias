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

header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:8080");

function allow_cors() {
    header("Access-Control-Allow-Origin: http://localhost:3000"); // Ajuste para o domínio correto
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    // Para a requisição OPTIONS (pré-vôo)
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
}

add_action('init', 'allow_cors');
