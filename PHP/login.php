<?php
//error_reporting(E_ALL & ~E_NOTICE);
$user = $_POST["user"];
$pass = $_POST["pass"];

//2.连接数据库
$mysql = new mysqli('localhost','root','','roc','3306');

//判断连接状态
if ($mysql->connect_errno){
    echo '数据库连接失败，失败原因' . $mysql->connect_errno;
    exit();
}

$mysql->query("set names utf8");//设置查询字符集（utf8）

$sql = "select * from admin";//连接数据库表

$result = $mysql->query($sql)->fetch_all(MYSQLI_ASSOC);//fetch_all转化为数组
//var_dump($result);

for($i=0;$i<count($result);$i++){
    $ele = $result[$i];
    if ($ele["username"] === $user && $ele["password"] === $pass){
//        echo "success";
        session_start();//暂时保存数据
        $_SESSION['username'] = $user;
        echo json_encode([
            "code" => 1,
            "msg" => "登陆成功"
        ]);
        exit;
    }
}
//echo "fail";
echo json_encode([
    "code" => 0,
    "msg" => "登陆失败"
]);