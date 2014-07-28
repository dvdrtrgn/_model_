/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Servo, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Projector = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Projector',
        self = new G.constructor(name, '(carousel projector abstraction)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        speed: 333,
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    Projector.wrap = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function flipRotor(projector) {
        if (U.debug()) {
            C.debug(name, 'flipRotor', projector);
        }

        if (projector.status === 'active') {
            projector.scroller.interval = Servo.auto(projector.scroller);
        } else {
            W.clearInterval(projector.scroller.interval);
        }
    }

    function collect(slides) {
        if (U.debug()) {
            C.debug(name, 'collect slides', slides.toString());
        }
        var projector, port, scroller, slide;

        slide = slides.first();
        port = slide.parent().parent();
        scroller = port.data('scroller') || false;
        port = scroller ? port : slide;

        projector = {
            port: port,
            scroller: scroller,
            status: 'active',
            actuate: function () {
                if (Df.current) {
                    Df.current.reset();
                }
                flipRotor(projector);
            },
            isnt: function (state) {
                if (projector.status !== state) {
                    projector.port.removeClass(projector.status);
                    projector.status = state;
                    projector.port.addClass(projector.status);
                    return true;
                } else {
                    return false;
                }
            },
            activate: function () {
                if (projector.isnt('active')) {
                    projector.actuate();
                    Df.current = projector;
                    return true;
                }
                return false;
            },
            reset: function () {
                if (projector.isnt('normal')) {
                    Df.current = null;
                    projector.actuate();
                    return true;
                }
                return false;
            },
            toggle: function () {
                return (projector.activate() || projector.reset());
            },
        };
        projector = $.extend(new self.wrap(), projector);

        Df.all.push(projector);
        slide.data(name, projector);
        projector.reset();

        return projector;
    }

    function _attach(selector) {
        if (U.debug()) {
            C.debug(name, '_attach selector', selector);
        }
        var projector, slides;

        slides = $(selector + ' .slides');
        projector = collect(slides);
        $(selector + '.control').on('click', projector.toggle);
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
        attach: _attach,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

give selector
make query
make projector controller
bind ref as data to query


*/
