<?php
# php -S localhost:8999
setDebug(0);
header('Access-Control-Allow-Origin: *');
ini_set('magic_quotes_gpc', 'off'); // does this work?

### SUPER GLOBS

if (!isset($_SESSION)) {
    session_start();
}
$_SESSION = array_merge($_SESSION, $_GET, $_POST);

$DATA = $_SESSION;
$SELF = $_SERVER['PHP_SELF'];
$SERV = $_SERVER;

setDebug("$DATA[dbg]");

### GLOBALS

$DAT = getDataRoot();
$DOC = getDocRoot();

$url = "$SERV[HTTP_HOST]$DAT";
$data = json_decode(stripslashes("$DATA[data]")); // parse test
$path = "$DATA[path]";

function setDebug($dbg) {
    global $debug;

    if (empty($dbg)) {
        return;
    }

    ini_set('display_errors', $dbg > 0 ? 1 : 0);
    error_reporting($dbg > 1 ? E_ALL : E_WARNING);
    $debug = $dbg;
}

function getDataRoot() {
    global $SERV;
    return dirname("$SERV[PHP_SELF]") . '/data/';
}

function getDocRoot() {
    global $SERV;
    return "$SERV[DOCUMENT_ROOT]";
}

function ensureDir($path) {
    global $debug;

    if (!is_dir($path)) {
        ensureDir(dirname($path));

        if ($debug) {
            echo "<hr>$path<hr>";
        }
        mkdir($path, 0777);
    }
}

function bitSaver($path, $data) {
    global $DOC, $DAT;
    $root = "$DOC$DAT";

    if (!empty($path) && !empty($data)) {
        ensureDir($root . dirname($path));
        file_put_contents("$root$path.json", json_encode($data));
    }

    return "$DAT$path.json";
}

function clog($msg, $obj) {
    $str = json_encode($obj);
    $arr = array();
    $arr[] = '<script>';
    $arr[] = "console.log('$msg', JSON.parse('$str'));";
    $arr[] = '</script>';
    echo implode('', $arr);
}

$link = bitSaver($path, $data);

$json = array(
    'dbg' => $debug,
    'doc' => $DOC,
    'link' => $link,
    'read' => file_get_contents("$DOC$DAT$path.json"),
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
            $DATA['dbg'] = $debug;

            echo 'Json:';
            print_r($json);

            clog('Sess:', $DATA);

            echo 'SERV:';
            print_r($SERV);
        }
        ?></pre>
  </body>
</html>
