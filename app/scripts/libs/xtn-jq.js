/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var Db = 0;
    var Nom = 'xtn-jq';
    var W = (W && W.window || window), C = (W.C || W.console || {});

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    var Q = $.pubsubs = $({});

    $.publish = function () { // o.trigger.bind(o)
        Q.trigger.apply(Q, arguments);
    };
    $.subscribe = function () { // o.on.bind(o)
        Q.on.apply(Q, arguments);
    };
    $.unsubscribe = function () { // o.off.bind(o)
        Q.off.apply(Q, arguments);
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.fn.mediate = function (event, limit, topic) {
        return this.on(event, _.debounce(function (evt) {
            $.publish(topic, evt);
        }, limit));
    };

    $.fn.altTitles = function () {
        $('*', this).each(function () {
            var me = $(this);
            me.attr('title', me.attr('alt'));
        });
    };

    if (Db > 0) C.log(Nom + '[[init]]');

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*






 */
