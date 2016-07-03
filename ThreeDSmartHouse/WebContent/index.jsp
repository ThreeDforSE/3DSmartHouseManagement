<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>
<head>
	<title>ApNut智能家居管理系统 v1.0</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript" src="js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/three.js"></script>

		<script type="text/javascript" src="js/SceneLoader.js"></script>
   		<script type="text/javascript" src="js/SceneExporter.js"></script>
    	<script type="text/javascript" src="js/dat.gui.js"></script>
    	<script type="text/javascript" src="js/IndexControl.js"></script>
    	<script type="text/javascript" src="js/webGL.js"></script>
    	<script type="text/javascript" src="js/ValidateCode.js"></script>
	    <script type="text/javascript" src="js/TrackballControls.js"></script>
	    <script type="text/javascript" src="js/ThreeBSP.js"></script>

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
	<!-- 判断是否已经登录 -->
	<%  
  		if(session.getAttribute("uid")==null)
  		{%>
  		<div class="alert alert-danger" role="alert">
  			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  			<span class="sr-only">Error:</span>
  			您当前没有登录！3秒后将跳转到登录页面……<a href="login.jsp" class="alert-link">如果没有跳转，请点击此处立即跳转。</a>
		</div>
    	<%
        response.setHeader("refresh","3;URL=login.jsp");
        return;
   		}
   	%>
	<!-- 导航条 -->
	<nav class="navbar navbar-default fontC navbar-fixed-top" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">ApNut科技</a>
		</div>
		<div class="row">
			<div class="col-md-offset-5">
			     <p id="modeTitle" class="navbar-textC" value="浏览模式">浏览模式</p>
		    </div>
		    <div class="col-md-offset-8">
		    	<ul class="nav navbar-navC navbar-rightC">
					<li ><a href="#" id="edit" onclick="editMode()">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑
					</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span> 帮助
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><a href="#" id="contact">联系客服</a></li>
							<li><a href="http://121.42.33.120/projects/d/wiki/Wiki" id="helper" target=_blank>使用帮助</a></li>
						</ul>
					</li>
					<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-user" aria-hidden="true"></span> ${sessionScope.uname}
						<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#foo" id="accountInfo" data-toggle="modal" data-target="#userSettingModal">账户信息</a></li>
						<li><a href="LogoutServlet">退出</a></li>
					</ul>
					</li>
				</ul>
		    </div>	
		</div>
	</nav>

		<!-- WebGL 3D模块 -->
	<div id="WebGL-output" style="position:absolute;z-index:10;">
	</div>

	<!-- 视图按钮组 -->
	<div class="row fontC" style="position: absolute; z-index:200;top: 60px;left: 200px;">
		<div class="col-md-12 col-md-offset-3">
			<button type="button" id="mode3D" class="btnLine btn-grey active col-md-6" onclick="planeMode()">3D</button>
			<button type="button" id="modePlane" class="btnLine btn-grey col-md-6 " onclick="planeMode()">平面</button>
		</div>
	</div>

	<!-- 保存按钮组 -->
	<div class="row fontC save-button">
		<div class="col-md-12 col-md-offset-3">
			<button type="button" id="editSave" class="btnLine btn-orange active col-md-6 " onclick="editMode()" style="display: none;">保存</button>
			<button type="button" id="editCancel" class="btnLine btn-orange col-md-6 " onclick="editMode()" style="display: none;">取消</button>
		</div>
	</div>

	<!-- 左右按钮 -->
	<button type="button" class="btnLeft" id="btn_control" style="position: absolute; z-index:180;top: 40%;left: 25px;" onclick="showSideLsit()">
		<span id="sp_control" class="glyphicon glyphicon-chevron-right" ></span>
	</button>

	<!-- 隐藏状态边栏 -->
	<div id="hidden_list" class="box-vertical">
			<div style="left:8px; top: 10px; margin-left: 8px; margin-top: 10px;">
				<span class="glyphicon glyphicon-align-justify " aria-hidden="true"></span>		
			</div>
			<div>
				<p class="fontC" style="margin-left: 8px;margin-top:10px;font-size: 12px;">我 的 产 品 列 表</p>
			</div>
	</div>

	<!-- 显示状态边栏 -->	
	<div id="shown_list" style="display:none;">
		<div class="box-horizontal">
			<p class="fontC" align="center" style="margin-top:10px;font-weight :bold;"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>  我的产品列表</p>
		</div>
		<div id="product_list_group" class="list-group"  style="width:230px;height:100%; overflow-y:auto;left:0px;top:90px;position:absolute;z-index:250;">
				<a id=AT-01L"" href="#" class="list-group-itemC fontC row" onclick="showInfo(this);">
				<!-- 此处待议，列表收参数 MyProductListServlet-->
		  			<img src="images/tv1.png" class="col-md-6">
		  			<div class="col-md-6">
					<h5 class="list-group-item-heading">平板电视</h5>
			    	<p class="list-group-item-textC">AT-01L</p>
			    	<p class="list-group-item-textC-sm small-font" align="center">已放置 01/ 01</p>
					</div>
		  		</a>

				<a href="#" class="list-group-itemC fontC row">
		  			<img src="images/pc1.png" class="col-md-6">
		  			<div class="col-md-6">
						<h5 class="list-group-item-heading">笔记本</h5>
				    	<p class="list-group-item-textC">AP-01T</p>
				    	<p class="list-group-item-textC-sm small-font" align="center">已放置 01/ 01</p>
					</div>
		  		</a>

		  		<a href="#" class="list-group-itemC fontC row">
		  			<img src="images/refrig_1.png" class="col-md-6">
		  			<div class="col-md-6">
						<h5 class="list-group-item-heading">单开门冰箱</h5>
				    	<p class="list-group-item-textC">AT-01L</p>
				    	<p class="list-group-item-textC-sm small-font" align="center">已放置 00/ 01</p>
					</div>
		  		</a>
		</div>
	</div>




<div id="tb_detailInfo" class="panel panel-detailinfo fontC" style="width:500px;top:20%;left: 20%; position:absolute; z-index:200;display:none;">
  <!-- Default panel contents -->
  <div class="panel-heading">
  	产品详情
  	<button type="button" class="close" onclick="dismiss()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </div>
  <div class="panel-body row">
	  <div class="col-md-8">
	  	<h2 align="center">平板电视</h2>
	    <p align="center">AT-01L</p>
	  </div>
	  <div class="col-md-4">
	  	<button type="button" class="btn btn-lg disabled" style="margin-top:15px;right:100px;">查看实时状态</button>
	  </div>
  </div>
  <!-- Table -->
  <table class="table">
    <tr>    	<td >商品名称</td>    	<td>平板电视</td>    	<td>型    号</td>    	<td>AT-01L</td>    </tr>
    <tr>    	<td>类    型</td>    	<td>液晶电视</td>    	<td>颜    色</td>    	<td>黑    色</td>    </tr>
    <tr>    	<td>分辨率</td>    	<td>3840×2160</td>    	<td>屏幕尺寸</td>    	<td>55英寸</td>    </tr>
    <tr>    	<td>屏幕比例</td>    	<td>16:9</td>    	<td>电源电压</td>    	<td>220V</td>    </tr>
    <tr>    	<td>功率</td>    	<td>196W</td>    	<td>上市时间</td>    	<td>2015.8</td>    </tr>
  </table>
</div>


		<!-- 用户信息设置模块 -->
	<div class="modal fade fontC" id="userSettingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-headerB">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">账户设置</h4>
	      </div>
	      <div class="modal-body">

	      	<div>
	      		<p style="color:#B22222;">
	      			*根据需要填写以下信息，无需修改的项目可不填。
	      		</p>
	      	</div>

			<div class="container-fluid">
			        <div class="row">
			            <div class="col-md-10 col-md-offset-1">
			                <form id="signupForm" method="post" class="form-horizontal">
			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">更换手机号</label>

			                        <div class="col-md-8">
			                            <input type="text" id="phone_num" class="form-control input-lg fontC" name="uname" value="请填写手机号" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请填写手机号';}" autofocus="autofocus">
			                        </div>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">验证码</label>
			                        <div class="col-md-4">
			                            <input type="text" class="form-control input-lg fontC" name="verify_code" value="验证码" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '验证码';}"/>
			                        </div>
			                        <input type="button" id="btn_SendVC" class="btn btn-primary btn-lg col-md-3 fontC" value="获取验证码"/>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">更换密码</label>
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
	     	<button type="button" class="btn btn-primary">保存修改</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	       </div>
	    </div>
	  </div>
	</div>
	<!-- 产品列表-打开状态-废弃
	<div id="shown_list" class="side-list-my" 。>
		<div class="box-horizontal">
			<p class="fontC" align="center" style="margin-top:10px;">我的产品列表</p>
		</div>
		<div align="center" style="margin-left:0px; width:100%;height:100%;left:0px;top:90px;position:absolute;z-index:150;">
			<iframe src="sidemodel.html" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
		</div>
	</div>
	 -->
	 
	 <script type="text/javascript">
	 </script>
</body>
</html>