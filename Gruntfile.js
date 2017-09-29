'use strict';

module.exports = function(grunt) {

    // Time: how long tasks take. Can help when optimizing build times
    require('time-grunt') (grunt);

    //Automatically load required Grunt tasks
    require('jit-grunt') (grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define the configurations for all the tasks
    grunt.initConfig({

        // Sass
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },

        // watch
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },

        // Browser Sync
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.scss',
                        '*.html',
                        'js/*.js'
                    ]
                },

                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },

        // Copy
        copy: {
            html: {
                files: [{
                    // for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    // for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        // clean
        clean: {
            build: {
                src: ['dist/']
            }
        },

        // Imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                     // Enable dynamic expansion
                    cwd: './',                        // Source matches are similar to this path
                    src: ['img/*.{png,jpg,gif}'],     // Actual pattern to match
                    dest: 'dist/'                     // Destination path prefix
                }]
            }
        },

        // Usemin Prepare
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context,block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        // Concat
        concat: {
            options: {
                seperator: ';'
            },
            dist: {}
        },
        
        // Uglify
        uglify: {
            dist:{}
        },

        //Cssmin
        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: ['dist/css/*.css', 'dist/js/*.js']
                }]
            }
        },

        // Usemin
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetDir: ['dir','dist/css','dist/js']
            }
        }
    });

    grunt.registerTask('css', ['sass']);

    grunt.registerTask('default', ['browserSync', 'watch']);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
}