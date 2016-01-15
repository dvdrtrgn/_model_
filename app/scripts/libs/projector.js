/*jslint white:false */
/*global _, C, W, jQuery, Projector: true, Scroller, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Projector = (function ($) { // IIFE
    'use strict';

    var Nom = 'Projector',
        self = {}, // (carousel projector abstraction)
        W = (W && W.window || window),
        C = (W.C || W.console || {}),
        Db = 0, Df;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    Df = {// DEFAULTS
        all: [],
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only
    self.wrap = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function decorate(scroller) {
        if ($.util.debug(2)) {
            C.debug(name, 'decorate', scroller);
        }
        var projector = {
            port: $(scroller.wrapper),
            scroller: scroller,
            status: 'active',
            timer: null,
            actuate: function () {
                if (Df.current) {
                    Df.current.reset();
                }
                if (this.status === 'active') {
                    this.timer = Scroller.auto(this.scroller);
                } else {
                    W.clearInterval(this.timer);
                }
            },
            changes: function (state) {
                if (this.status !== state) {
                    this.port.removeClass('scrolling ' + this.status);
                    this.status = state;
                    this.port.addClass(this.status);
                    return true;
                } else {
                    return false;
                }
            },
            activate: function () {
                if (this.changes('active')) {
                    this.actuate();
                    this.next();
                    Df.current = this;
                    return true;
                }
                return false;
            },
            reset: function () {
                if (this.changes('paused')) {
                    Df.current = null;
                    this.actuate();
                    return true;
                }
                return false;
            },
            throttle: function () {
                W.clearInterval(this.timer);
                this.timer = Scroller.auto(this.scroller);
            },
            toggle: function () {
                return (this.activate() || this.reset());
            },
            next: function () {
                this.gauge.trigger('advance');
            },
        };

        projector = $.extend(new self.wrap(), projector);
        projector.port.data(name, projector);

        projector.control = projector.port.find('.control');
        projector.gauge = projector.control.parent();
        projector.actuate();

        $(projector.scroller.wrapper).on('mousedown', function () {
            projector.throttle(); // delay auto advance if clicking
        });
        Df.all.push(projector);

        return projector;
    }

    function _attach(selector) {
        self.init();
        if ($.util.debug(2)) {
            C.debug(name, '_attach selector', selector);
        }
        var projector, scroller;

        scroller = Scroller.attach(selector);
        projector = decorate(scroller);

        $(selector + ' .control').on('click toggle', function (evt) {
            evt.stopPropagation();
            projector.toggle();
        });
        return projector;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.isInited) {
            return null;
        }
        self.isInited = true;
        Df.inits();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        attach: _attach,
    });

    return self;
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
