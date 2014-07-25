/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Glob;

(function (W, $, M) {
    W.debug = 1;

    var G = { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    };

    M.load([{
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        G.lib + 'iscroll/5.0.4/iscroll.js',
        ],
        nope: [
        G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
        G.lib + 'underscore/js-1.4.4/lodash.underscore.js',
        ],
        complete: function () {
            G = $.extend(true, Global, G);
        },
    },{
        both: [
        G.src + '_util.js',
        G.src + 'rotor.js',
        G.src + 'servo.js',
        G.src + '_main.js',
        ],
        complete: function () {
            W.Main && W.Main(W, $).init();
        },
    }]);

    Glob = G;
}(window, jQuery, Modernizr));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
