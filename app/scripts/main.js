/*jslint  white:false */
/*globals C, W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash', 'lib/projector'], function ($, _, Projector) {
    'use strict';

    var Db = 0;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Nom = 'Main';
    var Mn = {};

    try { W.SHIET.init($) } catch (err) { C.error(err) }

    if (SHIET.ltie9) {
        require(['msie/nwmatcher.min', 'msie/rem.min', 'msie/selectivizr-min', 'msie/split']);
    }

    if (Db && W.location.hostname === 'localhost') $('html').addClass('debug');

    W.Mn = Mn;

    function _bindings() {

        $('body').removeClass('loading');

    }

    // PAGE LOADED
    $(function () {

        _.delay(_bindings, 333);

    });

    var Df = { // DEFAULTS
        projector: null,
        inits: function () {
            body = $('body');
            html = $('html');

            C.info('Main init @ ' + Date(), {
                debug: W.debug,
            });
        },
    };

    function bindProjector() {
        Df.projector = Projector.attach('.iS-port');

        if (U.debug()) {
            Df.projector.toggle();
        }
    }
    function bindings() {
        bindProjector();
    }
});
/*






*/
