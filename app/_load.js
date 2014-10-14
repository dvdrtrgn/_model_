/*jslint white:false */
/*globals _, C, W, Global, jQuery,
    Glob:true, Main, Modernizr, ROOT, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    G._load = {};
    W.Tests = $.Callbacks();

    _.defaults(G, { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        ven: ROOT.dir + '/vendor/',
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
    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    G._load.base = {
        test: W.msie,
        yep: [
            G.ven + 'msie/rem.min.js',
            G.ven + 'msie/split.js',
            G.ven + 'msie/iscroll.js', // fkin ie
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
            G.lib + 'video-js/4.2.1/video-js.css',
            G.lib + 'video-js/4.2.1/video.dev.js',
            /* */
            G.dir + 'build/lib.js',
        ],
        complete: function () {
            Data = new G.constructor('Data', '(catchall data fixture)');
        },
    };

    G._load.font = {
        test: (ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla2'),
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
            G.dir + 'build/src.js',
            G.dir + '_main.js',
        ],
        complete: function () {
            _.delay(function () {
                if (W.msie) {
                    M.load(G.ven + 'msie/selectivizr-min.js');
                }
                ROOT.loaded($);
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
        ],
    };
    M.load([G._load.base, G._load.font, G._load.main, G._load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
