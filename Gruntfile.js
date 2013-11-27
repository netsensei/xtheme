module.exports = function (grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['./js/src/**/*.js'],
        tasks: ['jshint','concat']
      },
      html: {
        files: ['./index.html']
      },
      pictures: {
        files: ['./img/**/*']
      },
      css: {
        files: ['./sass/**/*.scss'],
        tasks: ['compass:dev']
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: './sass',
          cssDir: './css',
          environment: 'development'
        }
      },
      prod: {
        options: {
          sassDir: './sass',
          cssDir: './css',
          environment: 'production',
          force: true
        }
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
          'js/scripts.gen.js': ['js/scripts.gen.js']
        }
      }
    },
    concat: {
      dist: {
        src: ['js/src/**/*.js'],
        dest: 'js/scripts.gen.js'
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
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Task aliases and tasks
  grunt.registerTask('prod', [
    'compass:prod',
    'concat',
    'uglify:prod'
  ]);
  grunt.registerTask('icons', [
    'favicons',
    'copy:favicon'
  ]);
};
