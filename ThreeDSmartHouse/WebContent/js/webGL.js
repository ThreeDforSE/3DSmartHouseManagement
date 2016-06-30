    function init() {
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
        document.addEventListener('mousedown', onDocumentMouseDown, false);

        
        initPlane(scene);
        initGrid(scene);
        var cube = initCube(scene);
        var sphere = initSphere(scene); 
        var refrig = initRefrig(scene); 
        setCamera(camera,scene);
        var ambientLight = initAmbientLight(scene);


        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60,30);
        spotLight.intensity = 1;
        scene.add(spotLight);

        // 输出到页面
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;
        var scalingStep = 0;
       
        render();

        function render() {
            var delta = clock.getDelta();
            trackballControls.update(delta);
            webGLRenderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        var projector = new THREE.Projector();
        var tube;

        function onDocumentMouseDown(event) {
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects([sphere, cube, refrig]);
            if (intersects.length > 0) {
            	if(count==0){
            		console.log(intersects[0]);
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.5;
                forTest();
                count=1;
            	}
          		else{
          			console.log(intersects[0]);
                intersects[0].object.material.transparent = false;
                intersects[0].object.material.opacity = 1;
                count=0;
                forTest2();
          		}
                
            }
        }

        function onDocumentMouseOver(event) {
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects([sphere, cube, refrig]);
            if (intersects.length > 0) {
                if(count==0){
                    console.log(intersects[0]);
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.5;
                forTest();
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
     function initGrid(scene){
        var helper = new THREE.GridHelper( 1000, 50 );
        helper.setColors( 0x0000ff, 0x808080 );
        scene.add( helper );
    }

    function initPlane(scene){
        // create the ground plane
        var floorTex = THREE.ImageUtils.loadTexture("images/floor-wood.jpg");
        var plane = new THREE.Mesh(new THREE.BoxGeometry(60, 60, 1, 1), new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: floorTex
        }));

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene
        scene.add(plane);
        return plane;
    }

    function initCube(scene){
        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


        // position the cube
        cube.position.x = -9;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);
        return cube;
    }

    function initRefrig(scene){
        // create a cube
        var surfaceTex = THREE.ImageUtils.loadTexture("images/floor-wood.jpg");
        var cubeGeometry = new THREE.BoxGeometry(4, 10, 4);
        var cubeMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: surfaceTex
        });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


        // position the cube
        cube.position.x = -1;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);
        return cube;
    }

    function initSphere(scene){
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 0;
        sphere.position.z = 2;
        // add the sphere to the scene
        scene.add(sphere);
        return sphere;
    }

    function setCamera(camera,scene){
        // position and point the camera to the center of the scene
        camera.position.x = -50;
        camera.position.y = 30;
        camera.position.z = 40;
        // camera.lookAt(scene.position);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
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
        var odiv=document.getElementById("infoDiv");
        if(odiv){
            odiv.style.display="inline";

        }else{
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
        iframe.setAttribute("src","test.html");
        iframe.style.width="100%";
        iframe.style.height="100%";
        iframe.style.frameborder="0";
        iframe.style.scrolling="no";
        div.appendChild(iframe);
        }
        

        // var btn=document.createElement("button");
        // btn.setAttribute("type","button");
        // btn.setAttribute("class","btn btn-default");
        // btn.setAttribute("data-container","body");
        // btn.setAttribute("data-toggle","popover");
        // btn.setAttribute("data-placement","right");
        // btn.setAttribute("data-content","for test");
        // btn.setAttribute("id","ex")
        // btn.innerHTML="test";
        // btn.style.position="absolute";
        // btn.style.zindex="200";
        // btn.style.top="90px";
        // btn.style.left="90px";
        // document.body.appendChild(btn);

    }

    function forTest2(){
        document.getElementById("infoDiv").style.display="none";
    }

    $('#ex').popover('show');

    window.onload = init;