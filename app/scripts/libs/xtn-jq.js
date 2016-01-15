/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var Nom = 'xtn-jq',
        W = (W && W.window || window),
        C = (W.C || W.console || {}),
        Db = 0;

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

    (function () { /// IIFE
        var name = 'Util',
            self = {}, // (limited utils)
            Db = 0;
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        /// CONSTANTS
        self = {
            args: function () {
                return arguments;
            },
            arrg: function (args) {
                return Array.prototype.slice.apply(args);
            },
            debug: function (n) {
                return Db || W.debug >= (n || 1);
            },
            defined: function (x) {
                return !this.undef(x);
            },
            echo: function () {
                C.log([name], this.arrg(arguments));
            },
            echoing: function (arr) {
                arr = this.arrg(arguments);
                return function () {
                    C.warn(arr);
                };
            },
            flatcat: function (arr) {
                return arr.concat.apply([], arr);
            },
            reflect: function () {
                return arguments[0];
            },
            undef: function () {
                return (typeof arguments[0] === 'undefined');
            },
        };

        /**
         * Randomize array element order in-place.
         * Using Fisher-Yates shuffle algorithm.
         * @param {Array} array
         */
        self.shuffleArray = function (array) {
            var i, j, temp;
            for (i = array.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        };
        // usage: log('inside coolFunc', this, arguments);
        // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
        self.log = function () {
            self.log.history = self.log.history || [];
            self.log.history.push(arguments);
            if (W.console) {
                W.console.log(Array.prototype.slice.call(arguments));
            }
        };

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        /// MISC
        self.slice = function (array, first, last) {
            // 2 crazy things
            if (W.isIE && !last) {
                // fuckin IE cannot use undefined as a missing 2nd param
                return array.slice(first);
            } else {
                // also the 2nd param cannot be zero (js has no neg-zero)
                return array.slice(first, last || undefined);
            }
        };

        self.Counter = (function () {
            function Counter(n) {
                n = (n || 0);
                this.valueOf = this.toString = function () {
                    return n++;
                };
            }
            return Counter;
        }());

        self.Cache = (function (obj) {
            function cache() {}
            cache.prototype = obj;
            return cache;
        }(new self.Counter()));

        self.xyStore = function (ele, restore) {
            var e = $(ele),
                xy = e.position(),
                dat = e.data(),
                auto = {
                    left: 'auto',
                    top: 'auto'
                };

            if (restore) {
                // either 1 restore or 2 reset to auto
                e.css((restore < 2 && dat.xyStore) || auto);
            } else {
                dat.xyStore = xy;
            }
        };

        self.abstractXY = function (evt) {
            var o = {},
                bs = $('body').scrollTop(),
                hs = $('html').scrollTop(),
                ie = $.browser.msie,
                ff = $.browser.mozilla;

            if (ie) {
                o.x = evt.pageX;
                o.y = evt.pageY + (bs);
            } else {
                o.x = evt.clientX;
                o.y = evt.clientY + (ff ? hs : bs);
            }
            return o;
        };

        self.makeMailtos = function (ele) {
            $('.email', (ele || 'body')) //
                .removeClass('email') //
                .addClass('mailto') //
                .toMailto();
        };

        self.mfal = function () {
            C.warn('.mfal?');

            var supplant = function (txt, cb) {
                var me = $(this);
                //
                txt = '#' + (txt || me.attr('href'));
                cb = cb || $.noop;
                //
                me.on('click', function (evt) {
                    evt.preventDefault();
                    if (typeof cb === 'function') {
                        cb(this);
                    } else {
                        W.location = cb;
                    }
                }).attr('href', txt);
            };
            $('[href="."]').each(function () {
                supplant.apply(this, ['reload', function () {
                        W.location.reload();
                    }]);
            });
            $('[href=".."]').each(function () {
                supplant.apply(this, ['teamworks', 'http://portal.teamworks.wellsfargo.com/']);
            });
        };

        self.query = function (nom) {
            var A = W.location.search.slice(1).split('&'),
                O = {};

            $.each(A, function (i, e) {
                var x = e.split('=');

                O[x[0]] = x[1];
            });
            return nom ? (O[nom] || true) : O;
        };

        self.pathId = function () {
            var path, tmp;

            path = (' ' + W.location.pathname).split('/');
            tmp = path.pop() || path.pop(); // trailing slash?
            path = tmp.match('index.') ? path.pop() : tmp; // get directory?
            return path.split('.').shift(); // remove any extension
        };

        self.pageId = function () {
            var str = $('body').attr('id');
            return (str || this.pathId()).toLowerCase();
        };

        self.time = function () {
            var arr = $.now().toString().match(/\d{6,7}/g);
            return {
                all: arr.join(''),
                big: arr[0],
                lil: arr[1],
            };
        };

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

        $.util = $.extend(self, {
            flatten: self.flatcat,
            isDef: self.defined,
            I: self.reflect,
            testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
        });
    }());

    if (Db > 0) {
        C.log(Nom + '[[init]]');
    }
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*






 */
