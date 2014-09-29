module.exports = {

    // CONNECT
    // https://github.com/gruntjs/grunt-contrib-connect

    options: {
        livereload: 7999,
        port: 8999,
    },
    base: {
        options: {
            base: ['app', '.', '../..'],
            open: false,
        },
    },
    full: {
        options: {
            base: ['app', '.', '../..'],
            //hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
            open: 'http://localhost:8999', // target url to open
        },
    },
};
