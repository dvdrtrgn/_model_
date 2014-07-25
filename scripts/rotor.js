/*jslint es5:true, white:false */
/*globals Global, Servo, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Rotor = (function (W, $) { //IIFE
    'use strict';
    var name = 'Rotor',
        self = new Global(name, '(slide carousel abstraction)'),
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

    function flipRotor(rotor) {
        C.log(name, 'flipRotor', rotor);

        if (rotor.status === 'active') {
            rotor.scroller.interval = Servo.auto(rotor.scroller);
        } else {
            W.clearInterval(rotor.scroller.interval);
        }
    }

    function collect(slides) {
        C.log(name, 'collect slides', slides.toString());
        var callupon, rotor, port, scroller, slide;

        slide = slides.first()
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
                rotor.activate() || rotor.reset();
            },
        };
        rotor = $.extend( new(function RotoHelper(){}), rotor);

        Df.all.push(rotor);
        slide.data(name, rotor);
        callupon.add(flipRotor);
        rotor.reset();

        return rotor;
    }

    function _attach(selector) {
        C.log(name, '_attach selector', selector)
        var rotor, slides;

        slides = $(selector + ' .slides');
        rotor = collect( slides );
        $(selector + '.control').on('click', rotor.toggle);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        attach: _attach,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

give selector
make query
make rotor controller
bind ref as data to query


*/
