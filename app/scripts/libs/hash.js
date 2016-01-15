/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery'], function ($) {
    'use strict';

    var Db = 0;
    var Nom = 'Hash';
    var W = (W && W.window || window), C = (W.C || W.console || {});

    return function Hash(sel) {
        var api, ele;
        sel = sel || 'body';

        ele = $(sel).first();
        api = ele.data(Nom);

        function readHash() {
            return W.location.hash.slice(1);
        }

        function compare(x, y, z) {
            x = JSON.stringify(x);
            y = JSON.stringify(y);
            z = x === y;
            if (Db > 1)
                C.log(Nom + '[compare]', x, y, z);
            return z;
        }

        function _breakHash() {
            var arr = readHash().split('&');
            var obj = {};
            var pre = api.obj;

            $.each(arr, function (i, e) {
                var arr = e.split('=');

                if (arr[0])
                    obj[arr[0]] = arr[1];
            });

            api.obj = obj;

            if (!compare(pre, obj)) {
                $.publish('change.' + Nom, obj);
            }

            if (Db > 1)
                C.log(Nom + '[_breakHash]', obj);
            return obj;
        }

        if (!api) { // create instance
            api = $.extend({api: Nom + ':' + sel}, {
                _: {
                    ele: ele,
                },
                obj: {},
                get: _breakHash,
                check: function () {
                    _.delay(_breakHash, 99);
                    return api;
                },
            });

            // store api as data
            ele.data(Nom, api);
        }

        init: {
            if (Db > 0)
                C.log(Nom + '[[init]]', api);
            return api;
        }
    };

});

/*






 */
