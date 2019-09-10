
var path = require('path');
var siteConfig = require('../site-config.json');

module.exports = {
    root: {
        src: path.join(__dirname, '../src'),
        dest: path.join(__dirname, '../wordpress/wp-content/themes/nbcuux-portfolio/')
    },
    watchableTasks: ['copyScripts', 'copyImg', 'copyFonts', 'copyTheme', 'ejs', 'scripts', 'styles', 'iconfont'],
    tasks: {
        browserSync: {

            // Proxy through another webserver
            port: 3333,
            proxy: {
                target: siteConfig.siteUrl
            }
            
        },
        node: {
            src: 'js/*',
            extensions: ['js']
        },
        scripts: {
            src: 'js/client',
            dest: 'assets/js',
            input: ['main.js'],
            output: 'app.js',
            extensions: ['js']
        },
        copyScripts: {
            src: 'js/vendor',
            dest: 'assets/js',
            extensions: ['js']
        },
        copyImg: {
            src: 'img',
            dest: 'assets/img',
            extensions: ['jpg', 'svg', 'png', 'gif']
        },
        copyFonts: {
            src: 'fonts',
            dest: 'assets/fonts',
            extensions: ['woff', 'eot', 'woff2', 'svg', 'ttf', 'otf']
        },
        copyTheme: {
            src: 'theme',
            dest: '.',
            extensions: ['php', 'css', 'html', 'twig']
        },
        styles: {
            src: 'styles',
            dest: 'assets/css',
            sources: [
                { input: 'styles.scss', output: 'style.css'},
            ],
            extensions: ['scss','sass','css']
        },
        ejs: {
            src: 'templates',
            dest: '.',
            extensions: ['ejs']
        },   
        sprite: {
            src: 'images/',
            dest: 'assets/css/img/',
            cssDest: './src/styles',
            imgName: 'sprite.png',
            retinaImgName: 'sprite@2x.png',
            cssName: 'sprite.scss',
            extensions: ['png']
        },
        iconfont: {
            src: 'icons/',
            dest: 'assets/fonts/',
            template: 'icons/templates/webfont.template.css',
            cssDest: './src/styles',
            cssName: '_icons.scss',
            extensions: ['svg'],
            config: {
                fontName: 'icons', // required
                appendUnicode: true, // recommended option
                formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
                timestamp: Math.round(Date.now()/1000), // recommended to get consistent builds when watching files
                normalize: true,
                fontHeight: 500
            }
        },
    }
};
