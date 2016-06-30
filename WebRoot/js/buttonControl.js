	var flagEdit=0;
	var flagMode=0;
//编辑模式开启/关闭
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
	function planeMode(){
		var mode3D=document.getElementById('mode3D');
		var modePlane=document.getElementById('modePlane');
		if (true) {
			mode3D.setAttribute("class", "btnLine btn-grey col-md-6"); 
			modePlane.setAttribute("class", "btnLine btn-grey active col-md-6");
		}
	}

	function threeMode(){
		var mode3D=document.getElementById('mode3D');
		var modePlane=document.getElementById('modePlane');
		if (true) {
			mode3D.setAttribute("class", "btnLine btn-grey col-md-6 active"); 
			modePlane.setAttribute("class", "btnLine btn-grey col-md-6");
		}
	}