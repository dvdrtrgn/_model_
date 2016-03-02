/*jslint white:false */
/*globals require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.SHIET = {};
W.debug = Number(new Date('2016/01/01') > new Date());

require.config({
    baseUrl: 'scripts',
    paths: {
        lr: 'http://localhost:7999/livereload.js?snipver=1',
        lib: 'libs',
        test: '../tests',
        ven: '../vendor',
        jquery: '/mfal/lib/jquery/1.11.3/jquery',
        lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
        boots: '/mfal/lib/bootstrap/3.3.5/js/bootstrap.min',
        //
        box: 'libs/box',
        pair: 'libs/pair',
        //
    },
    shim: {
        'ven/iscroll': {
            exports: 'IScroll'
        },
        'boots': {
            deps: ['jquery'],
        }
    },
});

// Load the main app module to start the app
require(['lib/console', 'boots', 'jquery', 'lodash', 'lib/jq-xtn'], function () {

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
