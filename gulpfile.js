const elixir = require('laravel-elixir');

require('laravel-elixir-vue');
require('laravel-elixir-livereload');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
     mix.sass('app.scss')
        .webpack('app.js')
        .scripts([
             'libs/jquery.min.js',
             'libs/sweetalert.min.js',
             'jquery/jquery.tab-navigation.js',
            'jquery/dropit.js',
            'jquery/forms.js',
            './node_modules/chosen-js/chosen.jquery.js',
          ], 'public/js/libs.js')
        .styles([
            'libs/sweetalert.css',
            './node_modules/chosen-js/chosen.css',
        ], 'public/css/libs.css')
        .livereload();

    mix.browserSync({
        proxy: 'feedstack.dev'
    });

});
