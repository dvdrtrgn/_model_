/*jslint  white:false */
/*globals C, W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash', 'lib/projector'], function ($, _, Projector) {
    'use strict';

    var Db = 0;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Nom = 'Main';
    var Df;

    function fakeId() {
        var str = btoa(Math.random() * 1e9 | 0);
        return str.replace(/\W/g, '$');
    }
    function boostrap(url, fn) {
        $('<script>').appendTo('head').on('load', fn) //
            .attr('src', 'https://cdnjs.cloudflare.com/ajax/libs/' + url);
    }

    try {
        W.SHIET.init($);
    } catch (err) {
        C.error(err);
    }
    if (Db && W.location.hostname === 'localhost')
        $('html').addClass('debug');

    Df = {// DEFAULTS
        projector: null,
        inits: function () {
            C.info(Nom, 'init @ ' + Date(), {
                debug: W.debug,
            });

        },
    };

    function _init() {
        Df.inits();
        Df.projector = Projector.attach('.iS-port');
    }

    require(['lib/projector', Df.iscroll], _init);
    return Df;
});
/*






 */
