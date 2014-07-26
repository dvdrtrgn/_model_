/*jslint es5:true, white:false */
/*globals _, C, W, ROOT, Global, Util, jQuery,
    Glob:true, Main, Modernizr, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Glob = new Global('Globals');

(function ($, G, M) {
    'use strict';
    var U;
    W.G = G;
    W.Load = {};
    W.Tests = $.Callbacks();
    W.debug = 1;

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
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
    }
    if (($.now() > new Date('2014/06/29')) || W.isIE || ROOT.conf.nom === 'wfmedia') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++ > 1 && $('html').addClass('debug');
    }

    Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        G.lib + 'iscroll/5.0.4/iscroll.js',
        ],
        nope: [
        G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
        G.src + '_util.js',
        ],
        complete: function () {
        },
    };

    Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
        yep: [
        G.lib + 'fonts/archer.ssm.css',
        G.lib + 'fonts/archer.ssm.itl.css',
        ],
        nope: [
        /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
        '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
    };

    Load.main = {
        both: [
        G.src + 'rotor.js',
        G.src + 'servo.js',
        G.src + '_main.js',
        ],
        complete: function () {
            U = Util;
            W.Main && W.Main(W, $).init();
            ROOT.loaded();
        },
    };

    Load.test = {
        test: W.debug > 0,
        //yep: [G.src + 'tests.js'],
        nope: [
        'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Glob, Modernizr));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
