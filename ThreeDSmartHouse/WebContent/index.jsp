<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>
<head>
	<title>ApNut���ܼҾӹ���ϵͳ v1.0</title>
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
	<!-- �ж��Ƿ��Ѿ���¼ -->
	<%  
  		if(session.getAttribute("uid")==null)
  		{%>
  		<div class="alert alert-danger" role="alert">
  			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  			<span class="sr-only">Error:</span>
  			����ǰû�е�¼��3�����ת����¼ҳ�桭��<a href="login.jsp" class="alert-link">���û����ת�������˴�������ת��</a>
		</div>
    	<%
        response.setHeader("refresh","3;URL=login.jsp");
        return;
   		}
   	%>
	<!-- ������ -->
	<nav class="navbar navbar-default fontC navbar-fixed-top" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">ApNut�Ƽ�</a>
		</div>
		<div class="row">
			<div class="col-md-offset-5">
			     <p id="modeTitle" class="navbar-textC" value="���ģʽ">���ģʽ</p>
		    </div>
		    <div class="col-md-offset-8">
		    	<ul class="nav navbar-navC navbar-rightC">
					<li ><a href="#" id="edit" onclick="editMode()">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> �༭
					</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span> ����
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><a href="#" id="contact">��ϵ�ͷ�</a></li>
							<li><a href="http://121.42.33.120/projects/d/wiki/Wiki" id="helper" target=_blank>ʹ�ð���</a></li>
						</ul>
					</li>
					<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-user" aria-hidden="true"></span> ${sessionScope.uname}
						<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#foo" id="accountInfo" data-toggle="modal" data-target="#userSettingModal">�˻���Ϣ</a></li>
						<li><a href="LogoutServlet">�˳�</a></li>
					</ul>
					</li>
				</ul>
		    </div>	
		</div>
	</nav>

		<!-- WebGL 3Dģ�� -->
	<div id="WebGL-output">
	</div>

	<!-- ��ͼ��ť�� -->
	<div class="row fontC" style="position: absolute; z-index:200;top: 60px;left: 200px;">
		<div class="col-md-12 col-md-offset-3">
			<button type="button" id="mode3D" class="btnLine btn-grey active col-md-6" onclick="planeMode()">3D</button>
			<button type="button" id="modePlane" class="btnLine btn-grey col-md-6 " onclick="planeMode()">ƽ��</button>
		</div>
	</div>

	<!-- ���水ť�� -->
	<div class="row fontC save-button">
		<div class="col-md-12 col-md-offset-3">
			<button type="button" id="editSave" class="btnLine btn-orange active col-md-6 " onclick="editMode()" style="display: none;">����</button>
			<button type="button" id="editCancel" class="btnLine btn-orange col-md-6 " onclick="editMode()" style="display: none;">ȡ��</button>
		</div>
	</div>

	<!-- ���Ұ�ť -->
	<button type="button" class="btnLeft" id="btn_control" style="position: absolute; z-index:180;top: 40%;left: 25px;" onclick="showSideLsit()">
		<span id="sp_control" class="glyphicon glyphicon-chevron-right" ></span>
	</button>

	<!-- ����״̬���� -->
	<div id="hidden_list" class="box-vertical">
			<div style="left:8px; top: 10px; margin-left: 8px; margin-top: 10px;">
				<span class="glyphicon glyphicon-align-justify " aria-hidden="true"></span>		
			</div>
			<div>
				<p class="fontC" style="margin-left: 8px;margin-top:10px;font-size: 12px;">�� �� �� Ʒ �� ��</p>
			</div>
	</div>

	<!-- ��ʾ״̬���� -->	
	<div id="shown_list" style="display:none;">
		<div class="box-horizontal">
			<p class="fontC" align="center" style="margin-top:10px;font-weight :bold;"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>  �ҵĲ�Ʒ�б�</p>
		</div>
		<div id="product_list_group" class="list-group"  style="width:230px;height:100%; overflow-y:auto;left:0px;top:90px;position:absolute;z-index:250;">
				<a href="#" class="list-group-itemC fontC row" onclick="showInfo()">
		  			<img src="images/tv1.png" class="col-md-6">
		  			<div class="col-md-6">
					<h5 class="list-group-item-heading">ƽ�����</h5>
			    	<p class="list-group-item-textC" id="AT01L">AT01L</p>
			    	<p class="list-group-item-textC-sm small-font" align="center">�ѷ��� 01/ 01</p>
					</div>
		  		</a>
				
			
				<a href="#" class="list-group-itemC fontC row">
		  			<img src="images/pc1.png" class="col-md-6">
		  			<div class="col-md-6">
						<h5 class="list-group-item-heading">�ʼǱ�</h5>
				    	<p class="list-group-item-textC">AP-01T</p>
				    	<p class="list-group-item-textC-sm small-font" align="center">�ѷ��� 01/ 01</p>
					</div>
		  		</a>

		  		<a href="#" class="list-group-itemC fontC row">
		  			<img src="images/refrig_1.png" class="col-md-6">
		  			<div class="col-md-6">
						<h5 class="list-group-item-heading">�����ű���</h5>
				    	<p class="list-group-item-textC">AT-01L</p>
				    	<p class="list-group-item-textC-sm small-font" align="center">�ѷ��� 00/ 01</p>
					</div>
		  		</a>
		</div>
	</div>




<div id="tb_detailInfo" class="panel panel-detailinfo fontC" style="width:500px;top:20%;left: 20%; position:absolute; z-index:200;display:none;">
  <!-- Default panel contents -->
  <div class="panel-heading">
  	��Ʒ����
  	<button type="button" class="close" onclick="dismiss()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </div>
  <div class="panel-body row">
	  <div class="col-md-8">
	  	<h2 align="center">ƽ�����</h2>
	    <p align="center">AT-01L</p>
	  </div>
	  <div class="col-md-4">
	  	<button type="button" class="btn btn-lg disabled" style="margin-top:15px;right:100px;">�鿴ʵʱ״̬</button>
	  </div>
  </div>
  <!-- Table -->
  <table class="table">
    <tr>    	<td >��Ʒ����</td>    	<td>ƽ�����</td>    	<td>��    ��</td>    	<td>AT-01L</td>    </tr>
    <tr>    	<td>��    ��</td>    	<td>Һ������</td>    	<td>��    ɫ</td>    	<td>��    ɫ</td>    </tr>
    <tr>    	<td>�ֱ���</td>    	<td>3840��2160</td>    	<td>��Ļ�ߴ�</td>    	<td>55Ӣ��</td>    </tr>
    <tr>    	<td>��Ļ����</td>    	<td>16:9</td>    	<td>��Դ��ѹ</td>    	<td>220V</td>    </tr>
    <tr>    	<td>����</td>    	<td>196W</td>    	<td>����ʱ��</td>    	<td>2015.8</td>    </tr>
  </table>
</div>


		<!-- �û���Ϣ����ģ�� -->
	<div class="modal fade fontC" id="userSettingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-headerB">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">�˻�����</h4>
	      </div>
	      <div class="modal-body">

	      	<div>
	      		<p style="color:#B22222;">
	      			*������Ҫ��д������Ϣ�������޸ĵ���Ŀ�ɲ��
	      		</p>
	      	</div>

			<div class="container-fluid">
			        <div class="row">
			            <div class="col-md-10 col-md-offset-1">
			                <form id="signupForm" method="post" class="form-horizontal" action="target.php">
			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">�����ֻ���</label>

			                        <div class="col-md-8">
			                            <input type="text" id="phone_num" class="form-control input-lg fontC" name="phone_num" value="����д�ֻ���" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '����д�ֻ���';}">
			                        </div>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">��֤��</label>
			                        <div class="col-md-4">
			                            <input type="text" class="form-control input-lg fontC" name="verify_code" value="��֤��" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '��֤��';}"/>
			                        </div>
			                        <input type="button" id="btn_SendVC" class="btn btn-primary btn-lg col-md-3 fontC" value="��ȡ��֤��"/>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">��������</label>
			                        <div class="col-md-8">
			                            <input type="password" class="form-control input-lg fontC" name="new_password" value="����д������" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '����д������';}"/>
			                            <span class="help-block fontC">���������������롣</span>
			                        </div>
			                    </div>

			                    <div class="form-group">
			                        <label class="col-md-3 control-label fontC">ȷ������</label>
			                        <div class="col-md-8">
			                            <input type="password" class="form-control input-lg fontC" name="confirm_password" value="��ȷ������" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '��ȷ������';}"/>
			                            <span class="help-block fontC">���ٴ��������������롣</span>
			                        </div>
			                    </div>
			                </form>
			            </div>
			        </div>
			 </div>
	      </div>
	      <div class="modal-footer">
	     	<button type="button" class="btn btn-primary">�����޸�</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">ȡ��</button>
	       </div>
	    </div>
	  </div>
	</div>
	<!-- ��Ʒ�б�-��״̬-����
	<div id="shown_list" class="side-list-my" ��>
		<div class="box-horizontal">
			<p class="fontC" align="center" style="margin-top:10px;">�ҵĲ�Ʒ�б�</p>
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