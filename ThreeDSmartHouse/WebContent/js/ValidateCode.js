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
    var result = isPhoneNum();
    if(result){
    	
//    	doPostBack(backFunc,phonenum);
        doPostBack(backFunc,{"uname2":phonenum});
    	addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
        settime(obj);//开始倒计时
        
    }
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
function backFunc(data){
	var d = document.getElementById("hid_txt").innerHTML;
//    var d = $.parseJSON(data);
//    if(d!=){
        alert(d);
//    }else{//返回验证码
//        alert("模拟验证码:"+d.msg);
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
//校验手机号是否合法
function isPhoneNum(){
    var phonenum = $("#phone_num").val();
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(!myreg.test(phonenum)){ 
        alert('请输入有效的手机号码！'); 
        return false; 
    }else{
        return true;
    }
}