<?php

require_once "db.php";

$key = array_keys($_POST);

$sql = "insert into student (";

//循环获取student表中的字段属性
for ($i=0;$i<count($key);$i++){
    $sql .= $key[$i] . ",";
}
//去掉最后一个多余的逗号
$sql = substr($sql,0,-1) .")values(";
//循环获取获得到的key属性对应的各个值
foreach ($_POST as $key=>$value){
    $sql .= "'$value',";
};
$sql = substr($sql,0,-1). ")";

$mysql->query($sql);

$rows = $mysql->affected_rows;

if ($rows == 1) {
    $id = $mysql->insert_id;
    echo json_encode([
        "code" => 1,
        "msg" => "信息添加成功",
        "id" => $id,
    ]);
} else {
    echo json_encode([
        "code" => 0,
        "msg" => "信息添加失败",
    ]);
}