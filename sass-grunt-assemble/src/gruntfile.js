module.exports = function(grunt) {

	grunt.initConfig({
		site: grunt.file.readYAML('data/site.yml'),
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
				"laxcomma": true,
				"globals": {
					"jQuery": true,
					"alert": true
				}
			},
			all: [
				'gruntfile.js',
				'js/main.js'
			]
		},

		// concat and minify our JS
		uglify: {
			dist: {
				files: {
					'../js/scripts.top.js':
					[
						'js/vendor/modernizr-2.8.3.min.js'
					],

					'../js/scripts.btm.js':
					[
						'js/vendor/jquery-1.11.2.min.js',
						'js/main.js'
					]
				}
			}
		},

		// compile your sass
		sass: {
			options: {},
			dev: {
				options: {
					style: 'expanded',
				},
				src: ['scss/main.scss'],
				dest: '../css/main.css'
			},
			prod: {
				options: {
					style: 'compressed'
				},
				src: ['scss/main.scss'],
				dest: '../css/main.css'
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
					require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes 
					require('cssnano')() // minify the result 
				]
			},
			dist: {
				src: '../css/*.css'
			}
		},


		// watch for changes
		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: [
					'sass:dev',
					'postcss'
				]
			},
			js: {
				files: [
					'<%= jshint.all %>'
				],
				tasks: [
					'jshint',
					'uglify'
				]
			},
			hbs: {
				files: ['templates/**/*'],
				tasks: [
					'assemble'
				]
			},
			img: {
				files: ['images/**/*.{png,jpg,gif}'],
				tasks: [
					'imagemin'
				]
			}
		},

		imagemin: {
			dynamic: {
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
		},


		assemble: {
			// Task-level options
			options: {
				prettify: {indent: 2},
				marked: {sanitize: false},
				production: true,
				data: 'data/**/*.{json,yml}',
				assets: '<%= site.destination %>/assets',
				helpers: 'helpers/helper-*.js',
				layoutdir: 'templates/layouts',
				partials: ['templates/includes/**/*.hbs'],
			},
			site: {
				// Target-level options
				options: {
					layout: 'default.hbs'
				},
				files: [{ 
					expand: true, 
					cwd: 'templates/pages', 
					src: ['*.hbs'], 
					dest: '<%= site.destination %>/' 
				}]
			}
		},
	});

	// Load NPM's via matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('assemble');

	// Development task
	grunt.registerTask('default', [
		'jshint',
		'uglify',
		'sprite',
		'sass:dev',
		'imagemin',
		'assemble',
		'postcss',
		'watch'
	]);

};