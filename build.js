({
    name: 'config',
    mainConfigFile: 'app/config.js',
    out: 'app/build/app.js',
    optimize: "uglify",
    uglify: {
        beautify: false,
        max_line_length: 255,
        no_mangle: true
    },
    _runcmd_: 'node /usr/local/bin/r.js -o build.js'
})
