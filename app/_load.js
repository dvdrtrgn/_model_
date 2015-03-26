/*jslint white:false */
/*globals _, C, W, Glob, jQuery,
    Main, Modernizr, HOST, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($, M, G) {
    'use strict';
    G._load = {};
    G._host = HOST;
    W.Tests = $.Callbacks();

    _.defaults(G, { /// all stubs terminated
        dir: HOST.dir + '/',
        lib: HOST.lib + '/',
        ven: HOST.dir + '/vendor/',
    });

    if ($.browser.msie) {
        $(function () {
            $('html').addClass('msie');
            $('body').on('mouseover', '.region, .widget, a, li', function () {
                $(this).addClass('hover');
            }).on('mouseout', '.region, .widget, a, li', function () {
                $(this).removeClass('hover');
            });
        });
        W.debug--;
    }
    if (HOST.conf.nom === 'wfmedia' || HOST.conf.nom === 'mfal') {
        W.debug--;
    }
    if (HOST.conf.nom === 'localhost') {
        W.debug++;
    }

    G._load.base = {
        test: W.msie,
        yep: [
            G.ven + 'msie/rem.min.js',
            G.ven + 'msie/iscroll.js', // fkin ie
        ],
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

    G._load.font = {
        test: (HOST.conf.nom === 'localhost' || HOST.conf.nom === 'qla2'),
        yep: [
            G.lib + (!W.msie ? 'fonts/archer.ssm.css'     : 'fonts/eot/archer.ssm.css'),
            G.lib + (!W.msie ? 'fonts/myriad.con.css'     : 'fonts/eot/myriad.con.css'),
            G.lib + (!W.msie ? 'fonts/myriad.css'         : 'fonts/eot/myriad.css'),
        ],
        nope: [/*
            '//cloud.typography.com/6819872/620964/css/fonts.css', // Normal */
            '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
            '//use.typekit.net/cqz6fet.js',
        ],
        complete: function () {
            try {
                if (!G._load.font.test) {
                    Typekit.load();
                }
            } catch (e) {
                C.error('typekit');
            }
        },
    };

    G._load.main = {
        both: [
            G.dir + 'build/main.js',
        ],
        complete: function () {
            _.delay(function () {
                if (W.msie) {
                    M.load(G.ven + 'msie/respond.js');
                    M.load(G.ven + 'msie/selectivizr-min.js');
                }
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

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
Originally built by WF-ECG INTERACTIVE (Wells Fargo Enterprise Creative Group).
        We design and develop with a focus on web standards and best practices.
*/
