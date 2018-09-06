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

mix.js(['resources/assets/js/app.js'					   		   		   		   
	   ],'public/js/app.js')
   .scripts([
        'resources/assets/js/layout.js',
        'resources/assets/js/toastr.js'               
    ], 'public/js/plantilla.js')
   .sass('resources/assets/sass/app.scss', 'public/css')   
   .styles(['resources/assets/css/layout.css',
   			'resources/assets/css/toastr.css',
   		    'resources/assets/css/estilos.css'
   		   ],'public/css/estilos.css');
