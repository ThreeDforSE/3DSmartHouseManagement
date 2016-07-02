<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>
<head>
	<title>登录-ApNut智能家居管理系统 v1.0</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript" src="js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type='text/javascript' src="js/bootstrap-slider.min.js"></script>

		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
	<link rel="stylesheet" type="text/css" href="css/default.css">
    <link href="css/bootstrap-slider.min.css" rel="stylesheet">
		<script type="application/x-javascript"> 
		addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 
		</script>
</head>

<body>
<div class="panel panel-detailinfo fontC" style="width:270px;">
  <div class="panel-body row">
  <div  id="tvd" class="col-md-8">
  	<h2 align="center" id="tv">平板电视   </h2>
  	<!--<button type="button" class="btn" onclick="editName()"><span class="glyphicon glyphicon-pencil" aria-hidden="true" style="font-size:15px;"></span></button>-->
    <p align="center">AT-01L</p>
  </div>
  <!-- <div class="col-md-4">
  	<span class="glyphicon glyphicon-heart" aria-hidden="true" style="font-size:35px;color:#e52e3b;margin-top:20px;"></span> 
  </div>-->
    

   </div>
   <%
	int n=10;
	request.setAttribute("n",n);
	%>	
  <!-- Table -->
  <table class="table">
    <tr>      <td>产品型号${n}</td>     <td>AT-01L</td>    </tr>
    <tr>      <td>机体温度</td>     <td>74℃ 高温</td>    </tr>
    <tr>      <td>音量调节</td>     <td id="adjust_num">      <input id="ex2" data-slider-id='ex1Slider' type="range" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="14" style="width:120px;" />     
    								</td>    </tr>
    <tr>      <td>当前状态</td>     <td >开启</td>    </tr>
  </table>
<div><a href="#" align="center" onclick="set_onoff()")><span id="switch" class="glyphicon glyphicon-off"  aria-hidden="true" style="font-size:50px; color:#c66269;margin-top:20px;margin-left: 100px;  text-shadow: 0 0 5px #d98188; "></span> </a></div>
</div>

<script type="text/javascript">
var switchstate=0;
	function set_onoff(){
		if(switchstate==0){
			document.getElementById("switch").style.color="#35ce3a";
		    document.getElementById("switch").style.textshadow="#0 0 5px ##c66269";
		    switchstate=1;
		}else{
			document.getElementById("switch").style.color="#c66269";
		    document.getElementById("switch").style.textshadow="#0 0 5px #d98188";
		    switchstate=0;
		}
	}

    $(document).ready(function() {
	    	$('#ex2').slider({
	          	formatter: function(value) {
	            	return '当前: ' + value;
	          	}
	        });

    	});

  //  function init
   //  var flag=0;
   //  function editName(){
   //  	var oldDiv=document.getElementById("tvd");	
   //  	if(flag==0){
   //  		var newName=document.createElement("input");    		
   //  		oldDiv.removeChild(document.getElementById("tv"));
	  //   	newName.setAttribute("type","text");
	  //   	newName.setAttribute("id","newtv");
			// oldDiv.appendChild(newName);
			// flag=1;
   //  	}else{
   //  		var newName=document.createElement("h2");
   //  		// var oldDiv=document.getElementById("newtv");
   //  		oldDiv.removeChild(document.getElementById("newtv"));
	  //   	newName.setAttribute("align","center");
	  //   	newName.setAttribute("id","tv");
	  //   	newName.innerHTML="平板电视  <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\" style=\"font-size:15px;\"></span>";
			// oldDiv.appendChild(newName);
			// flag=1;
   //  	}    	
   //  }
</script>
</body>
</html>