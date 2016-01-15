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

    require(['lodash', 'ven/iscroll'], function (_, IScroll) {
        'use strict';

        var Nom = 'Main',
            Df;

        function _init() {
            C.info(Nom, 'init @ ' + Date(), {
                debug: W.debug,
            });
            var myScroll = new IScroll('.field0', {
                freeScroll: true,
                mouseWheel: true,
                scrollX: true,
                //snap: true,
                indicators: [{
                        el: $('.field1')[0],
                        ignoreBoundaries: true,
                        resize: false,
                    }, {
                        el: $('.field2')[0],
                        ignoreBoundaries: true,
                        resize: false,
                    }]
            });

            $(document).on('touchmove', function (e) {
                e.preventDefault();
            }, false);

            function nametag(sel) {
                // http://iscrolljs.com/#configuring
                sel = $(sel || '.stars div');
                // add fixed center cite?
                sel.each(function () {
                    var me = $(this), tag;

                    tag = $('<cite>').addClass('marker') //
                        .text(me.text()).wrapInner('<span>');
                    me.text('');
                    // add corner cites
                    'tl tr br bl md'.split(' ').forEach(function (x) {
                        me.append(tag.clone().addClass(x));
                    });
                });
            }
            nametag();
            C.debug(myScroll);
        }
        _.delay(_init, 333);
    });
});
/*


 */
