    var scene = new THREE.Scene();
	function init() {
		if(!(localStorage.getItem('scene'))){
		        var json = (localStorage.getItem('scene'));
		        console.log(json);
		        var sceneLoader = new THREE.SceneLoader();
		        sceneLoader.parse(JSON.parse(json), function (e) {
		            scene = e.scene;
		        }, '.');
		}
		else
		{
	       	var count=0;
	        var clock = new THREE.Clock();
	
	        // 创建场景
	        var scene = new THREE.Scene();
	
	        // 创建摄像机
	        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	
	        var webGLRenderer = new THREE.WebGLRenderer();
	        webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
	        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	        webGLRenderer.shadowMapEnabled = true;
	
	        //将摄像机与轨迹球绑定
	        var trackballControls = new THREE.TrackballControls(camera);
	
	        trackballControls.rotateSpeed = 1.0;
	        trackballControls.zoomSpeed = 1.0;
	        trackballControls.panSpeed = 1.0;
	        trackballControls.staticMoving = true;
	
	        var projector = new THREE.Projector();
	        document.getElementById("WebGL-output").addEventListener('mousedown', onDocumentMouseDown, false);//鼠标点击事件
	        
	        initPlane(scene);
	        initGrid(scene); //坐标网格
	        initWall_back(scene);
	        initWall_left(scene);
	        var tvtable = initTable(scene);
	        var refrige = initRefrige(scene); 
	        var tv = initTv(scene);
	        createPlant(scene,0,2,-60); //电视左
	        createPlant(scene,40,2,-60);//电视右
	        initChair(scene); 
	        setCamera(camera,scene);
	        initAmbientLight(scene);
	
	        //方向光
	        var pointColor = "#fbf1de";
	        var directionalLight = new THREE.DirectionalLight(pointColor);
	        directionalLight.position.set(-40, 60, -10);
	        directionalLight.castShadow = true;
	        directionalLight.shadowCameraNear = 2;
	        directionalLight.shadowCameraFar = 200;
	        directionalLight.shadowCameraLeft = -50;
	        directionalLight.shadowCameraRight = 50;
	        directionalLight.shadowCameraTop = 50;
	        directionalLight.shadowCameraBottom = -50;
	        directionalLight.distance = 0;
	        directionalLight.intensity = 0.5;
	        directionalLight.shadowMapHeight = 1024;
	        directionalLight.shadowMapWidth = 1024;
	        scene.add(directionalLight);
	
	        // 点光源
	        // var spotLight = new THREE.SpotLight(0xffffff);
	        // spotLight.position.set(-40, 60,30);
	        // spotLight.intensity = 1;
	        // scene.add(spotLight);
	        
	        var exporter = new THREE.SceneExporter();
	        var sceneJson = JSON.stringify(exporter.parse(scene));
	        localStorage.setItem('scene', sceneJson);
	        console.log(sceneJson);
	
	        // 输出到页面
	        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);   
	//        var gui = addControls(refrige,tv);
	        var controls = new function () {
	            this.refrigePosX = refrige.position.x;
	            this.refrigePosZ = refrige.position.z;
	
	            this.tvPosX = tv.position.x;
	            this.tvPosZ = tv.position.z;
	        };
	        var gui = new dat.GUI();
	        var guiRefrige = gui.addFolder("冰箱");
	        guiRefrige.add(controls, "refrigePosX", -50, 50).onChange(function () {
	            refrige.position.set(controls.refrigePosX, refrige.position.y, controls.refrigePosZ)
	        });
	        guiRefrige.add(controls, "refrigePosZ", -65, 65).onChange(function () {
	            tvrefrige.position.set(controls.refrigePosX, refrige.position.y, controls.refrigePosZ)
	        });
	
	        var guiTV = gui.addFolder("电视");
	        guiTV.add(controls, "tvPosX", -50, 50).onChange(function () {
	            tv.position.set(controls.tvPosX, tv.position.y, controls.tvPosZ)
	        });
	        guiTV.add(controls, "tvPosZ", -65, 65).onChange(function () {
	            tv.position.set(controls.tvPosX, tv.position.y, controls.tvPosZ)
	        });
	        
	        render();
	
	        function render() {
	            var delta = clock.getDelta();
	            trackballControls.update(delta);
	            webGLRenderer.render(scene, camera);
	            requestAnimationFrame(render);
	        }
	        
	        function onDocumentMouseDown(event) {  //鼠标按下事件方法
	            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
	            vector = vector.unproject(camera);
	
	            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	            var intersects = raycaster.intersectObjects([refrige]);
	            if (intersects.length > 0) {
	                if(count==0){
	                    console.log(intersects[0]);
	                intersects[0].object.material.transparent = true;
	                intersects[0].object.material.opacity = 0.5;
	                forTest2();
	                count=1;
	                }
	                else{
	                    console.log(intersects[0]);
	                intersects[0].object.material.transparent = false;
	                intersects[0].object.material.opacity = 1;
	                count=0;
	                }                
	            }
	        }
		} 
}
  
     function initGrid(scene){
    	 //网格线
        var helper = new THREE.GridHelper( 1000, 50 );
        helper.setColors( 0x0000ff, 0x808080 );
        scene.add(helper);
    }

    function initPlane(scene){
        // 地板
        var floorTex = THREE.ImageUtils.loadTexture("images/wallpaper.jpg");
        var plane = new THREE.Mesh(new THREE.BoxGeometry(100, 130, 1, 1), new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: floorTex
        }));
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
        return plane;
    }

     function initWall_back(scene){
        var inner_texture=  THREE.ImageUtils.loadTexture("images/paper.jpg");
        var back_texture = THREE.ImageUtils.loadTexture("images/brick-wall.jpg");
        var plane =createMesh(new THREE.BoxGeometry(3, 20, 130));
        var cube = createMesh(new THREE.BoxGeometry(3, 12, 25));
        var wnd=new THREE.Mesh(new THREE.BoxGeometry(1,12,25),new THREE.MeshBasicMaterial({color: 0xCAE1FF,transparent:true,opacity:0.4}));
        wnd.position.set(64,12.5,0);
        plane.position.set(65, 10, 0);        
        cube.position.set(65, 12.5, 0);
        scene.add(wnd);
        scene.add(plane);  
        scene.add(cube);
        
        var cubeBSP = new ThreeBSP(cube);
        var wallVSP = new ThreeBSP(plane);
        var result;
        var result = wallVSP.subtract(cubeBSP);
        var wall_back = result.toMesh();
        wall_back.geometry.computeFaceNormals();
        wall_back.geometry.computeVertexNormals();
        wall_back.material = new THREE.MeshBasicMaterial({color: 0x8B795E});
        scene.add(wall_back);
        
        scene.remove(cube);
        scene.remove(plane);
    }
     
     function initWall_left(scene){
         var inner_texture=  THREE.ImageUtils.loadTexture("images/paper.jpg");
         var back_texture = THREE.ImageUtils.loadTexture("images/brick-wall.jpg");

         var plane =createMesh(new THREE.BoxGeometry(100, 20, 3, 20));
         // 侧  高  前
         plane.position.x = 15;  //前后
         plane.position.y =10;  //上下
         plane.position.z = -65;  //左右
         scene.add(plane);        

          function createMesh(geom) {
             var materialArray = [];
             //后 前 上 下 右 左
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//紫 后
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e})); //前
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//黄 上
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//绿 底
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e,map: inner_texture}));//红 右             
             materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e,map:back_texture}));//天蓝 左
             var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
             // create a multimaterial
             var mesh = new THREE.Mesh(geom, faceMaterial);
             return mesh;
         }
     }

    function initTable(scene){
    	//电视柜  宽 高 前
    	var texture=  THREE.ImageUtils.loadTexture("images/cupboard.jpg");;
        var cube;

        cube = createMesh(new THREE.BoxGeometry(30, 8, 2));
        cube.position.x = 20;  //前后
        cube.position.y =4;  //上下
        cube.position.z = -62;  //左右
        scene.add(cube);

         function createMesh(geom) {
            var materialArray = [];
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95}));//紫 后
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95})); //前            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95}));//黄 上
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95}));//绿 底
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95,map: texture}));//红 右            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0xbdad95}));//天蓝 左
            var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
            // create a multimaterial
            var mesh = new THREE.Mesh(geom, faceMaterial);
            return mesh;
        }
        return cube;
    }
    
    function initTv(scene){
        // 电视    	
    	var texture=  THREE.ImageUtils.loadTexture("images/tvPlane.jpg");;
        var cube;

        cube = createMesh(new THREE.BoxGeometry(20, 12, 0.5));
        cube.position.x = 20;  //前后
        cube.position.y =14;  //上下
        cube.position.z = -63;  //左右
        scene.add(cube);

         function createMesh(geom) {
            var materialArray = [];
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x000}));//紫 后
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x000})); //前            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x000}));//黄 上
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x000}));//绿 底
            materialArray.push(new THREE.MeshBasicMaterial({map: texture}));//红 右            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x000}));//天蓝 左
            var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
            // create a multimaterial
            var mesh = new THREE.Mesh(geom, faceMaterial);
            return mesh;
        }
        return cube;
    }

    function initRefrige(scene){
        var texture=  THREE.ImageUtils.loadTexture("images/refrigerator.jpg");
        var cube;
        cube = createMesh(new THREE.BoxGeometry(6, 20, 9));
        cube.position.x = 60;  //前后
        cube.position.y =10;  //上下
        cube.position.z = 60;  //左右
        scene.add(cube);
         function createMesh(geom) {
            var materialArray = [];
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//紫 后
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e,map: texture})); //前            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//黄 上
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//绿 底
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//红 右            
            materialArray.push(new THREE.MeshBasicMaterial({color: 0x716a5e}));//天蓝 左
            var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
            var mesh = new THREE.Mesh(geom, faceMaterial);
            return mesh;
        }
        return cube;
    }
    
    function createPlant(scene,x,y,z){
    	var texture=  THREE.ImageUtils.loadTexture("images/leaf.jpg");
    	//radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength
    	 var plantGeometry = new THREE.SphereGeometry(3, 6 ,4);
    	 var meshMaterial = new THREE.MeshPhongMaterial({
             map: texture
         });
    	 var sphere = new THREE.Mesh(plantGeometry, meshMaterial);
    	 sphere.position.set(x,y+3,z);

         scene.add(sphere);
//         new THREE.CylinderGeometry(radiusTop,radiusBottom, height,radialSegments,heightSegments,openEnded)
         var cylinder = createMesh(new THREE.CylinderGeometry(2,1,3,20,8,true));
         cylinder.position.set(x,y,z);
         scene.add(cylinder);
         
         function createMesh(geom) {
             var outterMaterial = new THREE.MeshBasicMaterial({color: 0x2e0f06});
             outterMaterial.side = THREE.FrontSide;
             var innerMaterial = new THREE.MeshBasicMaterial({color: 0x2e0d03});
             outterMaterial.side = THREE.BackSide;
             var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [innerMaterial, outterMaterial]);
             return mesh;
         }
    } 

    function setCamera(camera,scene){
        camera.position.x = -50;
        camera.position.y = 30;
        camera.position.z = 40;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    
    function initChair(scene){
    	var mesh;
        var loader = new THREE.JSONLoader();
        loader.load('misc_chair01.js', function (geometry, mat) {
            mesh = new THREE.Mesh(geometry, mat[0]);
            mesh.scale.x = 7;
            mesh.scale.y = 7;
            mesh.scale.z = 7;            
            mesh.position.x=40;
            mesh.position.y=0;
            mesh.position.z=20;
            scene.add(mesh);
        }, './images/');
    }

    function initAmbientLight(scene){
        var ambientLight = new THREE.AmbientLight(0x383838);
        scene.add(ambientLight);
        return ambientLight;
    }

    function forTest(){
        // <button type="button" class="btn btn-default" data-container="body" data-toggle="popover" 
        // data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        //   Popover on 右侧
        // </button>

        // <div align="center" style="margin-left:0px; width:100%;height:100%;left:0px;top:90px;position:absolute;z-index:150;">
        //     <iframe src="sidemodel.html" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
        // </div>
//        var odiv=document.getElementById("infoDiv");
//        if(odiv){
//            odiv.style.display="inline";
//
//        }else{
            var div=document.createElement("div");
        div.setAttribute("align","center");
        // div.style.width="100%";
         div.style.height="100%";
        div.style.left="75%";
        div.style.top="25%";
        div.style.position="absolute";
        div.style.zindex="200";
        div.setAttribute("id","infoDiv");
        document.body.appendChild(div);

        var iframe=document.createElement("iframe");
        iframe.setAttribute("src","dynamicState.jsp");
        iframe.style.width="100%";
        iframe.style.height="100%";
        iframe.style.frameborder="0";
        iframe.style.scrolling="no";
        div.appendChild(iframe);
//        }
    }
        
    function createMesh(geom) {
        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial({transparency: true, opacity: 0.5, wireframeLinewidth: 0.5});
        wireFrameMat.wireframe = true;
        var mesh = new THREE.Mesh(geom, wireFrameMat);
        return mesh;
    }

    function forTest2(){
        document.getElementById("infoDiv").style.display="inline";
    }
    function addControls(refrige,tv){
        var controls = new function () {
            this.refrigePosX = refrige.position.x;
            this.refrigePosZ = refrige.position.z;

            this.tvPosX = tv.position.x;
            this.tvPosZ = tv.position.z;
        };
        var gui = new dat.GUI();
        var guiRefrige = gui.addFolder("冰箱");
        guiRefrige.add(controls, "refrigePosX", -50, 50).onChange(function () {
            refrige.position.set(controls.refrigePosX, refrige.position.y, controls.refrigePosZ)
        });
        guiRefrige.add(controls, "refrigePosZ", -65, 65).onChange(function () {
            tvrefrige.position.set(controls.refrigePosX, refrige.position.y, controls.refrigePosZ)
        });

        var guiTV = gui.addFolder("电视");
        guiTV.add(controls, "tvPosX", -50, 50).onChange(function () {
            tv.position.set(controls.tvPosX, tv.position.y, controls.tvPosZ)
        });
        guiTV.add(controls, "tvPosZ", -65, 65).onChange(function () {
            tv.position.set(controls.tvPosX, tv.position.y, controls.tvPosZ)
        });
//        controls.domElement.style.position = 'absolute';
//        controls.domElement.style.zindex = '300';
//        controls.domElement.style.right = '20px';
//        controls.domElement.style.top = '60px';
        return gui;
    }
    
    
    function exportSecene(scene) {
        var exporter = new THREE.SceneExporter();
        var sceneJson = JSON.stringify(exporter.parse(scene));
        localStorage.setItem('scene', sceneJson);
        console.log(sceneJson);
    }

    function importScene(scene) {
        var json = (localStorage.getItem('scene'));
        var sceneLoader = new THREE.SceneLoader();

        sceneLoader.parse(JSON.parse(json), function (e) {
            scene = e.scene;
        }, '.');
    }
    
	function editMode(){
		var aEdit=document.getElementById('edit');
		var editSave=document.getElementById('editSave');
		var editCancel=document.getElementById('editCancel');
		var title=document.getElementById('modeTitle');
		if (title.innerHTML=="浏览模式") {
			editSave.style.display="inline";
			editCancel.style.display="inline";
			title.innerHTML="编辑模式";
//			exportSecene(scene);
			flagEdit=1;
		}
		else{
			editSave.style.display="none";
			editCancel.style.display="none";
			title.innerHTML="浏览模式";
			flagEdit=0;
		}
	}
    
    window.onload = init;