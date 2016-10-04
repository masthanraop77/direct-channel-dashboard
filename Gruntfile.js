'use strict';
module.exports = function (grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('jshint');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
         options: {
             paths: ["src/css"],
             cleancss: true
         },
         files: {
                    "src/css/style.css": "src/less/style.less",
                    "src/css/jquery.jqplot.css": "src/less/jquery.jqplot.less",
                
                }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build/',
          keepalive: true,
          hostname: '*'
        }
      }
    },
	
	jshint: {
      all: [
        'src/modules/**/*.js'
      ]
    },
	
    watch: {
      options: {
        atBegin: true
      },
      less: {
        files: ['src/less/*.less'],
        tasks: ['less']
      },
      index: {
        files: 'index.html',
        tasks: ['copy:index']
      },
	    srcFiles: {
        files: ['src/modules/**/*.js', 'src/module/**/*.html'],
        tasks: ['copy:modules']
      }
    },
    copy: {
      npmLib:{
        expand: true,
        cwd   :'node_modules/bootstrap/dist/css/',
        src   : ['bootstrap-theme.min.css', 'bootstrap.min.css',],
        dest  : 'src/css/'
      },
      lib:{
        expand: true,
        cwd   :'src',
        src: 'lib/**',
        dest: 'build/'
      },
      index: {
        src: 'index.html',
        dest: 'build/'
      },
      appJS: {
        expand: true,
        cwd   :'src',
        src: 'app.js',
        dest: 'build/'
      },
	  modules: {
		expand:true,
		cwd: 'src',
		src: 'modules/**',
		dest:'build/'
      },	  
  	  imgs: {
  		  expand: true,
        cwd   :'src',
        src: 'images/*',
  		  dest: 'build/'
  	  },
      css:{
        expand: true,
        cwd   :'src',
        src: 'css/*',
        dest: 'build/'
      },
      jsons:{
        expand: true,
        cwd   :'src',
        src: 'json/*',
        dest: 'build/'
      },
      fonts:{
        expand: true,
        cwd   :'src',
        src: 'fonts/*',
        dest: 'build/'
      }
    },
    clean: {
      all: {
        src: ['build/']
      },
      srcCSS: {
        src: ['src/css/']
      }
    }

  });
  grunt.registerTask('default', ['clean', 'connect:server']);
  grunt.registerTask('server', ['clean', 'less', 'jshint', 'copy']);
};
