const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')//a variável uglify chama o pacote instalado 'gulp-uglify'
const image = require('gulp-image')

function tarefasCSS(cb){

    return gulp.src('./vendor/**/*.css')
        .pipe(concat ('libs.css')) //concatena todos arquivos
        .pipe(cssmin())// minificação arquivos css
        .pipe(rename({ suffix: '.min'})) //renomeia usando sufixo
        .pipe(gulp.dest('./dist/css')) //cria pasta destino e manda os arquivos
}

function tarefasJS(){
    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // libs.min.js
        .pipe(gulp.dest('./dist/js'))

}

function tarefasImagem(){
    
    return gulp.src('./src/images/*')
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


exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem