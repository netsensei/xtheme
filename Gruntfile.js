module.exports = function (grunt) {
  "use strict";
  var neat = require('node-neat').includePaths;
  var bourbon = require('node-bourbon').includePaths;
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
          hostname: '',
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['./js/src/**/*.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['./index.html']
      },
      pictures: {
        files: ['./img/**/*']
      },
      css: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/src/**/*.js',
        '!js/scripts.gen.js'
      ]
    },
    uglify: {
      prod: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/scripts.gen.js': ['js/scripts.js']
        }
      }
    },
    favicons: {
      options: {
        trueColor: true,
        precomposed: false,
        appleTouchBackgroundColor: "#f5f5dc",
        coast: true,
        windowsTile: true,
        tileBlackWhite: false,
        tileColor: "auto",
        html: 'index.html',
        HTMLPrefix: "/sites/all/themes/xtheme/img/icons/"
      },
      icons: {
        src: 'icon.png',
        dest: 'img/icons'
      }
    },
    copy:{
      favicon: {
        src: 'img/icons/favicon.ico',
        dest: 'favicon.ico'
      }
    },
    sass: {
      options: {
        includePaths: neat,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          './css/style.css': './sass/style.scss',
          './css/print.css': './sass/print.scss',
          './css/wysiwyg.css': './sass/wysiwyg.scss'
        }
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  // Task aliases and tasks
  grunt.registerTask('server', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('prod', [
    'uglify:prod'
  ]);
  grunt.registerTask('icons', [
    'favicons',
    'copy:favicon'
  ]);

  // Default task.
  grunt.registerTask('default', 'server');
};
