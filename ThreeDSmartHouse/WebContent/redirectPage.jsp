<%@ page language="java" contentType="text/html;charset=gb2312" pageEncoding ="gb2312"%>
<html>
 <head>
  	<title>正在跳转……</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrapValidator.css" rel="stylesheet" type='text/css'/>

		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript" src="js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrapValidator.js"></script>
 </head>
 <body style="position:relative">
 	<div align="center" style="width:70%;top:5%;left:15%;position:absolute;">
	 <div class="alert alert-success fontC" role="alert">
	 <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
  	 <span class="sr-only">Success:</span>
	  您已退出登录，3s后将会回到登录界面。<a href="login.jsp" class="alert-link">点击此处马上跳转……</a>
	</div>  
	</div>
   <%
     response.setHeader("Refresh","3;URL=login.jsp");   
    %>
 </body>
</html>