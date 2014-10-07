module.exports = {

    // CONNECT
    // https://github.com/tomusdrw/grunt-sync

    base: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/wf-ecg/_model_/0/'
        }],
        //pretend: true,
        updateOnly: true, // Don't remove any files from `dest` (works around 30% faster)
    },
    full: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/wf-ecg/_model_/0/'
        }],
        //pretend: true,
        updateOnly: false, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
};
