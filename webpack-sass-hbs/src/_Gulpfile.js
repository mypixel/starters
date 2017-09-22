// get all the gulp modules
//
var gulp                = require('gulp')
,   sass                = require('gulp-sass')
,   sourcemaps          = require('gulp-sourcemaps')
,   autoprefixer        = require('gulp-autoprefixer')
,   hbs                 = require('gulp-hb')
;




// variables for DRY-ness (and means we dont have to edit the tasks once setup)
//
var sassInput           = './scss/**/*.scss'
,   cssOutput           = './build/css'
,   sassOptions         = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    }
,   autoprefixerOptions = {
        browsers: [
            'last 2 versions',
            '> 5%'
        ]
    }
;




// tasks
//

gulp.task( 'default', ['sass', 'watch']);


gulp.task('hbs', function () {

    var hbStream = hbs()
        // Partials
        .partials('./templates/includes/**/*.{hbs,js}')
        .partials('./templates/layouts/**/*.{hbs,js}')


        // Helpers
        //.helpers(require('handlebars-layouts'))
        //.helpers('./templates/helpers/**/*.js')

        // Data
        //.data('./data/**/*.{js,json}')
        //.data({
        //    lorem: 'dolor',
        //    ipsum: 'sit amet'
        //});

    return gulp
        .src('./templates/pages/*.hbs')
        .pipe(hbStream)
        .pipe(gulp.dest('./build'));
});


gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from src/scss folder
    .src( sassInput )

    // create srcmaps
    .pipe( sourcemaps.init() )

    // process sass, using options set above, log any errors
    .pipe( sass( sassOptions ).on('error', sass.logError))

    // output maps
    .pipe(sourcemaps.write() )

    // autoprefix all the things
    .pipe( autoprefixer( autoprefixerOptions ) )

    // send CSS to output folder
    .pipe( gulp.dest( cssOutput ) );
});


gulp.task('watch', function() {
  return gulp

    .watch( sassInput, ['sass'])

    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});