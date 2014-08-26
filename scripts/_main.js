/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller, Projector, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html;

    Df = { // DEFAULTS
        projector: null,
        inits: function () {
            body = $('body');
            html = $('html');
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function bindProjector() {
        Df.projector = Projector.attach('.iS-port');

        if (U.debug()) {
            Df.projector.toggle();
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function bindings() {
        bindProjector();
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);
        Df.inits();

        _.delay(bindings);
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        mode: eval(U.testrict),
    });

    return self;
}(jQuery, Glob, Util));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
