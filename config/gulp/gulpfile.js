const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const plugins = require('gulp-load-plugins')();
const proxy = require('http-proxy-middleware')
const pngquant = require('imagemin-pngquant');
const {
  series,
  src,
  dest
} = require('gulp');
const path = {
  srcPath: 'src/',
  proPath: 'app/'
}
/* proxy url match */

const sources = []

// clean dist
function clean() {
  return src([path.proPath])
    .pipe(plugins.clean());
}
// copy static

function copyStatic(folder = []) {
  const globs = path.srcPath + '/?(' + folder.join('|') + ')/**'
  return src(globs)
    .pipe(dest(path.proPath))
}


// uglify js
function jsuglify() {
  return src([path.srcPath + 'script/**', '!' + path.srcPath + 'script/plugin/**', '!' + path.srcPath + 'script/util/**', '!' + path.srcPath + 'script/**/*.json']) // 要压缩的js文件
    .pipe(plugins.uglify()) //使用uglify进行压缩
    .pipe(rev())
    .pipe(dest(path.proPath + 'script/')) //压缩后的路径
    .pipe(rev.manifest())
    .pipe(dest(path.proPath + '/rev/js'))
}
// uglify css
function cssminify() {
  return src([path.srcPath + 'css/**/*.css', '!' + path.srcPath + 'css/font-awesome/**']) // 要压缩的css文件
    .pipe(plugins.cleanCss({
      compatibility: 'ie8',
      inline: false
    })) //使用cleanCss进行压缩
    .pipe(rev()) // 文件名加MD5后缀
    .pipe(dest(path.proPath + 'css')) //压缩后的路径
    .pipe(rev.manifest()) // 生成一个rev-manifest.json文件，记录MD5的文件改名前后的对应关系
    .pipe(dest(path.proPath + '/rev/css')) // 将 rev-manifest.json 保存到 rev
}
// uglify image
function imagemin() {
  return src(path.srcPath + 'img/**') // 要压缩的img文件
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }], //不要移除svg的viewbox属性
      use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    })) //使用imagemin进行压缩
    .pipe(dest(path.proPath + 'img')); //压缩后的路径
}
// rev asset
function revCss() {
  return src([path.proPath + 'rev/**/*.json', path.proPath + 'css/import*.css'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(dest(path.proPath + 'css'));
}

function revJs() {
  return src([path.proPath + 'rev/**/*.json', path.proPath + 'script/control/import*.js'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(dest(path.proPath + 'script/control'));
}

function revHtml() {
  return src([path.proPath + 'rev/**/*.json', path.srcPath + '**/*.html'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(dest(path.proPath));
}
// clean rev file
function cleanRev() {
  return src([path.proPath + 'rev'])
    .pipe(plugins.clean());
}
/**
 * proxy route filter
 * @pathname url
 */
const filter = function (pathname, req) {
  const flag = sources.some((item) => {
    return pathname.indexOf(item) >= 0
  })
  return flag
}

function dev() {
  plugins.connect.server({
    name: 'dev App',
    root: path.srcPath,
    port: 8080,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy(filter, {
          target: '',
          changeOrigin: true
        })
      ]
    }
  });
}


function pro() {
  plugins.connect.server({
    name: 'pro App',
    root: path.proPath,
    port: 8080,
    middleware: function (connect, opt) {
      return [
        proxy(filter, {
          target: '',
          changeOrigin: true
        })
      ]
    }
  });
}
exports.build = series(clean, copyStatic, jsuglify, cssminify, imagemin, revCss, revJs, revHtml, cleanRev);

exports.pro = series(pro);

exports.dev = series(dev);

exports.default = series(dev);
