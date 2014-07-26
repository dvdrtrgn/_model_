/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Servo, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Rotor = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Rotor',
        self = new G.constructor(name, '(slide carousel abstraction)'),
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
    // HELPERS (defaults dependancy only)
    Rotor.wrap = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    /// attach expand/contract/status events to items with _reveal

    function flipRotor(rotor) {
        if (U.debug()) {
            C.debug(name, 'flipRotor', rotor);
        }

        if (rotor.status === 'active') {
            rotor.scroller.interval = Servo.auto(rotor.scroller);
        } else {
            W.clearInterval(rotor.scroller.interval);
        }
    }

    function collect(slides) {
        if (U.debug()) {
            C.debug(name, 'collect slides', slides.toString());
        }
        var callupon, rotor, port, scroller, slide;

        slide = slides.first();
        callupon = $.Callbacks();
        port = slide.parent().parent();
        scroller = port.data('scroller') || false;
        port = scroller ? port : slide;

        rotor = {
            port: port,
            scroller: scroller,
            status: 'active',
            actuate: function () {
                if (Df.current) {
                    Df.current.reset();
                }
                callupon.fire(rotor);
            },
            isnt: function (state) {
                if (rotor.status !== state) {
                    rotor.port.removeClass(rotor.status);
                    rotor.status = state;
                    rotor.port.addClass(rotor.status);
                    return true;
                } else {
                    return false;
                }
            },
            activate: function () {
                if (rotor.isnt('active')) {
                    rotor.actuate();
                    Df.current = rotor;
                    return true;
                }
                return false;
            },
            reset: function () {
                if (rotor.isnt('normal')) {
                    Df.current = null;
                    rotor.actuate();
                    return true;
                }
                return false;
            },
            toggle: function () {
                return (rotor.activate() || rotor.reset());
            },
        };
        rotor = $.extend(new self.wrap(), rotor);

        Df.all.push(rotor);
        slide.data(name, rotor);
        callupon.add(flipRotor);
        rotor.reset();

        return rotor;
    }

    function _attach(selector) {
        if (U.debug()) {
            C.debug(name, '_attach selector', selector);
        }
        var rotor, slides;

        slides = $(selector + ' .slides');
        rotor = collect(slides);
        $(selector + '.control').on('click', rotor.toggle);
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
make rotor controller
bind ref as data to query


*/
