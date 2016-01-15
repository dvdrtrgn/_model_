/*jslint white:false */
/*global _, C, W, jQuery, Main, Modernizr, HOST, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var G = {};
(function ($, M) {
    'use strict';
    G._load = {};
    G._host = HOST;
    W.Tests = $.Callbacks();

    _.defaults(G, { /// all stubs terminated
        dir: HOST.dir + '/',
        lib: HOST.lib + '/',
        ven: HOST.dir + '/vendor/',
    });

    G._load.base = {
        nope: [
            G.ven + 'iscroll.js',
        ],
        both: [
            G.lib + 'video-js/ecg/video-js.css',
            G.lib + 'video-js/ecg/video.js',
            /* */
            G.dir + 'build/libs.min.js',
        ],
        complete: function () {
            return new G.constructor('Data', '(catchall data fixture)');
        },
    };

    G._load.main = {
        both: [
            G.dir + 'build/main.js',
        ],
        complete: function () {
            _.delay(function () {
                HOST.loaded($);
            }, 1e3);
            Main.init();
        },
    };

    G._load.test = {
        test: W.debug >= 1,
        yep: [
            G.dir + '_test.js',
        ],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
            'http://www.wellsfargomedia.com/lib/video-js/videojs.ga.js',
        ],
    };
    M.load([G._load.base, G._load.font, G._load.main, G._load.test]);

}(jQuery, Modernizr));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
Originally built by WF-ECG INTERACTIVE (Wells Fargo Enterprise Creative Group).
        We design and develop with a focus on web standards and best practices.
*/
