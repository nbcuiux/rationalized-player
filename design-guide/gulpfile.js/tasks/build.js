var gulp            = require('gulp');
gulp.task('build', ['copyScripts', 'copyImg', 'copyFonts', 'copyTheme', 'iconfont', 'scripts', 'styles']);
