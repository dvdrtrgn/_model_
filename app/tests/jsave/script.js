$(function () {

    var data = $('#Data'),
        form = $('#Form'),
        link = $('#Link'),
        path = $('#Path');

    form.submit(function () {
        return jsave(data.val(), path.val(), function (obj) {
            //console.debug('success:', arguments);

            if (obj.raw === null) {
                data.addClass('error').val(obj.read);
            } else {
                data.removeClass('error');
                console.info('writing:', JSON.parse(obj.read));
            }

            link.text(obj.link).attr({
                href: obj.link,
                target: '_blank',
            });

        });
    });
});
