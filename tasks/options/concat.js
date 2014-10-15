module.exports = {

    // CONCAT
    // https://github.com/gruntjs/grunt-contrib-concat

    options: {
        banner: ';\n'
        + '/* = = = = = = = '
        + '<%= pkg.name %> '
        + '<%= grunt.task.current.name %> '
        + '= = = = = = = = */\n',
        separator: ';\n'
        + '/* = = = = = = = '
        + '<%= grunt.task.current.target %> '
        + '<%= grunt.template.today("isoDateTime") %> '
        + '= = = = = = = = */\n',
        sourceMap: true,
    },
    bootstrap: {
        options: {
            sourceMap: false, // see uglify for map
        },
        files: {
            'app/build/boot.js': [
                'libs/bootstrap/jquery.js',
                'libs/bootstrap/modernizr.js',
                'libs/bootstrap/lodash.underscore.js',
                'libs/bootstrap/console.js',
                'libs/bootstrap/global.js',
                'libs/bootstrap/*.js',
            ],
        },
    },
    base: {
        options: { sourceMap: false, },
        files: {
            'app/build/lib.js': ['libs/*.js'],
            'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_[a-z]*.js'],
        },
    },
    full: {
        files: {
            'app/build/lib.js': ['libs/*.js'],
            'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_[a-z]*.js'],
        },
    },
    libs: {
        files: {
            'app/build/bootstrap.js': [ 'libs/bootstrap/*.js'],
            'app/build/poly.js': [ 'libs/poly/*.js'],
            'app/build/xtend.js': [ 'libs/xtend/*.js'],
        },
    },
};

