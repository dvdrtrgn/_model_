<?php
require './jsave_fn.php';

header('Access-Control-Allow-Origin: *');
ini_set('magic_quotes_gpc', 'off'); // does this work?
setDebug(0);

### GLOBS

$SERV = $_SERVER;
if (!isset($_SESSION)) {
    session_start();
}
$_SESSION = array_merge($_SESSION, $_GET, $_POST);
$DATA = $_SESSION;

$LOC = array(
    'doc' => "$SERV[DOCUMENT_ROOT]",
    'host' => "$SERV[HTTP_HOST]",
    'self' => "$SERV[PHP_SELF]",
);
$LOC['dir'] = dirname($LOC['self']);
$LOC['dat'] = $LOC['dir'] . '/data/';
$LOC['url'] = $LOC['host'] . $LOC['dat'];
$LOC['root'] = $LOC['doc'] . $LOC['dat'];

