    function init() {
       	var count=0;
        //var stats = initStats();
        var clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        // var renderer = new THREE.WebGLRenderer();

        // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        // renderer.setSize(window.innerWidth, window.innerHeight);

        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;

        var trackballControls = new THREE.TrackballControls(camera);

        trackballControls.rotateSpeed = 1.0;
        trackballControls.zoomSpeed = 1.0;
        trackballControls.panSpeed = 1.0;
//        trackballControls.noZoom=false;
//        trackballControls.noPan=false;
        trackballControls.staticMoving = true;
//        trackballControls.dynamicDampingFactor=0.3;


        var projector = new THREE.Projector();
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        // document.addEventListener('mousemove', onDocumentMouseMove, false);
        //document.addEventListener('mousover', onDocumentMouseOver, false);

        
        initPlane(scene);
        initGrid(scene);
        var cube = initCube(scene);
        var sphere = initSphere(scene); 
        var refrig = initRefrig(scene); 
        setCamera(camera,scene);

        // var cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
        // var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x77ff77});
        // var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        // cylinder.position.set(0, 0, 1);

        // scene.add(cylinder);

        // add subtle ambient lighting
        // var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        var ambientLight = new THREE.AmbientLight(0x383838);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60,30);
        spotLight.intensity = 1;
        scene.add(spotLight);

        // add the output of the renderer to the html element
        // document.getElementById("WebGL-output").appendChild(renderer.domElement);
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;
        var scalingStep = 0;

        // var loader = new THREE.OBJMTLLoader();
        // var load = function (object) {
        //     var scale = chroma.scale(['red', 'green', 'blue']);
        //     setRandomColors(object, scale);
        //     mesh = object;
        //     scene.add(mesh);
        // };

        // var controls = new function () {
        //     this.rotationSpeed = 0.02;
        //     this.bouncingSpeed = 0.03;
        //     this.scalingSpeed = 0.03;
        //     this.showRay = false;
        // };

        // var gui = new dat.GUI();
        // gui.add(controls, 'rotationSpeed', 0, 0.5);
        // gui.add(controls, 'bouncingSpeed', 0, 0.5);
        // gui.add(controls, 'scalingSpeed', 0, 0.5);
        // gui.add(controls, 'showRay').onChange(function (e) {
        //     if (tube) scene.remove(tube)
        // });

       
        render();

        function render() {
            var delta = clock.getDelta();

            // if (mesh) {
            //     //   mesh.rotation.y+=0.006;
            // }


            trackballControls.update(delta);
            //webGLRenderer.clear();
            // render using requestAnimationFrame
        //    stats.update();
            // rotate the cube around its axes
            // cube.rotation.x += controls.rotationSpeed;
            // cube.rotation.y += controls.rotationSpeed;
            // cube.rotation.z += controls.rotationSpeed;

            // // bounce the sphere up and down
            // step += controls.bouncingSpeed;
            // sphere.position.x = 20 + ( 10 * (Math.cos(step)));
            // sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

            // // scale the cylinder

            // scalingStep += controls.scalingSpeed;
            // var scaleX = Math.abs(Math.sin(scalingStep / 4));
            // var scaleY = Math.abs(Math.cos(scalingStep / 5));
            // var scaleZ = Math.abs(Math.sin(scalingStep / 7));
            // cylinder.scale.set(scaleX, scaleY, scaleZ);

            // render using requestAnimationFrame
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
            // var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

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

        function onDocumentMouseOver(event) {
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects([sphere, cube, refrig]);
            // var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

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

			function forTest(){
            		alert('弹窗测试');
    			}
        // function onDocumentMouseMove(event) {
        //     if (controls.showRay) {
        //         //用户点击位置向量
        //         var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        //         vector = vector.unproject(camera); //将点击位置转换成场景坐标

        //         //从点击位置发射一束光线
        //         var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        //         //判断指定对象有没有被这束光线击中
        //         var intersects = raycaster.intersectObjects([sphere, cube, refrig]);
        //         // var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

        //         if (intersects.length > 0) {
        //             var points = [];
        //             points.push(new THREE.Vector3(-30, 39.8, 30));
        //             points.push(intersects[0].point);

        //             var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.9});
        //             var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 0.001);

        //             if (tube) scene.remove(tube);

        //             if (controls.showRay) {
        //                 tube = new THREE.Mesh(tubeGeometry, mat);
        //                 scene.add(tube);
        //             }
        //         }
        //     }
        // }

   
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
    window.onload = init;