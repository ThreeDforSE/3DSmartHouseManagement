<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
    <head>
	<title>登录-ApNut智能家居管理系统 v1.0</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrapValidator.css" rel="stylesheet" type='text/css'/>

		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript" src="js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrapValidator.js"></script>
		<script type="text/javascript" src="js/ValidateCode.js"></script>
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

<body>
	 <!-----start-main---->
	 <div class="main">
		<div class="login-form">
			<h1 class="fontC">ApNut智能家居管理系统</h1>
			<h3 class="fontC">用户登录</h3>
			
					<div class="head">
						<img src="images/lg.png" alt=""/>
					</div>
			<form id="loginFrm" method="post" action="LoginServlet" >
				<input type="textC" name="uname" id="uname" class="text fontC" value="请输入注册手机号"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请输入注册手机号';this.color=#E8E8E8;}" >
				<input type="passwordC" class="fontC" name="password" id="pwd" value="******" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '******';}">
				<p style="color:#EE2C2C">${requestScope.information}</p>
				<div class="submit">
					<input type="submit" class="fontC" value="登录" >
				</div>	
				<p><a href="#foo" data-toggle="modal" data-target="#RetrieveModal" class="fontC">忘记密码？</a></p>
				</form>
		</div>
			<!--//End-login-form-->
					<!-- Button trigger modal -->

			 <!-----start-copyright---->
   					<div class="copy-right">
						<p>Copyright &copy; 2016.ApNut Tech. All rights reserved.</p> 
					</div>
				<!-----//end-copyright---->
		</div>
			 <!-----//end-main---->


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
			                <form id="frmForgetPwd" method="post" class="form-horizontal">
			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">手机号</label>
			                        <div class="col-md-8">
			                            <input id="phone_num" type="text" class="form-control input-lg fontC" name="uname2" value="请填写手机号" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请填写手机号';}">
			                        </div>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">验证码</label>
			                        <div class="col-md-4">
			                            <input type="text" class="form-control input-lg fontC" name="verify_code" value="验证码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '验证码';}"/>
			                        </div>
			                        <button type="button" class="btn btn-danger btn-lg col-md-3 fontC" onclick="sendCode(this)">发送验证码</button>
			                        <p id="hid_txt" style="display:hidden" >${sessionScope.vcode}</p>
			                    </div>
			                    <script type="text/javascript">
			                    function senMsg(){
			                    	doPostBack(backFunc1,document.getElementById("uname").value);
			                    }
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
		
			                </form>
			            </div>
			        </div>
			 </div>
	      </div>

	      <div class="modal-footer">
	        <button type="button" class="btn btn-default fontC" data-dismiss="modal">关闭</button>
	        <button type="submit" class="btn btn-danger fontC" >提交</button>
	      </div>
	    </div>
	  </div>
	</div>

	<!-----//end of 忘记密码弹出框---->

<script type="text/javascript">

    $(document).ready(function() {
    $('#frmForgetPwd').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            uname: {
                validators: {
                    notEmpty: {
                        message: 'The full name is required and cannot be empty'
                    }
                }
            },
            verify_code: {
                enabled: false,
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty'
                    },
    
                }
            },
            new_password: {
                enabled: false,
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required and cannot be empty'
                    },
                    identical: {
                        field: 'confirm_password',
                        message: 'The password and its confirm must be the same'
                    }
                }
            }
            // confirm_password: {
            //     enabled: false,
            //     validators: {
            //         notEmpty: {
            //             message: 'The confirm password is required and cannot be empty'
            //         },
            //         identical: {
            //             field: 'new_password',
            //             message: 'The password and its confirm must be the same'
            //         }
            //     }
            // }
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

  //   function doCheckInfo(){
		// 	//document.getElementById("文本框名").value
		// 	var oName=document.getElementById("uname");
		// 	var nPwd=document.getElementById("pwd");
		// 	//if((document.loginFrm.uname.value==''or document.loginFrm.uname.value=='请输入注册手机号')&&(document.loginFrm.password.value==''or document.loginFrm.password.value=='******'))
		// 	if((oName.value==''or oName.value=='请输入注册手机号')&&(nPwd.value==''or nPwd.value=='******'))
		// 	{
		// 		alert('提示','用户名或密码不可为空！');
		// 	}
		// };
//	$('#exampleModal').on('show.bs.modal', function (event) {
//  var button = $(event.relatedTarget) // Button that triggered the modal
//  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//  var modal = $(this)
//  modal.find('.modal-title').text('New message to ' + recipient)
//  modal.find('.modal-body input').val(recipient)
//})
</script>

		
<div style="display:none"><script src='http://v7.cnzz.com/stat.php?id=155540&web_id=155540' language='JavaScript' charset='gb2312'></script></div>
</body> 
</html> 