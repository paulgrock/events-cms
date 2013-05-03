module.exports = function(grunt){
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            files: ['Gruntfile.js', 'views/src/javascripts/**/*.js']
        },

        // Files to be concatenated … (source and destination files)
        concat: {
            js: {
                src: [
                    'views/src/javascripts/vendor/jquery/*.js',
                    'views/src/javascripts/vendor/underscore/underscore-min.js',
                    'views/src/javascripts/vendor/**/*.js',
                    'views/src/javascripts/koala.js',
                    'views/src/javascripts/templates/*.js',
                    'views/src/javascripts/models/*.js',
                    'views/src/javascripts/collections/*.js',
                    'views/src/javascripts/views/*.js'
                ],
                dest: 'public/javascripts/koala-compiled.js'
            }
        },
        stylus: {
            compile: {
                options: {
                    'include css': true
                },
                files: {
                    'public/stylesheets/koala-compiled.css':
                    [
                        'views/src/stylesheets/koala.styl'
                    ]
                }
            }
        },

        uglify: {
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: 'public/javascripts/koala-compiled.min.js'
            }
        },
        watch: {
            src: {
                files: ['<%= concat.js.src %>','views/src/stylesheets/**/*.styl'],
                tasks: ['default']
            }
        }
    });

    grunt.registerTask('default', [
        'concat',
        'uglify',
        'stylus'
    ]);
};
