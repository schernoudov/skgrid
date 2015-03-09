module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n',
                banner: '(function ($, window, undefined) {\r\n    /*jshint validthis: true */\r\n    "use strict";\r\n\r\n',
                footer: '\r\n})(jQuery, window);'
            },
            dist: {
                // the files to concatenate
                src: ['src/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['jshint', 'concat']);
};