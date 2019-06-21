<?php
$mysql = new mysqli('localhost','root','','roc','3306');

if ($mysql->connect_errno){
    //连接失败则退出，两种办法
    /*echo "数据库连接失败" . $mysql->connect_errno;
    exit();*/
    die();
}

$mysql->query("set names utf8");

