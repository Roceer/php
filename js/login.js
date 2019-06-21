$(function () {
    let userBtn = $(":text");
    let passBtn = $(":password");
    let submitBtn = $(":submit");

    submitBtn.on("click", function (e) {
        /*
        let user = userBtn.val(), pass = passBtn.val();
        console.log(user);
        console.log(pass);
        let xml = new XMLHttpRequest();
        xml.open("get", "./PHP/login.php?user=" + user + "&pass=" + pass);
        xml.send();
        xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    console.log(xml.response);
                }
            }
        }*/

        e.preventDefault();
        let qs = $("form").serialize();//序列化表单获取的值
        let xml = new XMLHttpRequest();
        xml.open("POST","./PHP/login.php");
        xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xml.responseType = "json";
        xml.send(qs);
        xml.onload = function(){
            //console.log(xml.response);//将登陆后的信息输出到控制台
            let {code,msg} = xml.response;//要想解构必须定义为json类型上面的xml.responseType = "json";
            if (code == 1) {
                alert(msg);
                location.href = "../6.18/student.php";
            }else{
                alert(msg);
            }
        }
    })
});
