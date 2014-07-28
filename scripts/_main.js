/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Servo, Projector, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df;

    Df = { // DEFAULTS
        inits: function () {
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);

        Df.inits();

        Servo.attach('._projector.iS-port');
        Projector.attach('._projector');
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
