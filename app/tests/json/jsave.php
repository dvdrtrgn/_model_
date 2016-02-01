<?php
# php -S localhost:8999
require './jsave_cf.php';

setDebug("$DATA[dbg]");

### VARS

$path = "$DATA[path]";
$data = parseJson("$DATA[data]"); // parse test
$DATA['data'] = $data;
$link = bitSaver($path, $data);

$json = array(
    'dbg' => $debug,
    'loc' => $LOC,
    'link' => $link,
    'read' => file_get_contents("$LOC[doc]$link"),
    'raw' => $data,
);

if ($debug < 2 && !empty($path)) {
    header('Content-type: application/json');
    echo json_encode($json);
    die();
}
### ### ### ### ### ### ###
?><!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>JSAVE</title>
  </head>
  <body>
    <pre><?php
        if ($debug) {
            clog('Sess:', $DATA);

            echo 'Json:';
            print_r($json);

            echo 'SERV:';
            print_r($SERV);
        }
        ?></pre>
  </body>
</html>
