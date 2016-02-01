$(function () {

    var data = $('#Data'),
        form = $('#Form'),
        link = $('#Link'),
        path = $('#Path');

    function post() {
        $.ajax({
            datatype: 'json',
            type: 'post',
            url: 'jsave.php',
            data: {
                data: data.val(),
                path: path.val(),
            },
            error: function () {
                console.error('error:', arguments);
            },
            success: function (obj) {
                //console.debug('success:', arguments);

                if (obj.raw === null) {
                    data.addClass('error');
                    console.warn('bad json, reading:', [obj.read]);
                } else {
                    data.removeClass('error');
                    console.info('written and read:', JSON.parse(obj.read));
                }

                link.text(obj.link).attr({
                    href: obj.link,
                    target: '_blank',
                });
            },
        });
        return false;
    }

    form.submit(post);
});
