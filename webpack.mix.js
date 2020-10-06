const mix = require('laravel-mix')

mix.js('src/vue.js', 'public/js').vue({version: 2});
mix.sass('src/app.scss', 'public/css');