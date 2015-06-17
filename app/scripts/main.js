/*jslint  white:false */
/*globals C, W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'],
function ($, _) {
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

});
/*






*/
