<?php

function parseJson($str) {
    return json_decode(stripslashes($str));
}

function setDebug($dbg) {
    global $debug;

    if (empty($dbg)) {
        return;
    }

    ini_set('display_errors', $dbg > 0 ? 1 : 0);
    error_reporting($dbg > 1 ? E_ALL : E_WARNING);
    $debug = $dbg;
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
    global $LOC;
    $root = "$LOC[root]";
    $file = "$path.json";

    if (!empty($path) && !empty($data)) {
        ensureDir($root . dirname($path));
        file_put_contents("$root$file", json_encode($data));
    }

    return "$LOC[dat]$file";
}

function clog($msg, $obj) {
    $str = json_encode($obj);
    $arr = array();
    $arr[] = '<script>';
    $arr[] = "console.log('$msg', JSON.parse('$str'));";
    $arr[] = '</script>';
    echo implode("\n", $arr);
}
