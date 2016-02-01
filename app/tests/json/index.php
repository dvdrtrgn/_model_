<!DOCTYPE html>
<html>
  <head>
    <title>JSAVE</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <style>
      * {
          font-family: monospace;
          font-size: 1.2rem;
          line-height: 2rem;
      }
      form {
          margin: auto;
          width: 66%;
      }
      textarea, input {
          border: 1px solid gray;
          border-radius: 0.3rem;
          box-sizing: border-box;
          line-height: 1.2em;
          padding: 0.3rem;
          width: 90%;
      }
      textarea {
          height: 33em;
      }
      .error {
          color: red;
      }
    </style>
  </head>
  <body>
    <form action=".">
      <div>JSAVE (path / data) <a id="Url" href="">#</a></div>

      <input type="text" name="path" value="test">
      <textarea name="data">
{
    "num": 1234
}
      </textarea>
      <input type="submit">

    </form>

    <script>
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
    </script>
  </body>
</html>
