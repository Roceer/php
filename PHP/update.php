<?php

require_once "db.php";

$id = $_POST["id"];
$val = $_POST["val"];
$type = $_POST["type"];

$sql = "update  student set $type='$val' where id=$id";

$result = $mysql->query($sql);
//echo "<pre>";print_r($result);//测试用，pre按照原格式输出，测试是否与数据库关联并读取内容

$rows = $mysql->affected_rows;//已经是一个数，不需要在进行count变化

if ($rows == 1) {
    echo json_encode([
        "code" => 1,
        "msg" => $result
    ]);
} else {
    echo json_encode([
        "code" => 0
    ]);
}