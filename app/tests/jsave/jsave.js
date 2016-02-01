
function jsave(data, path, cb) {
    $.ajax({
        datatype: 'json',
        type: 'post',
        url: 'jsave.php',
        data: {
            data: data,
            path: path || 'temp',
        },
        error: function () {
            console.error('error:', arguments);
        },
        success: cb,
    });
    return false;
}
