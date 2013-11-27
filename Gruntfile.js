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
          environment: 'production'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/src/**/*.js',
        '!js/scripts.js'
      ]
    },
    uglify: {
      prod: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/scripts.js': ['js/scripts.js']
        }
      }
    },
    concat: {
      dist: {
        src: ['js/src/**/*.js'],
        dest: 'js/scripts.js'
      }
    },
    favicons: {
      options: {
        trueColor: true,
        precomposed: true,
        appleTouchBackgroundColor: "#e2b2c2",
        coast: true,
        windowsTile: true,
        tileBlackWhite: false,
        tileColor: "auto",
        HTMLPrefix: "/img/icons/"
      },
      icons: {
        src: 'logo.png',
        dest: 'img/icons'
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
  // Task aliases and tasks
  grunt.registerTask('prod', [
    'compass:prod',
    'concat',
    'uglify:prod'
  ]);
};
