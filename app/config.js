/*jslint white:false */
/*globals require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.SHIET = {};

require.config({
    baseUrl: '.',
    paths: {
        lr: 'http://localhost:7999/livereload.js?snipver=1',
        src: 'scripts',
        lib: 'scripts/libs',
        ven: 'vendor',
        iscroll: 'vendor/iscroll',
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
        'iscroll': {
            exports: 'IScroll'
        },
        'boots': {
            deps: ['jquery'],
        }
    },
});

// Load the main app module to start the app
require(['lib/console', 'boots', 'jquery', 'lodash', 'lib/xtn-jq'], function () {

    $('body').removeClass('loading');

    if (W.debug > 1 || W.location.hostname === 'localhost') {
        $('html').addClass('debug');

        require(['lr'], function () {
            C.warn('LiveReloading @ ' + W.debug);
        }, function () {
            C.info('no LiveReloading @ ' + W.debug);
        });
    }
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
