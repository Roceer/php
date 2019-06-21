<?php
//error_reporting(E_ALL & ~E_NOTICE);

$mysql = new mysqli('localhost','root','','roc','3306');

if ($mysql->connect_errno){
    //连接失败则退出，两种办法
    /*echo "数据库连接失败" . $mysql->connect_errno;
    exit();*/
    die();
}

$mysql->query("set names utf8");

$sql = "select * from student";//连接数据库表

$result = $mysql->query($sql)->fetch_all(MYSQLI_ASSOC);//fetch_all转化为数组

//echo "<pre>";print_r($result);//测试用，pre按照原格式输出，测试是否与数据库关联并读取内容

if (count($result)){
    echo json_encode([
        "code" => 1,
        "data" => $result
    ]);
}else{
    echo json_encode([
        "code" => 0
    ]);
}