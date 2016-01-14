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
        jquery: '/mfal/lib/jquery/1.11.3/jquery',
        lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
        boots: '/mfal/lib/bootstrap/3.3.5/js/bootstrap.min',
    },
    shim: {
        'lib/util': {
            deps: ['jquery'],
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
        'boots': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['jquery'],
        }
    },
});

// Load the main app module to start the app
require(['lib/console', 'boots', 'jquery', 'lib/xtn-jq']);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
