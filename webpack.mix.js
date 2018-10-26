let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
mix.js('resources/assets/js/admin/main.js', 'public/build/js')
   .sass('resources/assets/js/admin/assets/scss/style.scss', 'public/build/css');
mix.browserSync({
    proxy: {
        target: 'localhost:8000',
        reqHeaders: function () {
            return {
                host: "localhost:3000"
            };
        }
    },
    injectChanges: true,
    files: ['public/**', '!public/**.map', '!public/build/**']
});
