/*jslint white:false */
/*globals _, C, W, Util */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// NORMALIZER

/*!
* screenfull
* v1.2.0 - 2014-04-29
* (c) Sindre Sorhus; MIT License
*/
(function () {
    'use strict';

    var isCommonjs = (typeof module !== 'undefined') && module.exports;
    var keyboardAllowed = (typeof Element !== 'undefined') && 'ALLOW_KEYBOARD_INPUT' in Element;
    var fn = (function () {
        var val, valLength, i, l, ret = {},
            fnMap = [
            'requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror',
            'webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror', /*new WebKit*/
            'webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror', /*old (Safari 5.1)*/
            'mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror',
            'msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError'
            ];

        for (i = 0, l = fnMap.length; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0, valLength = val.length; i < valLength; i++) {
                    ret[fnMap[0][i]] = val[i];
                }
                return ret;
            }
        }
        return false;
    })();

    var screenfull = {
        request: function (elem) {
            var request = fn.requestFullscreen;

            elem = elem || document.documentElement;

            // Work around Safari 5.1 bug: reports support for keyboard in fullscreen even though it doesn't.
            // Browser sniffing, since the alternative with setTimeout is even worse.
            if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                elem[request]();
            } else {
                elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
            }
        },
        exit: function () {
            document[fn.exitFullscreen]();
        },
        toggle: function (elem) {
            return (this.isFullscreen) ? this.exit() : this.request(elem);
        },
        onchange: function () {},
        onerror: function () {},
        raw: fn
    };

    if (!fn) {
        if (isCommonjs) {
            module.exports = false;
        } else {
            window.screenfull = false;
        }
        return;
    }

    Object.defineProperties(screenfull, {
        isFullscreen: {
            get: function () {
                return !!document[fn.fullscreenElement];
            }
        },
        element: {
            enumerable: true,
            get: function () {
                return document[fn.fullscreenElement];
            }
        },
        enabled: {
            enumerable: true,
            get: function () {
                // Coerce to boolean in case of old WebKit
                return !!document[fn.fullscreenEnabled];
            }
        }
    });

    document.addEventListener(fn.fullscreenchange, function (e) {
        screenfull.onchange.call(screenfull, e);
    });
    document.addEventListener(fn.fullscreenerror, function (e) {
        screenfull.onerror.call(screenfull, e);
    });

    if (isCommonjs) {
        module.exports = screenfull;
    } else {
        window.screenfull = screenfull;
    }
})();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
