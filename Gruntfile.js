
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
        files: ['./js/**/*.js']
      },
      html:{
        files: ['./index.html']
      },
      pictures:{
        files: ['./img/**/*']
      },
      css:{
        files: ['./sass/**/*.scss'],
        tasks: ['compass']
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: './sass',
          cssDir: './css'
        }
      }
    },
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Task aliases and tasks
  grunt.registerTask('preview', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('w', [
    'connect',
    'watch'
  ]);
};
