<?php
/**
 * Plugin Name: My Gutenberg App
 * Description: A simple Gutenberg app that fetches and displays pages.
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function my_gutenberg_app_enqueue_assets( $admin_page ) {
    if ( 'toplevel_page_my-gutenberg-app' !== $admin_page ) {
        return;
    }

    $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'my-gutenberg-app',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset['dependencies'],
        $asset['version'],
        true
    );
}
add_action( 'admin_enqueue_scripts', 'my_gutenberg_app_enqueue_assets' );

function my_gutenberg_app_render() {
    echo '<div id="my-first-gutenberg-app"></div>';
}

function my_gutenberg_app_menu() {
    add_menu_page(
        'Gutenberg App',
        'Gutenberg App',
        'manage_options',
        'my-gutenberg-app',
        'my_gutenberg_app_render',
        'dashicons-admin-generic',
        20
    );
}
add_action( 'admin_menu', 'my_gutenberg_app_menu' );
