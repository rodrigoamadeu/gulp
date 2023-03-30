const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')//a variável uglify chama o pacote instalado 'gulp-uglify'

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

exports.styles = tarefasCSS
exports.scripts = tarefasJS