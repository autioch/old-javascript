<?php

if (!isset($_GET['name'])) {
    die('Podaj nazwę gry - GET[\'name\'].');
}

$name = $_GET['name'];

if (is_dir($name)) {
    die('Istnieje już taka gra.');
}

mkdir($name);
file_put_contents($name . '/index.html', '<!DOCTYPE HTML>
<html>
    <head>
        <title>' . ucfirst($name) . ' : Games</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="height=486,initial-scale=1.0,maximum-scale=1.0" />
        <meta name="author" content="Jakub Szczepaniak" />
        <script type="text/javascript" src="../jquery-2.0.3.js"></script>
        <script type="text/javascript" src="../jquery-ui-1.10.3.custom.js"></script>
        <script type="text/javascript" src="../qblibrary.js"></script>
        <script type="text/javascript" src="files/scripts/' . $name . '.lib.js"></script> 
        <script type="text/javascript" src="files/scripts/' . $name . '.game.js"></script> 
        <link rel="stylesheet" type="text/css" href="files/' . $name . '.css" />        
    </head>
    <body style="margin:3px">
        <script type="text/javascript">
            $(qbLib.init' . ucfirst($name) . ');
        </script>
    </body>
</html>');

mkdir($name . '/files');

file_put_contents($name . '/files/' . $name . '.css', '.qbGameObject{position:absolute;left:0px;top:0px;border:0px;margin:0px;padding:0px;display:none;
              user-select:none;-o-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;}
.qbBackground{background-color:#aaa;opacity:0.5;z-index:61;position:fixed;}
.qbContainer{position:fixed;z-index:62;background-color:#afa;}
.qbMessageScreen{background-color:#0e0;cursor:pointer;width:360px;z-index:92;padding:15px;}
');

mkdir($name . '/files/images');
mkdir($name . '/files/sounds');
mkdir($name . '/files/scripts');

file_put_contents($name . '/files/scripts/' . $name . '.lib.js', 'var qbLib = qbLib || {};
(function(q) {


}(qbLib))
');

file_put_contents($name . '/files/scripts/' . $name . '.game.js', 'var qbLib = qbLib || {};
(function(q) {

    q.init' . ucfirst($name) . ' = function() {
        bg = new q.qbBackground();
        bg.present();

        splash = new q.qbMessageScreen();
        splash.message(\'' .ucfirst($name). '\', \'\', \'\', \'\').follow(initialize).present();
    }
    
    function initialize(){
        alert(\''.ucfirst($name).' dziala \');

    }


}(qbLib))
');





