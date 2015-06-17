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
        jquery: '/mfal/lib/jquery/1.8.2/jquery',
        lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
    }
});

// Load the main app module to start the app
require(['lib/console', 'lib/xtn-jq', 'src/main']);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
