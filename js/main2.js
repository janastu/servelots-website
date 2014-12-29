/*
 Simple Panaroma viewer uses orbit controls to rotate camera.
 */


(function (world) {
    "use strict";
	// variables
	var sceneNo, defaultData, effectController, trans_obj,
        camPos  = [
            new THREE.Vector3(0, 146.304, 0)
           
        ],
        panoOffset = [
            new THREE.Vector3(-Math.PI, 0, 0)
	    
        ],
        
    
		gui = new dat.GUI();
	
	
	//world.scene = {};
	
	
	// list of panoramas available in the world
	
	world.skyboxs = [
		'servelots2'
	];
	
	function bind(scope, func) {
        return function bound() {
            func.apply(scope, arguments);
        };
    }
    var test = 1;
    //console.log(test);
	
	
	function setupGUI() {
		effectController = {
			//scene Controls
			sceneNum: 0
		};
		
		//var h1;
		//h1 = gui.addFolder("Scene Controls");
		//h1.add(effectController, "sceneNum", {1: 0, 2: 1, 3:2, 4:3, 5:4, 6:5, 7:6}).name("Scene");
		//gui.remember(effectController);
		gui.close();
		dat.GUI.toggleHide();
	}
	
	setupGUI();
	/*
	 * init the scene, setup the camera, draw 3D objects and start the game loop
	 */
	world.init = function () {
		// default pano is the first one
		sceneNo = 0;
				
		//Camera Properties Initialization
		var fov = 55, aspect_ratio = window.innerWidth / window.innerHeight,
			near = 0.1, far = 50000;
		this.cam = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
		this.cam.lookAt(-30,0,30);
		
		
		// Renderer Initialization
		if (Detector.webgl) {
            this.renderer = new THREE.WebGLRenderer({antialias: false});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }


        this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('container').appendChild(this.renderer.domElement);
		//this.renderer.shadowMapEnabled = true;
		
		
		// Camera Controls initialization
		this.controls = new THREE.OrbitControls(this.cam, this.renderer.domElement);
		this.controls.noPan = false;
		this.controls.noZoom = true;
		this.controls.autoRotate = true;
		this.controls.autoRotateSpeed = 0.1;
		this.controls.staticMoving = true;
		this.controls.addEventListener('change', bind(this, this.render));
		this.controls.dynamicDampingFactor = 0.3;
	
		// Transformation Controls initialization
		
		
		this.fillScene();
		
	};

	world.fillScene = function () {
			
			//this.scene=null;
			
	    this.scene = new THREE.Scene();
	    
		//this.renderer.clear();
    		this.renderer.clear( true);
		//this.renderer.autoClear();
		this.currentSkybox = this.skyboxs[sceneNo];				
		this.makeSkyBox();
		this.makeText();
		this.makeLinkBackground();
		this.cam.position.set(camPos[sceneNo].x, camPos[sceneNo].y, camPos[sceneNo].z);
		this.cam.updateProjectionMatrix;
		this.scene.add(this.cam);
		this.controls.center.set(camPos[sceneNo].x - 0.1, camPos[sceneNo].y, camPos[sceneNo].z);			
		
		// attach event handlers
		 //Event handlers
	this.renderer.domElement.addEventListener('mouseover',
			bind(this, this.eventHandlers.onMouseOver), false);
		this.renderer.domElement.addEventListener('mousemove',
			bind(this, this.eventHandlers.onMouseMove), false);
		
		this.renderer.domElement.addEventListener('mousedown',
			bind(this, this.eventHandlers.onClick), false);
		window.addEventListener('keydown',
			bind(this, this.eventHandlers.onKeydown), false);
		window.addEventListener('resize',
			bind(this, this.eventHandlers.onWindowResize), false);
		this.renderer.domElement.addEventListener( 'mousewheel',
					bind(this, this.eventHandlers.onDocumentMouseWheel), false );
				this.renderer.domElement.addEventListener( 'DOMMouseScroll',
							bind(this, this.eventHandlers.onDocumentMouseWheel),false);
		
		
		
		
		//this.scene.add(this.helper);
				// action!
		this.animate.apply(this, arguments);
		
	};
	
	world.animate = function () {
	
          
        requestAnimationFrame(world.animate);
        world.controls.update();
	//world.update();
        world.render.apply(world, arguments);
    };

	world.render = function () {
		//this.helper.update();
		
		
		if (effectController.sceneNum !== sceneNo) {
			sceneNo = effectController.sceneNum;
			console.log(sceneNo);
			//this.scene=null;
			//this.scene.removeObject(panoMesh);
			this.fillScene();
		}
		this.renderer.render(this.scene, this.cam);
		
		
	};
	//var domEvents	= new THREEx.DomEvents(this.cam, this.renderer.domElement)
	

	
	world.makeText = function () {
	var theText = "CLIENTS";

				var hash = document.location.hash.substr( 1 );

			if ( hash.length !== 0 ) {

					theText = hash;

				}

				var text3d = new THREE.TextGeometry( theText, {

					size: 6,
					height: 3,
					curveSegments: 2,
					font: "helvetiker"

				});

				text3d.computeBoundingBox();
				var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

				var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 , side:THREE.DoubleSide} );
				this.text = new THREE.Mesh( text3d, textMaterial );
				this.text.name = 'clients';
				
				    
				    //this.text.addEventListener('click', function(event){console.log(test); });
				    //domEvents.addEventListener(this.text, 'click', function(event){console.log('you clicked on mesh', this.text)}, false)

				this.text.position.x = 0;
				this.text.position.y = 130;
				this.text.position.z = 70;

				this.text.rotation.x = 0.1;
				this.text.rotation.y = 3;
				//this.text.rotation.z = 1;
				this.group = new THREE.Object3D();
				this.group.add( this.text );
				this.group.name ='clients2';

				this.scene.add( this.group );
	};
	
		
	world.makeLinkBackground = function () {
	
	var planeMaterial = new THREE.ShaderMaterial({
            
			transparent: true
        });
		
        this.cube = new THREE.Mesh(
	    
            //new THREE.BoxGeometry(30,30,30), new THREE.MeshBasicMaterial({color:0xffffff, side:THREE.DoubleSide}));
	    new THREE.BoxGeometry(30,30,30), planeMaterial);
        this.cube.name = "table1";
        this.cube.rotation.set(0,0,0);
        this.cube.position.set(-12, 130, 70);
        this.cube.receiveShadow = true
        this.scene.add(this.cube);
	this.cube.name = 'clientslink';
	};
	

var panoMesh, panoMeshMat, panoMeshGeo, cubeTex;
	/* Functions to draw different kinds of objects/system in the scene */
	world.makeSkyBox = function () {
		var wireframe = 0,

          url = [ 'panoramas/' + this.currentSkybox + '/posx.jpg',
					'panoramas/'+ this.currentSkybox + '/negx.jpg',
					'panoramas/' + this.currentSkybox + '/posy.jpg',
					'panoramas/' + this.currentSkybox + '/negy.jpg',
					'panoramas/' + this.currentSkybox + '/posz.jpg',
					'panoramas/' + this.currentSkybox + '/negz.jpg'],
            //textureCube = THREE.ImageUtils.loadTextureCube(url),
            //material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube }),

            panoMeshGeo = new THREE.BoxGeometry(-5000, -5000, -5000),
            materialArray = [],
            panoMeshMat,
            i,
            cubeTex;
		for (i = 0; i < 6; i++) {
			cubeTex = THREE.ImageUtils.loadTexture(url[i]);
			//cubeTex.offset.x = -.5;
			//cubeTex.offset.y = -.5;
			materialArray.push(new THREE.MeshBasicMaterial({
				map: cubeTex,
				side: THREE.FrontSide
			}));
		}
		panoMeshMat = new THREE.MeshFaceMaterial(materialArray);
		var maxAnisotropy = this.renderer.getMaxAnisotropy();
		cubeTex.anisotropy = maxAnisotropy;

		
		//this.panoMesh = new THREE.Mesh( new THREE.BoxGeometry(50000, 50000, 50000, 1, 1, 1, null, true ), material);
		this.panoMesh = new THREE.Mesh(panoMeshGeo, panoMeshMat);
		this.panoMesh.name = 'cubemap';
		this.panoMesh.rotation.set(panoOffset[sceneNo].x, panoOffset[sceneNo].y, panoOffset[sceneNo].z);
		this.panoMesh.position.set(camPos[sceneNo].x, camPos[sceneNo].y, camPos[sceneNo].z);
		//this.panoMesh.name = 'Pano Cube';
        //this.panoMesh.scale.x = 1;
        this.scene.add(this.panoMesh);
	
	
				//this.scene.remove(this.panoMesh);
			//this.renderer.deallocateObject( panoMesh );
			//this.renderer.deallocateTexture( panoMeshMat );
			//this.renderer.deallocateTexture( cubeTex );
			//this.panoMesh.dispose();
			//this.panoMeshMat.dispose();
			//this.panoMeshGeo.dispose();

    };
   

	world.getCollisionRay = function (event) {
        var projector = new THREE.Projector(),
            mouseVector = new THREE.Vector3(),
            ray;
        mouseVector.x = ((event.clientX / window.innerWidth) * 2) - 1;
        mouseVector.y = -((event.clientY / window.innerHeight) * 2) + 1;
        ray = projector.pickingRay(mouseVector.clone(), this.cam);
        return ray;

	};



	// all event handlers of the 3D world
	world.eventHandlers = {
	     onDocumentMouseWheel: function (event) {
		
				// WebKit
console.log(this.cam.fov);
				if ( event.wheelDeltaY ) {

					this.cam.fov -= event.wheelDeltaY * 0.005;

				// Opera / Explorer 9

				} else if ( event.wheelDelta ) {

					this.cam.fov -= event.wheelDelta * 0.005;

				// Firefox

				} else if ( event.detail ) {

					this.cam.fov -= event.detail * 0.05;

				}
				

				this.cam.updateProjectionMatrix();

			},
        
		onWindowResize: function (event) {
			this.aspect_ratio = window.innerWidth / window.innerHeight;
			this.cam.aspect = this.aspect_ratio;
			this.cam.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);

			//this.controls.handleResize();
			this.render();
		},
		
		onClick: function (event) {
		//console.log('this.sphere', this.sphere);
		//console.log(test);
			var ray = this.getCollisionRay(event),
                intersected,
                i,
                j,
                info;
			if (ray.intersectObjects(this.scene.children).length > 0) {
                intersected = ray.intersectObjects(this.scene.children);
				//console.log(intersected);
				for (i = 0; i < intersected.length; i++) {
					//console.log(intersected[i]);
                 
			
                        if (intersected[i].object.name === 'clientslink') {
			    //intersected[ i ].object.material.color.setHex( Math.random() * 0xffffff );
			 //intersected[ i ].object.material.map = THREE.ImageUtils.loadTexture( url2 );
			 //intersected[ i ].object.material.needsUpdate = true;
			 console.log(test);
			//this.makeText.text.scale.x=2;
			//document.getElementById("nextID").href = "www.google.com"; // you probably don't need this if you will anyway navigate away from the page.
							 window.open('clients.html', '_self');
			 
                    			} 
						}}},
		onMouseMove: function (event) {
		//console.log('this.sphere', this.sphere);
			var ray = this.getCollisionRay(event),
                intersected,
                i,
                j,
                info;
			if (ray.intersectObjects(this.scene.children).length > 0) {
                intersected = ray.intersectObjects(this.scene.children);
				//console.log(intersected);
				for (i = 0; i < intersected.length; i++) {
			
			
                        if (intersected[i].object.name ==='clientslink') { //console.log(test);
			text.scale.x =15;
			
			} }}},
			
			onMouseOver: function(event) {
			    var ray = this.getCollisionRay(event),
                intersected,
                i,
                j,
                info;
			if (ray.intersectObjects(this.scene.children).length > 0) {
                intersected = ray.intersectObjects(this.scene.children);
				//console.log(intersected);
				for (i = 0; i < intersected.length; i++) {
			
			
                        if (intersected[i].object.name ==='clientslink') { console.log(test);
			text.scale.x =15;
			
			} }}}
		    
	};
	
	
				


})(world);
