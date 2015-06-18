/*jslint white:false */
/*globals require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window), C = (W.C || W.console || {});

W.SHIET = {};

require.config({
    baseUrl: '.',
    paths: {
        src: 'scripts',
        lib: 'scripts/libs',
        ven: 'vendor',
        venm: 'vendor/msie',
        jquery: '/mfal/lib/jquery/1.8.2/jquery',
        lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
    },
    shim: {
        'lib/glob': {
            deps: [],
            exports: 'Glob'
        },
        'lib/util': {
            deps: ['jquery', 'lib/glob'],
            exports: 'Util'
        },
        'lib/scroller': {
            deps: ['lib/util'],
            exports: 'Scroller'
        },
        'lib/projector': {
            deps: ['lib/scroller'],
            exports: 'Projector'
        },
    },
});

// Load the main app module to start the app
require(['lib/console', 'jquery', 'lib/xtn-jq', 'src/main']);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
