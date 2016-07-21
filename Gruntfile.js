/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    ngAnnotate: {
      oprions : {
          singleQuotes: true
      },
      app: {
          files: {
              './js/app/app.js' : [ './dist/app/app.js' ]
          }
      }
    },
    concat: {
      dist: {
        src: ['dist/js/app/*.js'],
        dest: 'dist/js/app/app.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/app/app.js'
      }
    },
    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: './',
          src: 'dist/js/app/*.js',
          dest: './'
        }]
      }
    },
    copy: {
      files: {
        cwd: './',
        src: [
           'index.html', 
           'pages/*', 
           'json/*', 
           'js/app/*', 
           'js/bootstrap/*', 
           'js/jquery/*', 
           'js/angular/*',  
           'css/*', 
           'img/*'],
        dest:'dist/',
        expand: true
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task.
  grunt.registerTask('build', ['copy', 'concat', 'ngAnnotate', 'uglify']);
};
