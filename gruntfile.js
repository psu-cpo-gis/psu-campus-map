"use strict";
//Add to avoid deprecation warnings.
var os = require('os'); os.tmpDir = os.tmpdir;
var LIVERELOAD_PORT, lrSnippet, mountFolder;

LIVERELOAD_PORT = 35728;

lrSnippet = require("connect-livereload")({
  port: LIVERELOAD_PORT
});

mountFolder = function(connect, dir) {
  return connect["static"](require("path").resolve(dir));
};

module.exports = function(grunt) {
  var yeomanConfig;
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  yeomanConfig = {
    app: "client",
    dist: "dist"
  };
  try {
    yeomanConfig.app = require("./bower.json").appPath || yeomanConfig.app;
  } catch (_error) {}
  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ["<%= yeoman.app %>/styles/**/*.{scss,sass}"],
        tasks: ["compass:server"]
      },
      less: {
        files: ["<%= yeoman.app %>/styles-less/**/*.less"],
        tasks: ["less:server"]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ["<%= yeoman.app %>/index.html", "<%= yeoman.app %>/config.js", "<%= yeoman.app %>/views/**/*.html", "<%= yeoman.app %>/styles/**/*.scss", "<%= yeoman.app %>/styles-less/**/*.less", ".tmp/styles/**/*.css", "{.tmp,<%= yeoman.app %>}/scripts/**/*.js", "<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}"]
      }
    },
    connect: {
      options: {
        port: 9001,
        hostname: "localhost"
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, yeomanConfig.app)];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, ".tmp"), mountFolder(connect, "test")];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, yeomanConfig.dist)];
          }
        }
      }
    },
    open: {
      server: {
        url: "http://localhost:<%= connect.options.port %>"
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [".tmp", "<%= yeoman.dist %>/*", "!<%= yeoman.dist %>/.git*"]
          }
        ]
      },
      server: ".tmp"
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"]
    },
    compass: {
      options: {
        basePath: "/Users/kms22/Campus_GIS/psu-campus-map/",
        sassDir: "<%= yeoman.app %>/styles",
        cssDir: ".tmp/styles",
        generatedImagesDir: ".tmp/styles/ui/images/",
        imagesDir: "<%= yeoman.app %>/styles/ui/images/",
        javascriptsDir: "<%= yeoman.app %>/scripts",
        fontsDir: "<%= yeoman.app %>/fonts",
        httpImagesPath: "styles/ui/images/",
        httpGeneratedImagesPath: "styles/ui/images/",
        httpFontsPath: "fonts",
        relativeAssets: true
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          debugInfo: true,
          noLineComments: true
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      },
      forvalidation: {
        options: {
          debugInfo: true,
          noLineComments: false
        }
      }
    },
    less: {
      server: {
        options: {
          strictMath: true,
          dumpLineNumbers: true,
          sourceMap: true,
          sourceMapRootpath: "",
          outputSourceFiles: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/styles-less",
            src: "main.less",
            dest: ".tmp/styles",
            ext: ".css"
          }
        ]
      },
      dist: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/styles-less",
            src: "main.less",
            dest: ".tmp/styles",
            ext: ".css"
          }
        ]
      }
    },
    // coffee: {
    //   server: {
    //     options: {
    //       sourceMap: true,
    //       sourceRoot: ""
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         cwd: "<%= yeoman.app %>/scripts",
    //         src: "**/*.coffee",
    //         dest: ".tmp/scripts",
    //         ext: ".js"
    //       }
    //     ]
    //   },
    //   dist: {
    //     options: {
    //       sourceMap: false,
    //       sourceRoot: ""
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         cwd: "<%= yeoman.app %>/scripts",
    //         src: "**/*.coffee",
    //         dest: ".tmp/scripts",
    //         ext: ".js"
    //       }
    //     ]
    //   }
    // },
    useminPrepare: {
      html: "<%= yeoman.app %>/index.html",
      options: {
        dest: "<%= yeoman.dist %>",
        flow: {
          steps: {
            js: ["concat"],
            css: ["concat"]
          },
          post: []
        }
      }
    },
    usemin: {
      html: ["<%= yeoman.dist %>/**/*.html", "!<%= yeoman.dist %>/bower_components/**"],
      css: ["<%= yeoman.dist %>/styles/**/*.css"],
      options: {
        dirs: ["<%= yeoman.dist %>"]
      }
    },
    htmlmin: {
      dist: {
        options: {},
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>",
            src: ["*.html", "views/*.html"],
            dest: "<%= yeoman.dist %>"
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= yeoman.app %>",
            dest: "<%= yeoman.dist %>",
            src: ["favicon.ico", "bower_components/font-awesome/css/*", "bower_components/font-awesome/fonts/*", "bower_components/weather-icons/css/*", "bower_components/weather-icons/font/*", "fonts/**/*", "i18n/**/*", "images/**/*", "styles/bootstrap/**/*", "styles/fonts/**/*", "styles/img/**/*", "styles/ui/images/**/*", "views/**/*", "web.config", "config.js", "_alllayers/**/*", "map-icons/**/*", "geojson/**/*", "search/**/*"]
          }, {
            expand: true,
            cwd: ".tmp",
            dest: "<%= yeoman.dist %>",
            src: ["styles/**", "assets/**"]
          }, {
            expand: true,
            cwd: ".tmp/images",
            dest: "<%= yeoman.dist %>/images",
            src: ["generated/*"]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: "<%= yeoman.app %>/styles",
        dest: ".tmp/styles/",
        src: "**/*.css"
      }
    },
    concurrent: {
      server: [ "compass:server", "copy:styles"],
      dist: ["compass:dist", "copy:styles", "htmlmin"],
      lessServer: [ "less:server", "copy:styles"],
      lessDist: [ "less:dist", "copy:styles", "htmlmin"]
    },
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          "<%= yeoman.dist %>/scripts/app.js": [".tmp/**/*.js", "<%= yeoman.app %>/scripts/**/*.js"]
        }
      }
    }
  });
  grunt.registerTask("server", function(target) {
    if (target === "dist") {
      return grunt.task.run(["build", "open", "connect:dist:keepalive"]);
    }
    return grunt.task.run(["clean:server", "concurrent:server", "connect:livereload", "open", "watch"]);
  });
  grunt.registerTask("lessServer", function(target) {
    if (target === "dist") {
      return grunt.task.run(["buildLess", "open", "connect:dist:keepalive"]);
    }
    return grunt.task.run(["clean:server", "concurrent:lessServer", "connect:livereload", "open", "watch"]);
  });
  grunt.registerTask("build", ["clean:dist", "useminPrepare", "concurrent:dist", "copy:dist", "concat", "uglify", "usemin"]);
  grunt.registerTask("buildLess", ["clean:dist", "useminPrepare", "concurrent:lessDist", "copy:dist", "concat", "uglify", "usemin"]);
  return grunt.registerTask("default", ["server"]);
};
