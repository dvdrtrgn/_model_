/*jslint white:false */
/*global _, C, W, Util, jQuery,
        Test:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Test = (function ($, U) { // IIFE
    'use strict';
    var name = 'Test',
        self = {}, // (misc experiments)
        Df;

    Df = { // DEFAULTS
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _init() {
        if (self.isInited(true)) {
            return null;
        }
        Df.inits();

        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
    });

    return self;
}(jQuery, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
