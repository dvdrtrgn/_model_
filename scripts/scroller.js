/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        speed: 3333, /* auto advance */
        iscroll: {
            indicators: {
                el: null, /* later */
                resize: false,
                interactive: true,
            },
            keyBindings: true,
            eventPassthrough: true,
            momentum: false,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: 333,
        },
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function servoNext(scroller) {
        if (U.debug()) {
            C.debug(name, 'servoNext', scroller);
        }
        var ln, pg;

        ln = scroller.pages.length;
        pg = (1 + scroller.currentPage.pageX) % (ln - 1);
        scroller.goToPage(pg, 0);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function _autoServo(scroller) {
        if (U.debug()) {
            C.debug(name, '_autoServo', scroller);
        }
        var interval, pager;

        if (!scroller.pages) {
            return;
        }

        interval = W.setInterval(function () {
            servoNext(scroller);
        }, Df.speed);

        pager = W.isIE ? scroller.indicator1 : scroller.indicators[0];

        $(pager.wrapper) //
        .parent() //
        .one('click keypress touchend', function () {
            C.debug(name, 'click keypress touchend', scroller);
            W.clearInterval(interval);
        });

        return interval;
    }

    function _attachView(viewSelector) {
        self.init();
        if (U.debug()) {
            C.debug(name, '_attachView viewport', viewSelector);
        }
        var viewPort, proxyPeg, iScroller;

        viewPort = $(viewSelector);
        proxyPeg = viewPort.find('.iS-proxy') //
        .on('click touchend', function (evt) {
            var cds = {
                x: evt.offsetX,
                y: evt.offsetY,
                w: $(this).width(),
                l: iScroller.pages.length - 1,
                calc: function () {
                    return ((this.x / this.w * this.l) | 0);
                },
            };
            if (!cds.x) { // touch device has no offsetX?
                evt.preventDefault();
                proxyPeg.trigger('advance.' + name);
            } else {
                iScroller.goToPage(cds.calc(), 0);
            }
        }) //
        .on('advance.' + name, function () {
            servoNext(iScroller);
        });

        Df.iscroll.indicators.el = proxyPeg.get(0);
        iScroller = new IScroll(viewPort.get(0), Df.iscroll);

        // store IScroll (internally and as data on wrapper)
        Df.all.push(iScroller);
        // viewPort.data('scroller', iScroller);
        return iScroller;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        attach: _attachView,
        auto: _autoServo,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
