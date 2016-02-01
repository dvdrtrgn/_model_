<?php
require './jsave_cf.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <title>JSAVE</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <style>@import "./style.css";</style>
  </head>
  <body>
    <form id="Form" action=".">
      <div>JSAVE (path / data) <a id="Link" href="">#</a></div>

      <input id="Path" type="text" name="path" value="<?php echo "$DATA[path]"; ?>">
      <textarea id="Data" name="data"><?php echo stripslashes("$DATA[data]"); ?></textarea>
      <input type="submit">

    </form>

    <script src="./jsave.js"></script>
    <script src="./script.js"></script>
  </body>
</html>
