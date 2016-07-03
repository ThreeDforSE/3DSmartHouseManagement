<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
    <head>
	<title>登录-ApNut智能家居管理系统 v1.0</title>
		<meta charset="utf-8">
		<link href="css/customStyle.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrapValidator.css" rel="stylesheet" type='text/css'/>
		<script type="text/javascript" src="js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrapValidator.js"></script>
		<script type="text/javascript" src="js/codeValidator.js"></script>
		<script type="application/x-javascript"> 
			addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 
		</script>
		<style>
			body{
				margin: 0;
				overflow: hidden;
			}
		</style>
</head>

<body style="position:relative;">
<div id="formbackground" style="position:absolute; width:100%; height:100%; z-index:-1;">  
<img src="images/background.jpg" height="100%" width="100%"/>  
</div>
<!----表单面板---->
<div>
<div class="panel panel-default panel-login">
  <div class="panel-heading">
  	<h1 class="panel-title fontC panel-font" align="center">用户登录</h1>
  </div>
  <div class="panel-body" align="center">
    <form id="loginFrm" method="post" action="LoginServlet" >
      	<input type="text" name="uname" class="form-controlC fontC" value="请输入注册手机号"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请输入注册手机号';}" >		
		<input type="password" name="password" class="form-controlC fontC"  value="******" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '******';}">
		<p style="color:#EE2C2C">${requestScope.information}</p>
		<div align="center">
			<input type="submit" class="btnC btn-login btn-lgC fontC" value="登	  录" >
		</div>	
		<a href="#foo" data-toggle="modal" data-target="#RetrieveModal" class="fontC aC">忘记密码？</a>
	</form>
  </div>
</div>
<!-----版权信息---->
</div>
<div class="copyRight">
	<p>Copyright &copy; 2016.ApNut Tech. All rights reserved.</p> 
</div>

			 <!-----//忘记密码弹框---->
<div class="modal fade bs-example-modal-sm" id="RetrieveModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-headerC fontC">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title fontC" id="exampleModalLabel">忘记密码</h4>
    </div>
      <div class="modal-body">
		<div class="container-fluid">
		        <div class="row">
		            <div class="col-md-10 col-md-offset-1">
		                <form id="frmForgetPwd" method="post" class="form-horizontal" action="UserInfoServlet?method=3">
		                    <div class="form-group">
		                        <label class="col-md-3 control-label fontC">手机号</label>
		                        <div class="col-md-8">
		                            <input id="phone_num" type="text" class="form-control input-lg fontC" name="uname2" value="请填写手机号" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请填写手机号';}">
                        </div>
                    </div>

                    <div id="codediv" class="form-group">
                        <label class="col-md-3 control-label fontC">验证码</label>
                        <div class="col-md-4">
                            <input id="verify_code" type="text" class="form-control input-lg fontC" name="verify_code" value="验证码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '验证码';}"/>
                        </div>
                        <button type="button" class="btn btn-danger btn-lg col-md-3 fontC" onclick="sendCode(this)">发送验证码</button>
                    </div>
                    <script type="text/javascript">
                    </script>

                    <div class="form-group">
                        <label class="col-md-3 control-label fontC">新密码</label>
                        <div class="col-md-8">
                            <input type="password" class="form-control input-lg fontC" name="new_password" value="请填写新密码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请填写新密码';}"/>
                            <span class="help-block fontC">请输入您的新密码。</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label fontC">确认密码</label>
                        <div class="col-md-8">
                            <input type="password" class="form-control input-lg fontC" name="confirm_password" value="请确认密码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请确认密码';}"/>
                            <span class="help-block fontC">请再次输入您的新密码。</span>
                        </div>
                    </div>
                    
                    <div class="form-group row" align="center">
                       <button type="submit" class="btn btn-danger fontC col-md-6 clo-md-offset-3" >提交</button>
                       <button type="submit" class="btn btn-default fontC col-md-6 clo-md-offset-3" data-dismiss="modal">关闭</button>
                </form>
            </div>
        </div>
 </div>
    </div>
  </div>
	<!-----//end of 忘记密码弹出框---->	
</body> 
</html> 