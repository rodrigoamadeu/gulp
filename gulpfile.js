const { series, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-image')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const strip = require('gulp-strip-comments')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create() //importando a biblioteca com método create
const reload = browserSync.reload // variável para recarregar

function tarefasCSS(cb) {

    gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            './vendor/jquery-ui/jquery-ui.css',
            './src/css/style.css'
        ])
        .pipe(stripCss())
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
    
    return cb()

}

function tarefasJS(callback){
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        //'./vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js'

    ])
    .pipe(babel({
        comments: false,
        presets: ['@babel/env']
    }))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))

    return callback()
}

function tarefasImagem(){
    return src.gulp('.src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

// POC - Proof of Concept
function tarefasHTML(callback) {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(strip())
        .pipe(gulp.dest('./dist'))

    return callback() // assim que concluir uma tarefa inicia outra
}

gulp.task ('serve', function(){

    browserSync.init({
        server: {
            baseDir:"./dist" // abre o arquivo no dist
        }
    }) // chama a variável do browserSync e inicia ele com .init()
    gulp.watch('./src/**/*').on('change', process)// repete o processo quando altera algo em src
    gulp.watch('./src/**/*').on('change', reload)   
})

function end(cb){
    console.log("tarefas concluídas")
    return cb()
}

// series x parallel
const process = series( tarefasHTML, tarefasJS, tarefasCSS, end)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem

exports.default = process

