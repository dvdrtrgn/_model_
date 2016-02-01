
var area = $('textarea');
var form = $('form:first').submit(post);
var link = $('#Url');

function post() {
    $.ajax({
        url: 'jsave.php',
        type: 'post',
        datatype: 'json',
        data: {
            data: form.find('[name=data]').val(),
            path: form.find('[name=path]').val(),
        },
        success: function (obj) {
            //console.debug('success:', arguments);

            if (obj.raw === null) {
                area.addClass('error');
                console.warn('bad json, reading:', [obj.read]);
            } else {
                area.removeClass('error');
                console.info('written and read:', JSON.parse(obj.read));
            }

            link.text(obj.link).attr({
                href: obj.link,
                target: '_blank',
            });
        },
        error: function () {
            console.error('error:', arguments);
        },
    });
    return false;
}
