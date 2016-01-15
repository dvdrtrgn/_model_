/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 hook up various sub systems
 bind events
 store configs

 TODO
 document a bit
 modernize api
 loosely load
 change 'index' data to 'eq'
 */
require(['../../config'], function () {
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    require.config({
        baseUrl: '../..',
        deps: ['../../config'],
    });

    require(['jquery', 'lodash'], function ($, _) {
        'use strict';

        var Db = 0,
            Nom = 'Main',
            Df;

        if (Db || W.location.hostname === 'localhost')
            $('html').addClass('debug');

        Df = {// DEFAULTS
            inits: function () {
            },
        };

        function _init() {
            C.info(Nom, 'init @ ' + Date(), {
                debug: W.debug,
            });
            $('.scrollspy-example').scrollspy({target: '#navbar-example2'});

        }
        _.delay(_init, 333);

        return Df;
    });
});
/*


 */
