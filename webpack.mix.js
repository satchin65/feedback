
let mix = require('laravel-mix');


const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

mix.webpackConfig({
    plugins: [
        new BrowserSyncPlugin({
            open: 'external',
            host: 'feedstack.dev',
            proxy: 'feedstack.dev',
            files: ['resources/views/**/*.php', 'app/**/*.php', 'routes/**/*.php']
        })]
});


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
<<<<<<< HEAD
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'dist/app.js');
mix.js('node_modules/chart.js/src/chart.js', 'dist/chart.js');

mix.sass('resources/assets/sass/app.scss', 'dist/').sourceMaps();



// Full API
// mix.js(src, output);
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.combine(files, destination);
// mix.copy(from, to);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.