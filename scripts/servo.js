/*jslint es5:true, white:false */
/*globals Global, IScroll, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Servo = (function (W, $) { //IIFE
    'use strict';
    var name = 'Servo',
        self = new Global(name, '(wrap iscroll controller)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        speed: 333,
        current: null,
        inits: function () {
            Df.inited = true;
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function servoNext(scroller) {
        C.log(name, 'servoNext', scroller);
        var ln, pg;

        ln = scroller.pages.length - (1);
        pg = (1 + scroller.currentPage.pageX) % ln;
        scroller.goToPage(pg, 0);
    }

    function _autoServo(scroller) {
        C.log(name, '_autoServo', scroller);
        var interval, pager;

        if (!scroller.pages) {
            return;
        }

        interval = W.setInterval(function () {
            servoNext(scroller);
        }, Df.speed * 10);

        pager = W.isIE ? scroller.indicator1 : scroller.indicators[0];

        $(pager.wrapper) //
        .parent() //
        .one('click keypress touchend', function () {
            C.log(name, 'click keypress touchend', scroller);
            W.clearInterval(interval);
        });

        return interval;
    }

    function _attach(viewSelector) {
        C.log(name, '_attach viewport', viewSelector)
        var viewport, peg, scroller;

        viewport = $(viewSelector);
        peg = viewport.find('.iS-proxy');

        peg.on('click touchend', function (evt) {
            var cds = {
                x: evt.offsetX,
                y: evt.offsetY,
                w: $(this).width(),
                l: scroller.pages.length - 1,
                calc: function () {
                    return ((this.x / this.w * this.l) | 0);
                },
            };

            if (!cds.x) { // touch device has no offsetX?
                evt.preventDefault();
                peg.trigger('advance.' + name);
            } else {
                scroller.goToPage(cds.calc(), 0);
            }
        });

        peg.on('advance.' + name, function () {
            servoNext(scroller);
        });

        scroller = new IScroll(viewport.get(0), {
            indicators: {
                el: peg.get(0),
                resize: false,
                interactive: true,
            },
            keyBindings: true,
            eventPassthrough: true,
            momentum: false,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: Df.speed,
        });
        // store on wrapper
        viewport.data('scroller', scroller);
        return scroller;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        attach: _attach,
        auto: _autoServo,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
