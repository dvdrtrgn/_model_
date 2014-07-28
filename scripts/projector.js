/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller, */
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

    function switchAutoIn(projector) {
        if (U.debug()) {
            C.debug(name, 'switchAutoIn', projector);
        }

        if (projector.status === 'active') {
            projector.scroller.interval = Scroller.auto(projector.scroller);
        } else {
            W.clearInterval(projector.scroller.interval);
        }
    }

    function collect(slides, scroller) {
        if (U.debug()) {
            C.debug(name, 'collect slides', slides.toString());
        }
        var projector, port, slide;

        slide = slides.first();
        port = slide.parent().parent();
//        port = scroller ? port : slide;

        projector = {
            port: port,
            scroller: scroller,
            status: 'active',
            actuate: function () {
                if (Df.current) {
                    Df.current.reset();
                }
                switchAutoIn(projector);
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
        self.init();
        if (U.debug()) {
            C.debug(name, '_attach selector', selector);
        }
        var button, slides, projector, scroller;

        scroller = Scroller.attach(selector + '.iS-port');
        slides = $(selector + ' .slides');
        projector = collect(slides, scroller);

        button = $(selector + '.control') //
        .on('click', projector.toggle);

        projector.slides = slides;
        projector.button = button;
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
