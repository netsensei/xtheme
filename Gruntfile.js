
module.exports = function (grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: false,
          hostname: ''
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['./js/**/*.js'],
        tasks: ['jshint']
      },
      html:{
        files: ['./index.html']
      },
      pictures:{
        files: ['./img/**/*']
      },
      css:{
        files: ['./sass/**/*.scss'],
        tasks: ['compass:dev']
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: './sass',
          cssDir: './css'
        }
      },
      prod: {
        options: {
          sassDir: './sass',
          cssDir: './css'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/**/*.js',
        '!js/**/*.min.js'
      ]
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Task aliases and tasks
  grunt.registerTask('serve', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);
  grunt.registerTask('prod', [
    'compass:prod'
  ]);
};
