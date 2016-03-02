/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) { //console.log('AMD');
        define(['jquery', 'lodash'], factory);
    } else {
        console.warn('jsave shim', [factory(jQuery)]);
    }
}(function ($) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    // - - - - - - - - - - - - - - - - - -
    // AUTOMATE
    $.reify = function (obj) { // replace vals(selectors) with elements
        return $.each(obj, function (i, sel) {
            if (typeof sel === 'string') {
                sel = sel.replace(/\./g, '\\.');
            }
            obj[i] = $(sel);
        });
    };

    // - - - - - - - - - - - - - - - - - -
    // PUBSUBS
    $.pubsubs = $({});
    $.publish = function () {
        $.pubsubs.trigger.apply($.pubsubs, arguments);
    };
    $.subscribe = function () {
        $.pubsubs.on.apply($.pubsubs, arguments);
    };
    $.unsubscribe = function () {
        $.pubsubs.off.apply($.pubsubs, arguments);
    };

    // - - - - - - - - - - - - - - - - - -
    // WATCHERS
    $.watchHash = function () {
        function trackHash() {
            var self = trackHash,
                hash = W.location.hash.slice(1),
                prev = self.previous;
            if (prev !== hash) {
                $('html').removeClass(prev).addClass(hash);
                self.previous = hash;
            }
            return self;
        }
        $(W).on('hashchange', trackHash());
    };
    $.watchInputDevice = function () {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mouseover', function () { // `mousemove` has side effects on windows browsers
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    };
    $.watchResize = function (fn, ns) {
        ns = 'resize.' + (ns || 'Util');
        $(W).off(ns);
        if (fn) {
            fn();
            $(W).on(ns, fn);
        }
    };
    $.swallowBackspace = function () {
        $(W.document).on('keydown', function (evt) {
            var ele = $(evt.target || evt.srcElement);
            if (evt.keyCode === 8 && !ele.is('input,[contenteditable="true"],textarea')) {
                evt.preventDefault();
            }
        });
    };
    $.markAgent = function () {
        var ua = W.navigator.userAgent;

        $.watchResize(function () {
            if (ua.match(/mobi/i) ||
                $(W).width() < 768) { // simulate
                $('html').addClass('mobi');
            } else {
                $('html').removeClass('mobi');
            }
            if (ua.match(/chrome/i)) {
                $('html').addClass('chrome');
            } else if (ua.match(/safari/i)) {
                $('html').addClass('safari');
            } else if (ua.match(/firefox/i)) {
                $('html').addClass('firefox');
            } else if (ua.match(/trident/i)) {
                $('html').addClass('trident');
            }
        }, 'markAgent');
    };

    // - - - - - - - - - - - - - - - - - -
    // HELPERS
    $.swapper = function (arr, a, b) {
        var c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    };

    $.shuffler = function (array) {
        var arr = array.concat(),
            rem = arr.length,
            swap = function (a, b) {
                $.swapper(arr, a, b);
            };
        while (rem--) {
            swap(rem, Math.floor(Math.random() * (rem + 1)));
        }
        return arr;
    };

    $.doneLoading = function () {
        $('.loading').removeClass('loading');
    };

}));
/*



 */
