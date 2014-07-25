/*jslint es5:true, white:false */
/*globals _, Global, Servo, Rotor, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W, $) {
    'use strict';
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        Df;

    Df = { // DEFAULTS
        inits: function () {
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        Servo.attach('._spending.iS-port');
        Rotor.attach('._spending');
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
