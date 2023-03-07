const gulp = require('gulp') // importando o gulp que está em algum lugar em minha máquina -- o gulp é baseada em tasks == tarefas
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')


function tarefasCSS(cb) { // cb == callback

    return gulp.src('./vendor/**/*.css') // busca os arquivos que estão dentro da pasta vendor e o ** pega todo diretório dentro da pasta vendor
        .pipe(concat('libs.css')) // faz a concatnação vai unificar todos os arquivos da pasta vendor dentro de libs
        .pipe(cssmin()) // faz a minificação dos arquivos css
        .pipe(rename({ suffix: '.min'})) // vai renomear o arquivo para libs.min.css
        .pipe(gulp.dest('./dist/css')) // pipe é o método que vai fazer o tratamento do arquivo. já o (gulp.dest) é o parametro que vai pegar o arquivo acima e vai enviar para um destino diferente de que ele estava, ou seja pega todo arquivo e manda para pasta .dist que será onde armazenamos o projeto já concluído pronto para enviar ao servidor
}

function tarefasJS(){

    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify()) // faz a minificação dos arquivos JS
        .pipe(rename({ suffix: '.min'})) // libs.min.js
        .pipe(gulp.dest('./dist/js'))
}

exports.styles = (tarefasCSS)
exports.scripts = (tarefasJS)
