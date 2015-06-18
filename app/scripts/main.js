/*jslint  white:false */
/*globals C, W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
        'use strict';

        var Db = 0;
        var W = (W && W.window || window), C = (W.C || W.console || {});
        var Nom = 'Main';
        var Df;

        try { W.SHIET.init($) } catch (err) { C.error(err) }

        if (SHIET.ltie9) {
            require(['msie/nwmatcher.min', 'msie/rem.min', 'msie/selectivizr-min', 'msie/split']);
        }

        if (Db && W.location.hostname === 'localhost') $('html').addClass('debug');


        Df = { // DEFAULTS
            projector: null,
            inits: function () {
                C.info(Nom, 'init @ ' + Date(), {
                    debug: W.debug,
                });

                // PAGE LOADED
                _.delay(function () {
                    $('body').removeClass('loading');
                }, 333);
            },
        };

        function _init() {
            Df.inits();
            Df.projector = Projector.attach('.iS-port');
        }

        require(['lib/projector'], _init);
        return Df;
    });
/*






*/
