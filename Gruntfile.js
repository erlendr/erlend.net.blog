module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      dev: {
        dest: 'public/lib',
        options: {
          expand: true
        }
      },

    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
        'public/lib/jquery/jquery.js',
        'public/lib/bootstrap/dist/bootstrap.js'
        ],
        // the location of the resulting JS file
        dest: 'public/javascripts/blog.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'routes/**/*.js',
          '*.js',
          ],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
      public: {
        files: ['public/lib/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      }
    },
    jshint: {
      all: [
      'routes/*.js',
      'views/*.js',
      '*.js',
      ]
    }
  }); 

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
};