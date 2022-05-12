const {src,dest,watch,series}= require('gulp');

//CSS I SASS
const sass = require('gulp-sass')(require('sass'));
const postcss=require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');


//IMAGENES
const imagemin=require('gulp-imagemin');
const webp = require('gulp-webp');
const avif=require('gulp-avif');

function css(done){
    console.log("compilando css");
    //pasos: 1- identificar archivos 2.- compilarla 2. guardar css

    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))


    done();

}

function imagenes(done){
    src('src/img/**/**')
        .pipe(imagemin({optimizationLevel:3}))
        .pipe(dest('build/img'));

    done();
}

const opciones = {
    quality:50
}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

function versionAvif(){
    
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function dev(){
    watch('src/scss/**/**.scss',css);
    watch('src/img/**.*',imagenes);
}


exports.css = css;
exports.dev = dev;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.default=series(imagenes,versionWebp,versionAvif,css,dev);