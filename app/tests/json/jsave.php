<?php
# php -S localhost:8999
setDebug(0);
header('Access-Control-Allow-Origin: *');

### SUPER GLOBS

if (!isset($_SESSION)) {
    session_start();
}
$_SESSION = array_merge($_SESSION, $_GET, $_POST);

$DATA = $_SESSION;
$SELF = $_SERVER['PHP_SELF'];
$SERV = $_SERVER;

### GLOBALS

$DAT = getDataRoot();
$DOC = getDocRoot();

$url = "$SERV[HTTP_HOST]$DAT";
$data = "$DATA[data]";
$path = "$DATA[path]";

function setDebug($dbg) {
    global $debug;
    $debug = empty($dbg) ? 0 : $dbg;
    ini_set('display_errors', $debug > 0 ? 1 : 0);
    error_reporting($debug > 1 ? E_ALL : E_WARNING);
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
        if ($debug) echo "<hr>$path<hr>";
        mkdir($path, 0777);
    }
}

function bitSaver($path, $data) {
    global $DOC, $DAT;
    $root = "$DOC$DAT";

    if (!empty($path) && !empty($data)) {
        ensureDir($root . dirname($path));
        file_put_contents("$root$path.json", $data);
    }

    return "$DAT$path.json";
}

$nom = bitSaver($path, $data);

$json = array(
    'doc' => $DOC,
    'link' => "<a href=$nom>$nom</a>",
    'read' => file_get_contents("$DOC$DAT$path.json"),
);

if (!$debug || !empty($path)) {
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
            $DATA['debug'] = $debug;
            echo 'Json:'; print_r($json);
            echo 'Sess:'; print_r($DATA);
            echo 'SERV:'; print_r($SERV);
        }
        ?></pre>
  </body>
</html>
