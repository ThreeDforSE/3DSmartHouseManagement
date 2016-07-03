//发送验证码时添加cookie
function addCookie(name,value,expiresHours){ 
    var cookieString=name+"="+escape(value); 
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresHours>0){ 
        var date=new Date(); 
        date.setTime(date.getTime()+expiresHours*1000); 
        cookieString=cookieString+";expires=" + date.toUTCString(); 
    } 
        document.cookie=cookieString; 
} 
//修改cookie的值
function editCookie(name,value,expiresHours){ 
    var cookieString=name+"="+escape(value); 
    if(expiresHours>0){ 
      var date=new Date(); 
      date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
      cookieString=cookieString+";expires=" + date.toGMTString(); 
    } 
      document.cookie=cookieString; 
} 
//根据名字获取cookie的值
function getCookieValue(name){ 
      var strCookie=document.cookie; 
      var arrCookie=strCookie.split("; "); 
      for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]==name){
          return unescape(arr[1]);
          break;
        }else{
             return ""; 
             break;
         } 
      } 
}

$(function(){
    $("#btn_SendVC").click(function (){
        sendCode($("#btn_SendVC"));
    });
    v = getCookieValue("secondsremained");//获取cookie值
    if(v>0){
        settime($("#btn_SendVC"));//开始倒计时
    }
})
//发送验证码
function sendCode(obj){
    var phonenum = $("#phone_num").val();
//    var result = isPhoneNum();
//    if(result){
        doPostBack(backFunc,{"uname2":phonenum});
    	addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
        settime(obj);//开始倒计时    
//    }
}
//将手机利用ajax提交到后台的发短信接口
function doPostBack(backFunc,queryParam) {
    $.ajax({
        async : false,
        cache : false,
        type : 'POST',
        url : "UserInfoServlet?method=2",// 请求的action路径
        data:queryParam,
        error : function() {// 请求失败处理函数
        },
        success : backFunc
    });
}
function backFunc() {// 请求失败处理函数
//},(data){
//	var d = document.getElementById("hid_txt");
//    <p id="hid_txt" style="display:inline" >${sessionScope.vcode}</p>
//		var newP=document.createElement("p");
//		newP.setAttribute("id","hid_txt");
////		newP.innerHTML=vcode;
//		newP.innerHTML= "<%=Session(/"uname2/")%>";
//		document.getElementById("codediv").appendChild(newP);
//    d.innerHTML=data;
//    if(d!=){
//        alert(newP.innerHTML);
//    }else{//返回验证码
//        alert("模拟验证码:"+data);
//        $("#code").val(d.msg);
//    }
}
//开始倒计时
var countdown;
function settime(obj) { 
    countdown=getCookieValue("secondsremained");
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.innerHTML="获取验证码"; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.innerHTML="重新发送(" + countdown + ")"; 
        countdown--;
        editCookie("secondsremained",countdown,countdown+1);
    } 
    setTimeout(function() { settime(obj) },1000) //每1000毫秒执行一次
} 

//<p id="hid_txt" style="display:hidden"></p>
    $(document).ready(function() {
    $('#frmForgetPwd').bootstrapValidator({
        message: '请填写完整信息',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            uname2: {
                validators: {
                    notEmpty: {
                        message: '手机号不可为空'
                    },
                    remote: {
                        url: 'UserInfoServlet?method=1',
                        message: '用户名不存在'
                    },
                    regexp: {
                        regexp: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
                        message: '这不是一个手机号'
                    }
                }
            },
            verify_code: {
                validators: {
                    notEmpty: {
                        message: '验证码不可为空'
                    },
                    remote: {
                        url: 'UserInfoServlet?method=6',
                        message: '验证码错误'
                    },
                    numeric: {
                      message: '只可输入数字'
                    }
                }
            },
            new_password: {
                enabled: false,
                validators: {
                    notEmpty: {
                        message: '密码不可为空'
                    },
                    identical: {
                        field: 'confirm_password',
                        message: '密码不一致'
                    }
                }
            },
            confirm_password: {
                enabled: false,
                validators: {
                    notEmpty: {
                        message: '密码不可为空'
                    },
                    identical: {
                        field: 'new_password',
                        message: '密码不一致'
                    }
                }
            }
        }
    });

    // Enable the password/confirm password validators if the password is not empty
    $('#frmForgetPwd').find('[name="new_password"]').on('keyup', function() {
        var isEmpty = $(this).val() == '';
        $('#frmForgetPwd').bootstrapValidator('enableFieldValidators', 'new_password', !isEmpty)
                        .bootstrapValidator('enableFieldValidators', 'confirm_password', !isEmpty);
        if ($(this).val().length == 1) {
            $('#frmForgetPwd').bootstrapValidator('validateField', 'new_password')
                            .bootstrapValidator('validateField', 'confirm_password');
        }
    });
});