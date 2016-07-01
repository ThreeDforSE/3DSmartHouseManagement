	//编辑模式开启/关闭
	var flagEdit=0;
	var flagMode=0;

	function editMode(){
		var aEdit=document.getElementById('edit');
		var editSave=document.getElementById('editSave');
		var editCancel=document.getElementById('editCancel');
		var title=document.getElementById('modeTitle');
		if (flagEdit==0) {
			editSave.style.display="inline";
			editCancel.style.display="inline";
			// alert(title);
			title.innerHTML="编辑模式";
			flagEdit=1;
		}
		else{
			editSave.style.display="none";
			editCancel.style.display="none";
			title.innerHTML="浏览模式";
			flagEdit=0;
		}
	}

	//视图平面模式
	function planeMode(){
		var mode3D=document.getElementById('mode3D');
		var modePlane=document.getElementById('modePlane');
		if (true) {
			mode3D.setAttribute("class", "btnLine btn-grey col-md-6"); 
			modePlane.setAttribute("class", "btnLine btn-grey active col-md-6");
		}
	}

	//视图3D模式
	function threeMode(){
		var mode3D=document.getElementById('mode3D');
		var modePlane=document.getElementById('modePlane');
		if (true) {
			mode3D.setAttribute("class", "btnLine btn-grey col-md-6 active"); 
			modePlane.setAttribute("class", "btnLine btn-grey col-md-6");
		}
	}


	//显示侧边栏
	var flag=0;
		function showSideLsit() {
			var hl=document.getElementById('hidden_list');
			var sl=document.getElementById('shown_list');
			var sp=document.getElementById('sp_control');
			var btn=document.getElementById('btn_control');
			if(flag==0){
				hl.style.display="none";
				sl.style.display="inline";
				btn.style.left ="225px";
				sp.setAttribute("class","glyphicon glyphicon-chevron-left");
				flag=1;
			}else{
				hl.style.display="inline";
				sl.style.display="none";
				btn.style.left ="25px"; 
				sp.setAttribute("class","glyphicon glyphicon-chevron-right");				
				flag=0;
			}
		}


	//创建产品列表模块
	//url 按钮指向,id 模块名,img_src 图片地址,name 产品名,model 产品型号,state 产品状态（判断坐标是否有数据即可）
	function createProductDiv(url,id,img_src,name,model,state){
	 var oriDiv=document.getElementById("product_list_group");
	 var newA=document.createElement("a");
	 var newImg=document.createElement("img");
	 var newDiv=document.createElement("div");
	 var newH5=document.createElement("h5");
	 var newP1=document.createElement("p");
	 var newP2=document.createElement("p");
	 var newSpan=document.createElement("span");
	 //添加<a>
	 newA.setAttribute("href",url);
	 // newA.setAttribute("href","http://121.42.33.120");
	 newA.setAttribute("class","list-group-itemC fontC row");
	 newA.setAttribute("id",id);
	 // newA.setAttribute("id","refrig_1");
	 document.getElementById("product_list_group").appendChild(newA);
	 //添加<img>
	 newImg.setAttribute("class","col-md-6");
	 newImg.setAttribute("src","images/refrig_1.png");
	 newImg.setAttribute("src",img_src);
	 newA.appendChild(newImg);
	 //添加<div>
	 newDiv.setAttribute("class","col-md-6");
	 newA.appendChild(newDiv);
	 //添加产品名称<h5>
	 newH5.setAttribute("class","list-group-item-heading");
	 newH5.innerHTML=name;
	 // newH5.innerHTML="单开门冰箱1";
	 newDiv.appendChild(newH5);
	 //添加产品型号<p>
	 newP1.setAttribute("class","list-group-item-textC");
	 newP1.innerHTML=model;
	 // newP1.innerHTML="AT-01L";
	 newDiv.appendChild(newP1);
	 //添加产品状态<p>
	 newP2.setAttribute("class","list-group-item-textC-sm small-font");
	 newP2.setAttribute("align","center");
	 newP2.innerHTML="已放置 01/ 01";
	 newP2.innerHTML="已放置 "+state;
	 newDiv.appendChild(newP2);
	}
	//移除创建的div
	function removeDiv(father_ele_name,element_name){
	 document.getElementById(father_ele_name).removeChild(document.getElementById(element_name));
	}

	//关闭弹窗
	function dismiss(){
		document.getElementById("tb_detailInfo").style.display="none";
	}
	//打开弹窗
	function showInfo(name){
		document.getElementById("tb_detailInfo").style.display="inline";
	}

$(function () {
  $('[data-toggle="popover"]').popover()
})
