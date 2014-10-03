/*jslint white:false */
/*globals _, C, W, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// EXTENDS
//
// JQUERY
//
(function ($) {
    var EMPT = '';
    var ZWSP = '&#x200b;';

    $.fn.toMailto = function () {
        this.each(function () {
            var me = $(this),
                str, url;

            str = me.text();
            url = 'mailto:' + str.replace(' ', EMPT); // no spaces, please
            me.text(EMPT);

            str = str.replace(/(.+?)(\@.+)/, '$1' + ZWSP + '$2');
            // wbr:after { content: "\00200B" } // &#x200b;
            $('<a>').attr('href', url).html(str).appendTo(me);
        });
        return this;
    };

    $.scrollTo = function (ele, ms) {
        var $me = $(ele),
            doc = $.browser.msie ? 'html' : 'body';

        if ($me.length) {
            $(doc).stop().animate({
                scrollTop: $me.offset().top,
            }, ms);
        }
    };

    $.ns = $.nameSpace = function (str, nom) {
        var arr;

        if (!nom) {
            throw new Error('no namespace given');
        }
        arr = str.split(' ');

        // add dot and name to each event type
        str = _.map(arr, function (e) {
            return e + '.' + nom;
        }).join(' ');

        if (!str) {
            C.warn('namespace error');
        }
        return str;
    };

    // $erpent eats tail
    $.reify = function (host) {
        $.each(host, function (i, e) {
            if (i.charAt(0) === '$') {
                host[i] = $(e);
            }
        });
    };
}(jQuery));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
