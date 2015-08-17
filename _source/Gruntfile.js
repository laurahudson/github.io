module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			bower: 'bower_components',
			jekyll: {
				config: '../_config.yml',
				development: '../public',
			},
			js: '_js',
			'static': '../static',
			source: '..',
			scss: '_scss',
		},

		concat: {
			options: {
				stripBanners: true,
				seperator: grunt.util.linefeed + grunt.util.linefeed + grunt.util.linefeed
			},

			dev: {
				src: [
					// Webfontloader
					'bower_components/webfontloader-min/webfont.js',

					// Holderjs
					'bower_components/holderjs/holder.js',
					
					// Jquery
					'bower_components/jquery/dist/jquery.js',

					// Foundation
					'bower_components/foundation/js/foundation.js',
					'bower_components/foundation/js/foundation/foundation.equalizer.js',
					
					// Modernizr
					'bower_components/modernizr/modernizr.js',
					
					// Custom
					'bower_components/jquery-visible/jquery.visible.min.js',
					'<%= path.js %>/featherlight.js', 
					'<%= path.js %>/<%= pkg.name %>.js', 
				],
				dest: 'temp/<%= pkg.name %>-build.js',
			},
		},

		jekyll: {
			dev: {
				options: {
					config: '<%= path.jekyll.config %>',
					src: '../',
					dest: '<%= path.jekyll.development %>',
				},
			},
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= path.js %>/<%= pkg.name %>*.js'
			]
		},

		sass: {
			dev: {
				options: {
					lineNumbers: true,
					loadPath: ['_scss/','<%= path.bower %>/'],
					// sourcemap: 'auto',
					// style: 'compressed',
					trace: true,
				},
				files: {
					'<%= path.static %>/<%= pkg.name %>.css': '<%= path.scss %>/<%= pkg.name %>.scss',
				},
			}
		},

		uglify: {
			dev: {
				options: {
					preserveComments: 'some',
					report: 'min',
				},

				files: {
					'<%= path.static %>/<%= pkg.name %>.js': ['temp/<%= pkg.name %>-build.js'],
				},
			},
		},

		watch: {
			options: {
				debounceDelay: 1000,
				interrupt: true,
				livereload: true, // <script src="//frequency-precision:35729/livereload.js"></script>
			},
			_html: {
				files: [
					'<%= path.source %>/_data/*.yml',
					'<%= path.source %>/_includes/*.html',
					'<%= path.source %>/_includes/**/*.html',
					'<%= path.source %>/_layouts/*.html',
					'<%= path.source %>/_posts/*.markdown',
					'<%= path.source %>/*.html',
					'<%= path.source %>/*.yml',
				],
				tasks: ['html'],
			},
			_css: {
				files: ['<%= path.scss %>/*.scss'],
				tasks: ['css', 'html']
			},
			_js: {
				files: ['<%= path.js %>/*.js'],
				tasks: ['js', 'html']
			},
		},
	});

	// Register.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Tasks.
	grunt.registerTask('default', ['js','css','html']);
	grunt.registerTask('css', ['sass:dev', 'html']);
	grunt.registerTask('html', ['jekyll:dev']);
	grunt.registerTask('js', ['jshint', 'concat:dev', 'uglify:dev', 'html']);
	grunt.registerTask('dev', ['css','html']);
	grunt.registerTask('dev js', ['js']);
};
