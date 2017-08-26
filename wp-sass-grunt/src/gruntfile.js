module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// chech our JS
		jshint: {
			options: {
				"bitwise": true,
				"browser": true,
				"curly": true,
				"eqeqeq": true,
				"eqnull": true,
				"esnext": true,
				"immed": true,
				"jquery": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"node": true,
				"strict": false,
				"trailing": true,
				"undef": true,
				"globals": {
					"jQuery": true,
					"alert": true
				}
			},
			all: [
				'gruntfile.js',
				'js/script.js'
			]
		},

		// concat and minify our JS
		uglify: {
			dev: {
				files: {
					'../js/scripts.top.js':
					[
						'js/modernizr-2.8.3.custom.js',
					],
					'../js/scripts.btm.js':
					[
						'js/scripts.js'
					]
				}
			}
		},

		// compile your sass
		sass: {
			options: {
					//compass: true,
			},
			dev: {
				options: {
					style: 'expanded',
				},
				src: ['scss/style.scss'],
				dest: '../style.css'
			}
		},


		sprite:{
			all: {
				src: 'images/sprites/*.png',
				dest: 'images/sprite.png',
				destCss: 'scss/inc/_sprite.scss',
				imgPath: '../images/sprite.png',
				padding: 3,
				algorithm: 'top-down' // top-down || left-right || diagonal || alt-diagonal
			}
		},

		postcss: {
			options: {
				map: true, // inline sourcemaps 
				processors: [
					require('pixrem')(), // add fallbacks for rem units 
					require('autoprefixer-core')({browsers: 'last 2 versions'}) // add vendor prefixes 
					//require('cssnano')() // minify the result 
				]
			},
			dev: {
				src: '../*.css'
			}
		},

		svg2png: {
	        all: {
	            // specify files in array format with multiple src-dest mapping 
	            files: [
	                // rasterize all SVG files in "img" and its subdirectories to "img/png" 
	                { cwd: 'images/', src: ['**/*.svg'], dest: 'images/png/' }
	            ]
	        }
	    },

		// watch for changes
		watch: {
			dev: {
				files: ['scss/**/*.scss','js/**/*.js', 'gruntfile.js'],
				tasks: [
					'sass:dev',
					'newer:imagemin:dev',
					'newer:jshint',
					'newer:uglify',
					'postcss:dev'
				]
			}
		},
		

		imagemin: {
			dev: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: '',
					src: ['images/**/*.{png,jpg,gif}'],
					dest: '../'
				}]
			}
			
		}
	});

	// Load NPM's
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Development task
	grunt.registerTask('default', [
		'newer:uglify',
		'sprite',
		'sass:dev',
		'newer:imagemin',
		'postcss:dev',
		'watch:dev'
	]);

	
};