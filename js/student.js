$(function(){
    let table = $("tbody");
    let progress = $(".progress-bar");
    let add = $(".btn");

    //进度条
    $(document).ajaxStart(function(){
        progress.css({width:"30%",display:"block"})
    });
    $(document).ajaxSuccess(function(){
        progress.css({width:"100%"})
    })
    progress.on("webkitTransitionEnd",function(){
        $(this).css({display: "none",width:0})
    })

    /*
    * URL: query.php
    * Method: get
    * params: null
    * datatype: json
    * success显示一些东东
    * */
    $.ajax({
        url:"PHP/query.php",
        type:"POST",
        async:"true",
        dataType:"json",
        success:function(res){
            let {code,data} = res;//定义解构数组
            if (code == 1) {
                render(data);
            }else{
                alert("暂无数据");
            }
        }
    })

    //删除
    table.on("click","button",function(){
        // let id = $(this).parent('tr');
        let tr = $(this).closest('tr');
        let id = tr.attr("id");
        $.ajax({
            url:"PHP/delete.php",
            type: "POST",
            data:{id},
            async:"false",
            dataType: "json",
            success:function(res){
                let {code,msg} = res;//定义解构数组
                if (code == 1) {
                    tr.remove();
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
            }
        })
    })

    //修改
    table.on("blur","input",function(){
        let id = $(this).closest("tr").attr("id");
        let val = $(this).val();
        let type = $(this).data("type");
        $.ajax({
            url:"PHP/update.php",
            type: "POST",
            data: {type,id,val},
            dataType:"json",
            success:function(res){
                let {code,data} = res;
                if (code == 1) {
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
            }
        })
    })

    //添加
    add.click(function(e){
        e.preventDefault();
        let qs = $("form").serialize();//序列化表单内容为字符串
        let data = $('form').serializeArray();//序列化表单位数组
        $.ajax({
            url:"PHP/add.php",
            type:"POST",
            data:qs,
            dataType:"json",
            success:function(res){
                if (res.code) {
                    let obj = arrayToJson(data);//调用下面的arrayToJson函数，将表单中设置的names属性与每个names相对用的值value赋给obj
                    obj.id = res.id;//表单中输入没有ID，通过该语句将php返回的res.id赋值给obj
                    // {id,names,age,sex,major}
                    render([obj]);//将obj数组对应的对象渲染
                    alert("信息添加成功");
                }else{
                    alert("信息添加失败");
                }
            }
        })

    })

    //
    function arrayToJson(data){
        let obj = {};//定义obj为对象
        data.forEach(ele =>{
            let {name,value} = ele;
            obj[name] = value;//循环遍历将每一个表单中输入的内容一一辅助到obj的对象中，每一个name属性对应一个value
        })
        return obj;
    }

    //渲染
    function render(res){

        let html = '';
        res.forEach(ele => {
            html += `
                <tr id="${ele.id}">
                    <td><input type="" value="${ele.names}" data-type="names"></td>
                    <td><input type="" value="${ele.age}" data-type="age"></td>
                    <td><input type="" value="${ele.sex}" data-type="sex"></td>
                    <td><input type="" value="${ele.major}" data-type="major"></td>
                    <td><button class="btn btn-danger btn-xs">删除</button></td>
                </tr>
            `
        })
        // table.html(function(index,value){
        //     return value + html;
        // });
        table.html((index,value) => value + html);
    }

})