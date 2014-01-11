module.exports = function (grunt) {
  "use strict";
  var neat = require('node-neat').includePaths;
  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['./js/**/*.js'],
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
        tasks: ['sass:dev']
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
    copy: {
      favicon: {
        src: 'img/icons/favicon.ico',
        dest: 'favicon.ico'
      }
    },
    sass: {
      options: {
        includePaths: neat
      },
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          './css/style.css': './sass/style.scss',
          './css/print.css': './sass/print.scss',
          './css/wysiwyg.css': './sass/wysiwyg.scss'
        }
      },
      dev: {
        options: {
          outputStyle: 'nested'
        },
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
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  // Task aliases and tasks
  grunt.registerTask('prod', [
    'uglify:prod',
    'sass:prod'
  ]);
  grunt.registerTask('icons', [
    'favicons',
    'copy:favicon'
  ]);
  // Default task.
  grunt.registerTask('default', 'watch');
};
