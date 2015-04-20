
			//this version uses domx events and transform controls
			//contains physics
			//'use strict'
			Physijs.scripts.worker = 'js/physijs_worker.js';
			Physijs.scripts.ammo = 'ammo.js';
			
			
			var container, stats;

			var camera, scene, renderer;

			var cube, plane;
			var panoMesh, home;
			var controls;
			var controller1;
			var screen1, screen1Mat, annie;
			var trans_control, domEvents;
			var text, text2;
			var controller1annie1, controller1annie2;
			var loader2, loader3, servelotslogo4, servelotslogo5, servelotslogo_physics, logoMat;
			var tabletop1, tabletop2, occlusion_obj1, occlusion_obj2, occlusion_obj3, white_board;
			var character1, character2, character3, character4;
			var shape1, shape_geo1, shape_material, shape_mesh1;
			var shape2, shape_geo2, shape_mesh2;
			var shape3, shape_geo3, shape_mesh3;
			var shape4, shape_geo4, shape_mesh4;
			var shape5, shape_geo5, shape_mesh5;
			var keyboard = new THREEx.KeyboardState();
			var ground_material;
			
			


			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;

			var mouseX, mouseY, mouseZ = 0;
			var mouseXOnMouseDown, mouseYOnMouseDown, mouseZOnMouseDown = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			
				
			init();
			animate();
			controlenable = function(){
				console.log("control");
				controls.enabled = true;
				trans_control.enabled = false;
			}

			function init() {

				container = document.getElementById( 'render' );
				//document.body.appendChild( container );
				
				//var close = document.getElementById("button");
				//close.onclick = document.getElementById("text").innerHTML="dd";
				//document.getElementById("button").onclick = close();
				
			
				

				//var info = document.createElement( 'div' );
				//info.style.position = 'absolute';
				//info.style.top = '250px';
				//info.style.width = '70%';
				//info.style.textAlign = 'center';
				//info.id = 'info';
				//info.innerHTML = 'Drag to spin the cube';
				//info.innerHTML="Pantoto-lite, a Web 2.0 platform built with Python/Django which is an adaptation of Pantoto Communities software that was developed earlier over many years using Java and MySQL. The new architecture and design details are available on our WIKI page<br/><br/>Pantoto-lite is to be used as the primary software for various forms and workflow management needs in <br/>a) school information management systems, <br/>b) Surveys and document management for NGOs, and <br/>c) Research and Development work regardnig accessibility of rich Internet applications for print-impaired (people who can see and hear but not comfortable with reading and writing).<br/><br/>Technology, Participation and Communities - a social science study project involving two ICT project deployments, funded by SIRCA.Open Course ware on Principles of Programming - An initiative for effectively and accessibly teaching principles of programming in the Web 2.0 era using a participatory approach. Course material and curriculum with Javascript language that only needs conventional Web browsers for instruction and learning. ";
				//container.appendChild( info );
				
				
				
				
				
				
				
				
				//document.getElementById("button").style.left = ( ( 580 - 86 ) / 2 ) + 'px';
				//document.getElementById("button").style.top = ( ( 360 - 61 ) / 2 ) + 'px';
				//document.getElementById("button").style.visibility = 'hidden';
				
				
	

   


				camera = new THREE.PerspectiveCamera( 55, document.getElementById("render").offsetWidth / window.innerHeight, 0.01, 100000 );
				//camera.position.y = 1;
				camera.position.z = 1;
				//camera.rotation.z = 22;
				//camera.lookAt(510,10,10);
				//console.log(camera.position);

				//scene = new THREE.Scene();
				scene = new Physijs.Scene;
				scene.setGravity(new THREE.Vector3( 0, -10, 0 ));
				//scene.addEventListener(
				//	'update',
				//	function() {
				//scene.simulate( undefined, 7 );
				//physics_stats.update();
				//		}
				//	);

				
				


				
				
				// Plane

				var geometry = new THREE.PlaneGeometry( 200, 200 );
				geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

				var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

				plane = new THREE.Mesh( geometry, material );
				//scene.add( plane );

				renderer = new THREE.WebGLRenderer();
				
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( document.getElementById("render").offsetWidth,window.innerHeight );
				container.appendChild( renderer.domElement );
				
				
    	         
				
				
				//skybox
				var wireframe = 0,

			    url = [ 	'img/panorama/posx.jpg',
					'img/panorama/negx.jpg',
					'img/panorama/posy.jpg',
					'img/panorama/negy.jpg',
					'img/panorama/posz.jpg',
					'img/panorama/negz.jpg'],
			    
			    
            //textureCube = THREE.ImageUtils.loadTextureCube(url),
            //material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube }),

            panoMeshGeo = new THREE.BoxGeometry(-5000, -5000, -5000),
            materialArray = [], materialArray2 = [],
            panoMeshMat, panoMeshMat2,
            i, j,
            cubeTex, cubeTex2;
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
		panoMeshMat2 = new THREE.MeshFaceMaterial(materialArray2);
		//var maxAnisotropy = renderer.getMaxAnisotropy();
		//cubeTex.anisotropy = maxAnisotropy;

		
		//this.panoMesh = new THREE.Mesh( new THREE.BoxGeometry(50000, 50000, 50000, 1, 1, 1, null, true ), material);
		panoMesh = new THREE.Mesh(panoMeshGeo, panoMeshMat);
		panoMesh.name = 'cubemap';
		panoMesh.position.set(0,1,0);
		panoMesh.rotation.set(-Math.PI , 0, 0);
		//this.panoMesh.name = 'Pano Cube';
        //this.panoMesh.scale.x = 1;
		scene.add(panoMesh);
		
		//screen
		/*screen1Mat = new THREE.ImageUtils.loadTexture('img/static.gif');
		
		annie = new TextureAnimator( screen1Mat, 10, 1, 10, 75 ); // texture, #horiz, #vert, #total, duration.
		screen1 = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshBasicMaterial({map:screen1Mat, side:THREE.DoubleSide}));
		scene.add(screen1);
		screen1.position.set(-16.49,-42.75,79.28);
		screen1.rotation.set(-3.048,0.20,3.09);
		screen1.scale.set(1.35,1.17,1.43);
		
		
	
		
		//screencontrols
		controller1 = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('img/rightarrow.gif'), transparent:true}));
		
		scene.add(controller1);
		//controller1.position.set(-15,-52,80);
		//controller1.rotation.set(0,2.8,0);
		controller1.position.set(-18.24,-16.97,89.42);
		controller1.rotation.set(-3.06,-0.002,1.53);
		*/
		
		
		
		
		
		//load models
		var loadModels;
		var loader, modelMesh1, modelGeo1, modelMat1;
		var modelMesh2, modelMesh3, modelMesh4, modelMesh5;
		var modelMesh1Click, modelMesh2Click, modelMesh3Click, modelMesh3Click2;
		//logoMat = new THREE.MeshBasicMaterial({map:new THREE.ImageUtils.loadTexture('img/logo_texture.jpg')});
		//logoMat = new THREE.MeshNormalMaterial( {map:new THREE.ImageUtils.loadTexture('img/logo_texture.jpg')} );
		loader2 = new THREE.JSONLoader();
		loader2.load( "objects/servelotslogo4.js", function( geometry, material ) {
 //var model = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'texture.jpg' ) } ) );
		 var  logo_material = Physijs.createMaterial(
			new THREE.MeshBasicMaterial({  color:0x081657 }),
		    0.9, // high friction
			.1 // low restitution
		);
		servelotslogo_physics = new Physijs.CylinderMesh( geometry, logo_material, 1  );
		//servelotslogo_physics.position.set(-577.55,-103.06,-82.90);
		servelotslogo_physics.position.set(-182.258,-50.7813,-161.278);
		servelotslogo_physics.scale.set(3, 3, 3);
		servelotslogo_physics.rotation.set(1.6, 0, 0);
		//scene.add (servelotslogo_physics);
		
		
		servelotslogo4 = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color:0x081657} ) );
		scene.add (servelotslogo4);
		//servelotslogo4.position.set(-1445.55,-103.06,-82.90);
		//servelotslogo4.rotation.set(1.557,0.018,-1.461);
		servelotslogo4.scale.set(20,20,20);
		servelotslogo4.position.set(-403.40,30,-560.255);
		servelotslogo4.rotation.set(1.55,0,-0.18);
		
		domEvents.addEventListener(servelotslogo4, 'click', function(event){
				
				document.getElementById("1").click();
				
				}, false); 
				/*domEvents.addEventListener(servelotslogo4, 'click', function(event){
					controls.enabled = false;
				trans_control.attach(servelotslogo4);
				trans_control.enabled = true;
							console.log((servelotslogo4).position);
							console.log((servelotslogo4).rotation);
							console.log((servelotslogo4).scale);
					
				
		});*/
				
					
					
				
					
				}, false); 
		loader3 = new THREE.JSONLoader();
		loader3.load( "objects/servelotslogo5.js", function( geometry, material ) {

		
		
		
		servelotslogo5 = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color:0x657bc5} )  );
		scene.add (servelotslogo5);
		//servelotslogo5.position.set(-577.55,-103.06,-82.90);
		//servelotslogo5.rotation.set(1.557,0.018,-1.461);
		servelotslogo5.position.set(-403.40,30,-572.255);
		servelotslogo5.rotation.set(1.55,0,-0.18);
		servelotslogo5.scale.set(20,20,20);
		domEvents.addEventListener(servelotslogo5, 'click', function(event){
				
				document.getElementById("1").click();
				
				}, false); 
				domEvents.addEventListener(servelotslogo5, 'click', function(event){
					/*controls.enabled = false;
				trans_control.attach(servelotslogo5);
				trans_control.enabled = true;
							console.log((servelotslogo5).position);
							console.log((servelotslogo5).rotation);
							console.log((servelotslogo5).scale);*/
					if (servelotslogo4.position.z == -560.255) {
						//code
					
					new TWEEN.Tween( servelotslogo4.position ).to( {
						x: -403.40,
						y: 30,
						z: -260 }, 5131.4 )
				
					.easing( TWEEN.Easing.Linear.None).start(); 
					}
					else
					
					{ new TWEEN.Tween( servelotslogo4.position ).to( {
						x: -403.40,
						y: 30,
						z:-560.255 }, 5131.4 )
				
					.easing( TWEEN.Easing.Linear.None).start(); 
					
					}
				}, false);
		});
		
		
		
		
		
		
		loadModels = function () {
	   
		
		//modelMat1 = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'img/logo_texture.jpg' ) } );
		modelMat1 = new THREE.MeshBasicMaterial( { wireframe: true, color:0x00ff00 } );
		loader = new THREE.JSONLoader();
		loader.load( "objects/Untitled.js", function( geometry, material ) {
			modelMesh1 = new THREE.Mesh( geometry, modelMat1 );
			modelMesh2 = new THREE.Mesh( geometry, modelMat1 );
			modelMesh3 = new THREE.Mesh( geometry, modelMat1 );
			modelMesh4 = new THREE.Mesh( geometry, modelMat1 );
			modelMesh5 = new THREE.Mesh( geometry, modelMat1 );
			modelMesh1.position.set( -293.53, -148.94, -260.38 );
			modelMesh1.rotation.set(-0.353,0.816,0.455);
			//modelMesh1.scale.set(2,2,2);
			modelMesh2.position.set( 713.20, -449.23, 589.84 );
			modelMesh2.rotation.set(-2.723,-0.915,-2.778);
			modelMesh3.position.set( -66.893,-169.99,333.7171 );
			modelMesh3.rotation.set(-2.747,-0.538,-2.913);
			var sc = 140;
					modelMesh1.scale.set( sc, sc, sc );
					modelMesh2.scale.set( 286.29, 286.29, 286.29 );
					modelMesh3.scale.set( 161.377, 161.377, 161.377 );
					//modelMesh1.matrixAutoUpdate = false;
					modelMesh1.updateMatrix();
					//modelMesh2.matrixAutoUpdate = false;
					//modelMesh2.updateMatrix();
					
					scene.add(modelMesh1);
					scene.add(modelMesh2);
					scene.add(modelMesh3);
					
				domEvents.addEventListener(modelMesh1, 'mouseover', function(event){
				//modelMesh1.material.opacity=0.5;
				//console.log("s");
				modelMesh1.scale.set(240,240,240);
				}, false);
				
				domEvents.addEventListener(modelMesh1, 'mouseout', function(event){
				modelMesh1.material.opacity=1.2;
				modelMesh1.scale.set(140,140,140);
				}, false);
				
				
				domEvents.addEventListener(modelMesh1, 'click', function(event){
				//	controls.enabled = false;
				//trans_control.attach(modelMesh1);
				//trans_control.enabled = true;
				//			console.log((modelMesh1).position);
				//			console.log((modelMesh1).rotation);
				//			console.log((modelMesh1).scale);
				
					if (modelMesh1.position.x == -293.53) {
						//code
					
				modelMesh1Click = new TWEEN.Tween( modelMesh1.position ).to( {
						x: -144.43,
						y: -65.39,
						z: -144.22 }, 511.4 )
					.easing( TWEEN.Easing.Bounce.Out).start(); 
					
					}
					else
					modelMesh1Click = new TWEEN.Tween( modelMesh1.position ).to( {
						x:  -293.53,
						y: -148.94,
						z: -260.38 }, 511.4 )
					.easing( TWEEN.Easing.Bounce.Out).start(); 
				
				
				}, false);
				
				domEvents.addEventListener(modelMesh1, 'dblclick', function(event){
					
				}, false);
				
				domEvents.addEventListener(modelMesh2, 'click', function(event){
						//panoMesh.material = panoMeshMat2;
				//panoMesh.material.needsUpdate = true;
				modal3();
					
				}, false);
		
		
				domEvents.addEventListener(controller1, 'click', function(event){
				//	controls.enabled = false;
				//trans_control.attach(modelMesh3);
				//trans_control.enabled = true;
				//			console.log((modelMesh3).position);
				//			console.log((modelMesh3).rotation);
				//			console.log((modelMesh3).scale);
				
				modelMesh3Click = new TWEEN.Tween( modelMesh3.position ).to( {
						x: 85.074,
						y: -162.154,
						z: 193.727 }, 1211.4 )
					.easing( TWEEN.Easing.Elastic.Out).start(); 
					
					
				
				}, false);
				
				domEvents.addEventListener(modelMesh3, 'click', function(event){
				
				modelMesh3Click2 = new TWEEN.Tween( modelMesh3.position ).to( {
						x: -66.893,
						y: -169.99,
						z: 333.7171 }, 1211.4 )
					.easing( TWEEN.Easing.Elastic.Out).start(); 
					
					
				
				}, false);
				
				
				
				
				/*domEvents.addEventListener(modelMesh1, 'click', function(event){
					controls.enabled = false;
				trans_control.attach(modelMesh1);
				trans_control.enabled = true;
							console.log((modelMesh1).position);
							console.log((modelMesh1).rotation);
							console.log((modelMesh1).scale);
				},false);
				*/
				
			
			
			
			} );
		};
			
					
		//loadModels();
		
		
		
		
		//table tops and occlusion objects
		
		 ground_material = Physijs.createMaterial(
			//new THREE.MeshBasicMaterial({ wireframe:true, color:0x00ff00 }),
			new THREE.MeshBasicMaterial({ opacity:0.01, transparent: true }),
		    0.9, // high friction
			.1 // low restitution
		
		 );
		 
		  var  character_material = Physijs.createMaterial(
			new THREE.MeshBasicMaterial({ wireframe:true, color:0x00ff00 }),
		    0.9, // high friction
			.1 // low restitution
		);
		//tabletop1 = new THREE.Mesh(new THREE.BoxGeometry(200,10,200), new THREE.MeshBasicMaterial({wireframe:true, color:0x00ff00}));
		tabletop1 = new THREE.Mesh(new THREE.BoxGeometry(200,10,200), new THREE.MeshBasicMaterial({opacity:0, transparent:true}));
		tabletop1.position.set(349.821,-165.71,609.206);
		tabletop1.rotation.set(-0.093,0.049, 0.00);
		tabletop1.scale.set(2.741,-0.769,1.377);
		scene.add(tabletop1);
		
		tabletop2 = new Physijs.BoxMesh(new THREE.BoxGeometry(200,10,200), ground_material, 0);
		tabletop2.position.set(-142.258,-190.7813,-201.278);
		tabletop2.rotation.set(-0.110 ,0.060, 0.00);
		tabletop2.scale.set(2.741,-0.769,1.377);
		scene.add(tabletop2);
		
		
		occlusion_obj1 = new Physijs.BoxMesh(new THREE.BoxGeometry(30,35,34), ground_material, 0 );
		occlusion_obj1.position.set(-277,-180,-182);
		occlusion_obj1.rotation.set(-0.109,0.2025, 1.544);
		occlusion_obj1.scale.set(0.828,2.516,2.878);
		scene.add(occlusion_obj1);
		
		occlusion_obj2 = new Physijs.BoxMesh(new THREE.BoxGeometry(40,40,40), ground_material, 0);
		occlusion_obj2.position.set(9.79,-187,-290.36);
		occlusion_obj2.rotation.set(1.307,0.031, -0.2475);
		occlusion_obj2.scale.set(4.725,4.197,1.99);
		scene.add(occlusion_obj2);
		
		occlusion_obj3 = new Physijs.CylinderMesh(new THREE.CylinderGeometry(40,40,60), ground_material, 0);
		occlusion_obj3.position.set(-193.59,-179.466,-204.0);
		occlusion_obj3.rotation.set(1.3153,0.0300, -0.382);
		occlusion_obj3.scale.set(0.5332,1.7014,0.4136);
		scene.add(occlusion_obj3);
		
		var occlusion_obj4 = new THREE.Mesh(new THREE.BoxGeometry(20,20,20), new THREE.MeshBasicMaterial({wireframe:true, color:0x00ff00}));
		occlusion_obj4.position.set(26.919,-351.90,-500.71);
		occlusion_obj4.rotation.set(1.307,0.031, -0.2475);
		occlusion_obj4.scale.set(8.506,4.197,4.074);
		//scene.add(occlusion_obj4);
		
		var occlusion_obj5 = new THREE.Mesh(new THREE.BoxGeometry(40,40,40), new THREE.MeshBasicMaterial({wireframe:true, color:0x00ff00}));
		occlusion_obj5.position.set(26.919,-351.90,-500.71);
		occlusion_obj5.rotation.set(1.307,0.031, -0.2475);
		occlusion_obj5.scale.set(8.506,4.197,4.074);
		//scene.add(occlusion_obj2);
		
		//white_board = new THREE.Mesh(new THREE.BoxGeometry(200,10,200), new THREE.MeshBasicMaterial({wireframe:true, color:0x00ff00}));
		white_board = new THREE.Mesh(new THREE.BoxGeometry(200,10,200), new THREE.MeshBasicMaterial({transparent:true, opacity:0}));
		white_board.position.set(1105.218,32.914,6.512);
		white_board.rotation.set(1.515,0.0841, -1.7366);
		white_board.scale.set(2.310,1,1.7822);
		scene.add(white_board);
		
		
		character1 = new Physijs.BoxMesh(new THREE.BoxGeometry(20,10,20), character_material, 10);
		character1.position.set(-142.258,-100.7813,-201.278);
		character1.rotation.set(-0.110,0.060, 0.00);
		//character1.scale.set(2.741,-0.769,1.377);
		scene.add(character1);
		
		character2 = new Physijs.BoxMesh(new THREE.BoxGeometry(20,10,20), character_material, 1);
		character2.position.set(-142.258,200.7813,-201.278);
		character2.rotation.set(-0.110,0.060, 0.00);
		//character1.scale.set(2.741,-0.769,1.377);
		scene.add(character2);
		
		character3 = new Physijs.BoxMesh(new THREE.BoxGeometry(20,10,20), character_material, 1);
		character3.position.set(-142.258,260.7813,-201.278);
		character3.rotation.set(-0.110,0.060, 0.00);
		//character1.scale.set(2.741,-0.769,1.377);
		scene.add(character3);
		
		character4 = new Physijs.BoxMesh(new THREE.BoxGeometry(20,10,20), character_material, 1);
		character4.position.set(-142.258,40.7813,-201.278);
		character4.rotation.set(-0.110,0.060, 0.00);
		//character1.scale.set(2.741,-0.769,1.377);
		scene.add(character4);
		
		
		

		shape1 = THREE.FontUtils.generateShapes( "Pradyumna", {
		 font: "helvetiker",
		weight: "bold",
			size: 10
			} );
	shape_geo1 = new THREE.ShapeGeometry( shape1 );
	shape_material = new THREE.MeshBasicMaterial();
	shape_mesh1 = new THREE.Mesh( shape_geo1, shape_material );
	//scene.add(shape_mesh1);
	shape_mesh1.position.set(-277,-80,-182);
	
	
	
	shape2 = THREE.FontUtils.generateShapes( "c2", {
		 font: "helvetiker",
		weight: "bold",
			size: 10
			} );
	shape_geo2 = new THREE.ShapeGeometry( shape2 );
	shape_material = new THREE.MeshBasicMaterial();
	shape_mesh2 = new THREE.Mesh( shape_geo2, shape_material );
	//scene.add(shape_mesh2);
	shape_mesh2.position.set(-277,-87,-182);
	
	
	shape3 = THREE.FontUtils.generateShapes( "Wifi mesh", {
		 font: "helvetiker",
		weight: "bold",
			size: 100
			} );
	
	shape_geo3 = new THREE.ShapeGeometry( shape3 );
	shape_material = new THREE.MeshBasicMaterial();
	shape_mesh3 = new THREE.Mesh( shape_geo3, shape_material );
	shape_mesh3.position.set(1250.043,115.665,1571.9753);
	shape_mesh3.rotation.set(3.042, -0.198, -3.134);
	//scene.add(shape_mesh3);
	
	//shape_mesh3.position.set(85.2054, -28.6514,82.8272);
	//shape_mesh3.rotation.set(-0.187, 0.227, 0.145);
	//shape_mesh3.rotation.set(3.141592653589793, -0.3083,3.1415);
	//shape_mesh3.position.set(77, -87,-182);
	
	
	shape4 = THREE.FontUtils.generateShapes( "Visual story telling", {
		 font: "helvetiker",
		weight: "bold",
			size: 100
			} );
	shape_geo4 = new THREE.ShapeGeometry( shape4 );
	//shape_material = new THREE.MeshBasicMaterial();
	shape_mesh4 = new THREE.Mesh( shape_geo4, shape_material); 
	shape_mesh4.position.set(1250.043,259.665,1571.9753);
	shape_mesh4.rotation.set(3.042, -0.198, -3.134);
	//scene.add(shape_mesh4);
	//shape_mesh4.position.set(85.944, 7,85.201);	
	//shape_mesh4.rotation.set(3.016, -0.17, -3.13);
	//shape_mesh4.rotation.set(3.1108507803550403, -0.7237020940076991, 3.1280570639387295);
		
		
	shape5 = THREE.FontUtils.generateShapes( "Serious Games", {
		 font: "helvetiker",
		weight: "bold",
			size: 100
			} );
	
	shape_geo5 = new THREE.ShapeGeometry( shape5 );
	shape_material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
	shape_mesh5 = new THREE.Mesh( shape_geo5, shape_material );
		
	//shape_mesh5.position.set(85.944, 11.58,85.201);
	//shape_mesh5.rotation.set(3.016, -0.17, -3.13);
	shape_mesh5.position.set(1250.043,405.665,1571.9753);
	shape_mesh5.rotation.set(3.042, -0.198, -3.1349);
	//scene.add(shape_mesh5);			
		
		
	shape6 = THREE.FontUtils.generateShapes( "Alipi", {
		 font: "helvetiker",
		weight: "bold",
			size: 4
			} );
	
	shape_geo6 = new THREE.ShapeGeometry( shape6 );
	shape_material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
	shape_mesh6 = new THREE.Mesh( shape_geo6, shape_material );
	shape_mesh6.position.set(120.531, 15.998, -22.855);
	shape_mesh6.rotation.set(1.6303226676854718, -1.481876661049443, 1.661239510499774);
	//scene.add(shape_mesh6);
	//text.position.set(120.531, 22.998, -22.855);
				
	//text.rotation.set(1.6303226676854718, -1.481876661049443, 1.661239510499774);
	
	
	shape7 = THREE.FontUtils.generateShapes( "Augment real space", {
		 font: "helvetiker",
		weight: "bold",
			size: 4
			} );
	
	shape_geo7 = new THREE.ShapeGeometry( shape7 );
	shape_material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
	shape_mesh7 = new THREE.Mesh( shape_geo7, shape_material );
	shape_mesh7.position.set(120.531, 8.998, -22.855);
	shape_mesh7.rotation.set(1.6303226676854718, -1.481876661049443, 1.661239510499774);
	shape_mesh7.scale.set(0.9,1,1);
	//scene.add(shape_mesh7);
	
	shape8 = THREE.FontUtils.generateShapes( "Semantic web", {
		 font: "helvetiker",
		weight: "bold",
			size: 4
			} );
	
	shape_geo8 = new THREE.ShapeGeometry( shape8 );
	shape_material = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
	shape_mesh8 = new THREE.Mesh( shape_geo8, shape_material );
	shape_mesh8.position.set(120.531, 1.998, -22.855);
	shape_mesh8.rotation.set(1.6303226676854718, -1.481876661049443, 1.661239510499774);
	//scene.add(shape_mesh8);
		
		
	
				
		
		//controls
		trans_control = new THREE.TransformControls(camera, renderer.domElement);
		trans_control.name = "trans_control";
		trans_control.enabled = false;
		scene.add(trans_control);
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		//controls.noPan = false;
		controls.noZoom = true;
		controls.minDistance = -200;
		controls.maxDistance = Infinity;
		controls.minPolarAngle = 0.6;
		controls.maxPolarAngle = 2;
		controls.noPan = true;
		//controls.zoomSpeed = 1;
		
				
				
				//threexdomevents
				
				domEvents = new THREEx.DomEvents(camera, renderer.domElement);
				
				
			/*	domEvents.addEventListener(shape_mesh4, 'click', function(event){
				//shape_mesh4.material = shape_material = new THREE.MeshBasicMaterial({opacity:0, transparent: true});
				//shape_mesh4.material = shape_material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
				controls.enabled = false;
				trans_control.attach(shape_mesh4);
				trans_control.enabled = true;
				
				console.log(shape_mesh4.position);
				console.log(shape_mesh4.rotation);
				console.log(shape_mesh4.scale);
				}, false);
				*/
				
				
				
				
				
				/*domEvents.addEventListener(home, 'mouseover', function(event){
				//home.material.opacity=0.5;
				//console.log("s");
				home.scale.set(2,2,2);
				}, false);
				
				domEvents.addEventListener(home, 'mouseout', function(event){
				//home.material.opacity=1.2;
				home.scale.set(1,1,1);
				}, false);
				
				
				domEvents.addEventListener(home, 'click', function(event){
				
				}, false);
				
				*/
				
				
				domEvents.addEventListener(panoMesh, 'click', function(event){

				}, false);
				
				
				
				
				/*domEvents.addEventListener(screen1, 'click', function(event){
					controls.enabled = false;
				trans_control.attach(screen1);
				trans_control.enabled = true;
							console.log((screen1).position);
							console.log((screen1).rotation);
							console.log((screen1).scale);
				//console.log("scenechild");
				}, false);*/

				
				//document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				//document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//resize
				//window.addEventListener( 'resize', onWindowResize, false );

			}
//end of init()
function makeText () {
	var theText = "RESEARCH";
	var theText2 = "TECHNOLOGY";

				var hash = document.location.hash.substr( 1 );

			if ( hash.length !== 0 ) {

					theText = hash;

				}
				
				
				var hash2 = document.location.hash.substr( 1 );

			if ( hash.length !== 0 ) {

					theText2 = hash;

				}

				var text3d = new THREE.TextGeometry( theText, {

					size: 6,
					height: 3,
					curveSegments: 4,
					font: "helvetiker"

				});
				
				var text3d2 = new THREE.TextGeometry( theText2, {

					size: 6,
					height: 5,
					curveSegments: 14,
					font: "helvetiker"

				});


				text3d.computeBoundingBox();
				text3d2.computeBoundingBox();
				var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );
				var centerOffset2 = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

				var textMaterial = new THREE.MeshLambertMaterial( { color: 0x657bc5} );
				text = new THREE.Mesh( text3d, textMaterial );
				text2 = new THREE.Mesh( text3d2, textMaterial );
				//text.name = 'clients';
				scene.add(text);
				scene.add(text2);
				text.position.set(120.531, 22.998, -22.855);
				//text.rotation.set(53.85 * Math.PI/180, -1.499, 0.968);
				text.rotation.set(1.6303226676854718, -1.481876661049443, 1.661239510499774);
				text.scale.set(1,1,1);
				//text.lookAt(camera.position);
				//text2.position.set(125.95, -18.101, -31.525);
				text2.position.set(1250.043,545.665,1571.9753);
				text2.rotation.set(3.042, -0.198, -3.1349);
				text2.scale.set(22.636725999664996,21.33377413887547,  3.65099243108642);
				
				domEvents.addEventListener(text, 'click', function(event){
				//console.log("sd");
				document.getElementById("2").click();
				researchtween();
					/*controls.enabled = false;
				trans_control.attach(text2);
				trans_control.enabled = true;
							console.log((text2).position);
							console.log((text2).rotation);
							console.log((text2).scale);
				*/
				}, false); 
				
				/*domEvents.addEventListener(text, 'mouseover', function(event){
					
										text.scale.set(2,2,2);

					
				}, false);
				
				*/
				domEvents.addEventListener(text2, 'click', function(event){
					//console.log("out");
					//text.scale.set(1,1,1);
					document.getElementById("3").click();
					technologytween();
					
				}, false);
				
				
				   
				   
				
			
				    //this.text.addEventListener('click', function(event){console.log(test); });
				    //domEvents.addEventListener(this.text, 'click', function(event){console.log('you clicked on mesh', this.text)}, false)

				/*this.text.position.x = 0;
				this.text.position.y = 130;
				this.text.position.z = 70;

				this.text.rotation.x = 0.1;
				this.text.rotation.y = 3;
				//this.text.rotation.z = 1;
				this.group = new THREE.Object3D();
				this.group.add( this.text );
				this.group.name ='clients2';

				this.scene.add( this.group );*/
	}; 
	makeText();
	
	//create a transparent object to lookat for technology
	var tech_box = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.2,0.2), new THREE.MeshBasicMaterial({opacity:0, transparent:true}));
	tech_box.position.set(34,7,83);
	scene.add(tech_box);
	
	var light1 = new THREE.PointLight( 0xffffff, 3, 25 );
light1.position.set( 105.218, 20.175, -20.64);
//light1.position.set( 105.185, 26.67, 17.17);
scene.add( light1);
var lightresearchtween = new TWEEN.Tween( light1.position ).to( {
						x: 105.185,
						y: 26.67,
						z: 47.17 },7121.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					
var lightresearchtween2 = new TWEEN.Tween( light1.position ).to( {
						x: 105.218,
						y: 20.175,
						z: -49.64 },7121.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					
					lightresearchtween.chain(lightresearchtween2);
					lightresearchtween2.chain(lightresearchtween);
					lightresearchtween.start();
					
					
					
var light2 = new THREE.PointLight( 0xffffff, 2, 500 );
light2.position.set( 750.043,545.665,1561.9753);
//light1.position.set( 105.185, 26.67, 17.17);
scene.add( light2);
var lighttechnologytween = new TWEEN.Tween( light2.position ).to( {
						x: 350.043,
						y: 545.665,
						z: 1561.9753 },7121.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					
var lighttechnologytween2 = new TWEEN.Tween( light2.position ).to( {
						x: 2750.043,
						y: 545.665,
						z: 1261.9753 },7121.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					
					lighttechnologytween.chain(lighttechnologytween2);
					lighttechnologytween2.chain(lighttechnologytween);
					lighttechnologytween.start();


					
var testbox = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshBasicMaterial());
testbox.position.set(1250.043,545.665,1571.9753);
//scene.add(testbox);
domEvents.addEventListener(tech_box, 'click', function(event){
				controls.enabled = false;
				trans_control.attach(tech_box);
				trans_control.enabled = true;
							console.log((tech_box).position);
							console.log((tech_box).rotation);
							console.log((tech_box).scale);
				
				}, false); 

			function onWindowResize() {

				//windowHalfX = document.getElementById("render").offsetWidth / 2;
				//windowHalfY = window.innerHeight / 2;

				//camera.aspect = document.getElementById("render").offsetWidth / window.innerHeight;
				

				//renderer.setSize( document.getElementById("render").offsetWidth, window.innerHeight );

			}

			
			//anon's raycasting function to implement trans_controls.
			function getCollisionRay(event) {
        var projector = new THREE.Projector(),
            mouseVector = new THREE.Vector3(),
            ray;
        mouseVector.x = ((event.clientX / window.innerWidth) * 2) - 1;
        mouseVector.y = -((event.clientY / window.innerHeight) * 2) + 1;
        ray = projector.pickingRay(mouseVector.clone(), camera);
        return ray;
	};
	

			
			function onKeydown(event) {
			// console.log(event.which);
			switch (event.keyCode) {
			case 80: //P
				this.save();
				break;
            case 81: // Q
                trans_control.enabled = false;
                controls.enabled = true;
                // is there something to detach this object? confirm it
                trans_control.detach(trans_control.object);
                //document.getElementById('info').innerHTML = '';
                break;
            case 82: // R
                trans_control.setMode("rotate");
                break;
            case 83: // S
                trans_control.setMode("scale");
                break;
            case 84: // T
                trans_control.setMode("translate");
                break;
            }
	};
	
			
			function keyboardcontrols() {
				
				console.log("hi");			
				render();
				
				
				};
			
			
			
			
			
			
			
			
				var time = 0;
			function animate() {
				scene.simulate();
				requestAnimationFrame( animate );
				//time += 0.001;
				

          //panoMesh.rotation.y = time;

				render();
				

			}
			//var radius = 16;
			//var theta = 0;
			/*new TWEEN.Tween( cube.position ).to( {
						x: 0,
						y: 0,
						z: -900 }, 2511.4 )
					.delay(6020)
					.easing( TWEEN.Easing.Bounce.Out).start();
			new TWEEN.Tween( cube.rotation ).to( {
						x: 0,
						y: 0,
						z: 0 }, 911.4 )
			.delay(8020)
					.easing( TWEEN.Easing.Bounce.Out).start();
					*/
					var hometween;
					var hometweenfn = function() {
					hometween = new TWEEN.Tween( home.position ).to( {
						x: camera.position.x ,
						y: camera.position.y,
						z: camera.position.z -100 }, 0.4 )
					
					.easing( TWEEN.Easing.Bounce.Out).start();

					};
					
			/*controller1annie1 = new TWEEN.Tween( controller1.position ).to( {
						x: -18.24,
						y: -12.97,
						z: 89.42 },311.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					
			controller1annie2 = new TWEEN.Tween( controller1.position ).to( {
						x: -18.24,
						y: -16.97,
						z: 89.42 }, 311.4 )
					
					.easing( TWEEN.Easing.Linear.None);
					controller1annie1.chain(controller1annie2);
					controller1annie2.chain(controller1annie1);
					controller1annie1.start();
				*/	
				function camtween1(){
					camera.lookAt(white_board.position);
					render();
					//var vector3 = new THREE.Vector3(10,10,10);
						/*var tween1 = new TWEEN.Tween( camera.rotation ).to( {
						x: camera.rotation.x,
						y: -1.5024,
						z: camera.rotation.z
						 },311.4 )
				
					.easing( TWEEN.Easing.Linear.None).
					start();
					render();
					//console.log(camera.lookAt);*/
				};
					
				function camtween2(){
					camera.lookAt(tech_box.position);
					render();
				};
				
				function technologytween() {
					scene.add(shape_mesh3);
					scene.add(shape_mesh4);
					scene.add(shape_mesh5);
					domEvents.addEventListener(shape_mesh3, 'click', function(event){
				
				techfn3();
				}, false);
					
					domEvents.addEventListener(shape_mesh4, 'click', function(event){
				
				techfn2();
				}, false);
					
					domEvents.addEventListener(shape_mesh5, 'click', function(event){
				
				techfn1();
				}, false);
					/*new TWEEN.Tween( shape_mesh3.rotation ).to( {
						x: 3.141592653589793,
						y: -0.3083,
						z: 3.1415}, 12.4 )
				
					
					.easing( TWEEN.Easing.Linear.None)
					
					
					.start();
					
					new TWEEN.Tween( shape_mesh4.rotation ).to( {
						x: 3.1108507803550403, 
						y: -0.7237020940076991,
						z:  3.1280570639387295}, 12.4 )
				
					
					.easing( TWEEN.Easing.Linear.None)
					
					
					.start();
				*/
				
					
				};
				
				function researchtween(){
					scene.add(shape_mesh6);
					scene.add(shape_mesh7);
					scene.add(shape_mesh8);
					
					domEvents.addEventListener(shape_mesh6, 'click', function(event){
				
				researchfn1();
				}, false);
					
					domEvents.addEventListener(shape_mesh7, 'click', function(event){
				
				researchfn2();
				}, false);
					
					domEvents.addEventListener(shape_mesh8, 'click', function(event){
				
				researchfn3();
				}, false);
					
					};
				function keystart(char) {
					
				if (keyboard.pressed("d")) {
					var vectord = new THREE.Vector3(15,0,0);
					character1.setLinearVelocity(vectord);
					//character1.setAngularVelocity(vectord);
					//character1.rotateOnAxis(0,1,0);
					//panoMesh.rotation.x+=0.001;
					
							}	
							
				if (keyboard.pressed("a")) {
					var vectora = new THREE.Vector3(-15,0,0);
					//var vectora2 = new THREE.Vector3(0.1,0,0);
					character1.setLinearVelocity(vectora);
					//character1.setAngularVelocity(vectora2);
					//panoMesh.rotation.x-=0.001;
					
							}
				if (keyboard.pressed("s")) {
					var vectors = new THREE.Vector3(0,0,15);
					character1.setLinearVelocity(vectors);
					
							}
				if (keyboard.pressed("w")) {
					var vectorw = new THREE.Vector3(0,0,-15);
					character1.setLinearVelocity(vectorw);
				
				}
				
				if (keyboard.pressed("space")) {
					var vectorspace = new THREE.Vector3(0,15,0);
					character1.setLinearVelocity(vectorspace);
				
				}
				
				};
				
				
		
			/*function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}
*/
				camera.rotation.set(0,0.15,0);
				//camera.lookAt(servelotslogo5.position);

			function render() {
				
				ground_material.depthWrite = false;
				controls.update;
				var char = 0;
				keystart();
				//shape_mesh1.lookAt(camera.position);
				
				//camera.lookAt(tabletop1.position);
				//console.log(camera.rotation.y);
				
				//keystart();
			//annie.update(1000);
			//camera.rotation.x =(camera.rotation.x +0.01);
			//shape_mesh1.position.x = character1.position.x;
			//shape_mesh1.position.z = character1.position.z;
			
			//shape_mesh2.position.x = character2.position.x;
			//shape_mesh2.position.z = character2.position.z;
				
				
	
				camera.updateProjectionMatrix();
				 //var zCamVec = new THREE.Vector3(0,0,1);
  //var position = camera.localToWorld(zCamVec);
//console.log(camera.localToWorld(zCamVec);
  //home.position.set(position.x, position.y, position.z);
  //home.lookAt(camera.position);
  //home.rotation.set(camera.rotation.x, camera.rotation.y + 100, camera.rotation.z);
				
				
				TWEEN.update();
				//cube.rotation.x +=0.01;
				
				
				
				
				 
				
				//var xAxis = new THREE.Vector3(1,0,0);
				//var rotateAroundWorldAxis(mesh, xAxis, Math.PI / 180);
				
				//theta += 0.1;
				//cube.rotation.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				//plane.rotation.x =
				//cube.rotation.x += ( targetRotation - cube.rotation.x ) * 0.5;
				//plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.5;
				//plane.rotation.z = cube.rotation.z += ( targetRotation - cube.rotation.z ) * 0.05;
				
				renderer.render( scene, camera );
				
				
				
				}
				

		
