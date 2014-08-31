module.exports = {

    // CONNECT
    // https://github.com/tomusdrw/grunt-sync

    main: {
        files: {
            '/web/docs/wf-ecg/_model_/0/': ['index.html', 'app/**'],
        },
        //pretend: true,
        updateOnly: true, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
};
