const outputHTMLConfig = [
  `
      <!DOCTYPE html>
  
      <head>
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
          <title>AR project template</title>
          <!-- three.js -->
          <script src='js/three.js'></script>
          <script src='js/OBJLoader.js'></script>
          <script src='js/MTLLoader.js'></script>
          <!-- tween.js -->
          <script src="js/tween.umd.js"></script>
          <!-- jsartookit -->
          <script src="jsartoolkit5/artoolkit.min.js"></script>
          <script src="jsartoolkit5/artoolkit.api.js"></script>
          <!-- threex.artoolkit -->
          <script src="threex/threex-artoolkitsource.js"></script>
          <script src="threex/threex-artoolkitcontext.js"></script>
          <script src="threex/threex-arbasecontrols.js"></script>
          <script src="threex/threex-armarkercontrols.js"></script>
      </head>
      
      <body style='margin : 0px; overflow: hidden; font-family: Monospace;'>
      
          <script>
              var scene, camera, renderer, clock, deltaTime, totalTime;
      
              var patternIdOffset = 10000000000
              
              var arToolkitSource, arToolkitContext;
      
              var markerRoot, mainContainer;
  
              var audioContent = [];

              var contentPromises = [];      
      
              let audioInitialized = false;
              let barcodesSound = new Map();
              let patternsSound = new Map();
              let barcodesID = [];
              let patternsID = [];

              let controller;

              initialize();
              animate();
      
              function initialize() {
                  scene = new THREE.Scene();
      
                  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
                  scene.add(ambientLight);
      
                  camera = new THREE.Camera();
                  scene.add(camera);
                  const listener = new THREE.AudioListener();
                  camera.add(listener);
                  const audioLoader = new THREE.AudioLoader();
      
                  renderer = new THREE.WebGLRenderer({
                      antialias: true,
                      alpha: true
                  });
                  renderer.setClearColor(new THREE.Color('lightgrey'), 0)
                  renderer.setSize(640, 480);
                  renderer.domElement.style.position = 'absolute'
                  renderer.domElement.style.top = '0px'
                  renderer.domElement.style.left = '0px'
                  document.body.appendChild(renderer.domElement);
      
                  clock = new THREE.Clock();
                  deltaTime = 0;
                  totalTime = 0;
      
                  arToolkitSource = new THREEx.ArToolkitSource({
                      sourceType: 'webcam',
                  });
      
                  function onResize() {
                      arToolkitSource.onResize()
                      arToolkitSource.copySizeTo(renderer.domElement)
                      if (arToolkitContext.arController !== null) {
                          arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
                      }
                  }
      
                  arToolkitSource.init(function onReady() {
                      onResize()
                  });
      
                  window.addEventListener('resize', function () {
                      onResize()
                  });	
      
                  arToolkitContext = new THREEx.ArToolkitContext({
                      cameraParametersUrl: 'data/camera_para.dat',
                      detectionMode: 'mono_and_matrix',
                      matrixCodeType: "3x3",
                      maxDetectionRate: 60,
                      canvasWidth: 640,
                      canvasHeight: 480
                  });
      
                  arToolkitContext.init(function onCompleted() {
                      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
                  });
      
                  mainContainer = new THREE.Group();
                  
                  const patternNames = [`,
  `];
                  const patternBarcode = [`,
  `];
                  const modes = [`,
  `];
                  const modelFiles = [`,
  `];
                  const imageFiles = [`,
  `];
                  const videoFiles = [`,
  `];
                  const audioFiles = [`,
  `];
                  const repeatOptions = [`,
  `];
  
                  const markerRoots = [];
                  for (let i = 0; i < `,
  `; i++) {
                        markerRoots[i] = new THREE.Group();
                  }
   
                  for (let i = 0; i < `,
  `; i++) {
                    mainContainer.add(markerRoots[i]);

                    if (patternBarcode[i] === -1) {
                        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                            type: 'pattern', patternUrl: patternNames[i], size: 1 + (i + 1) / patternIdOffset
                        })
                        patternsID.push(patternNames[i]);
                    } else {
                        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                            type: "barcode", barcodeValue: patternBarcode[i],
                        })
                        barcodesID.push(patternBarcode[i]);
                    }
    
                    switch (modes[i]) {
                        case 'model':
                            function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }
                            function onError(xhr) { console.log('An error happened'); }
    
                            contentPromises.push(new Promise((resolve) => {
                                new THREE.MTLLoader()
                                    .load(\`\${modelFiles[i]}.mtl\`, function (materials) {
                                        materials.preload();
                                        new THREE.OBJLoader()
                                            .setMaterials(materials)
                                            .load(\`\${modelFiles[i]}.obj\`, function (group) {
                                                let mesh0 = group.children[0];
                                                mesh0.material.side = THREE.DoubleSide;
                                                mesh0.scale.set(0.05, 0.05, 0.05);
                                                mesh0.rotation.set(Math.PI / -2, 0, 0);
                                                markerRoots[i].add(mesh0);
                                                resolve(modelFiles[i])
                                            }, onProgress, onError);
                                    });
                            }).then((file) => {
                                console.log(\`\${file} loaded\`)
                            }))
                            break;
                        case 'image':
                            if (imageFiles[i]) {
                                contentPromises.push(new Promise((resolve) => {
                                    let geometry1 = new THREE.PlaneBufferGeometry(1, 1, 4, 4);
                                    let loader = new THREE.TextureLoader();
                                    let texture = loader.load(\`\${imageFiles[i]}\`, render);
                                    let material1 = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                                    mesh1 = new THREE.Mesh(geometry1, material1);
                                    mesh1.rotation.x = -Math.PI / 2;
                                    markerRoots[i].add(mesh1);
                                    resolve(imageFiles[i])
                                }).then(image => {
                                    console.log(\`\${image} loaded\`)
                                }))
                            }
                            break;
                        case 'video':
                            let geometry2 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
                            let video = document.createElement('video');
                            video.src = \`\${videoFiles[i]}\`;
                            if (repeatOptions[i]) {
                                video.addEventListener('ended', () => {
                                    video.play();
                                })
                            }
                            if (patternBarcode[i] === -1) {
                                patternsSound.set(i, video);
                            } else {
                                barcodesSound.set(patternBarcode[i], video);
                            }
                            let texture2 = new THREE.VideoTexture(video);
                            texture2.minFilter = THREE.LinearFilter;
                            texture2.magFilter = THREE.LinearFilter;
                            texture2.format = THREE.RGBFormat;
                            let material2 = new THREE.MeshBasicMaterial({ map: texture2 });
                            mesh2 = new THREE.Mesh(geometry2, material2);
                            mesh2.rotation.x = -Math.PI / 2;
                            markerRoots[i].add(mesh2);
                            break;
                        case 'controller':
                            controller = new THREE.Mesh(
                                new THREE.CubeGeometry(10, 0.15, 0.15),
                                new THREE.MeshBasicMaterial({ color: 'green' })
                            );
                            controller.rotation.y = Math.PI / 2;
                            controller.position.y = 0.125;
                            controller.position.z = -4.5;
                            markerRoots[i].add(controller);
                            break;
                        default:
                            mesh11 = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1),
                                                new THREE.MeshBasicMaterial({ color: '#fff' }));
                            mesh11.rotation.x = -Math.PI / 2;
                            markerRoots[i].add(mesh11);
                            break;
                    }
    
                    if (audioFiles[i]) {
                        contentPromises.push(new Promise((resolve, reject) => {
                            audioLoader.load(\`\${audioFiles[i]}\`, function (buffer) {
                                let sound = new THREE.Audio(listener);
                                sound.name = \`\${audioFiles[i]}\`;
                                sound.setBuffer(buffer);
                                if (repeatOptions[i]) {
                                    sound.setLoop(true);
                                }
                                if (patternBarcode[i] === -1) {
                                    patternsSound.set(i, sound);
                                } else {
                                    barcodesSound.set(patternBarcode[i], sound);
                                }
                                resolve(sound)
                            });
                        }).then((sound) => {
                            sound.play()
                            sound.stop()
                            console.log(\`\${sound.name} loaded\`)
                        }))
                    }
                }
  
                Promise.all(contentPromises)
                    .then(() => {
                        console.log('Most of the content loaded')
                        audioInitialized = !audioInitialized;
                    });

                scene.add(mainContainer);
            }

            function checkController() {
                if (controller) {
                    mainContainer.traverse((object) => {
                        if (object.isMesh && object !== controller) {
                            if (detectCollisionCubes(object, controller)) {
                                object.material.color.set('red')
                            } else {
                                object.material.color.set('white')
                            }
                        }
                    });
                }
            }

            function detectCollisionCubes (object1, object2) {
                object1.geometry.computeBoundingBox();
                object2.geometry.computeBoundingBox();
                object1.updateMatrixWorld();
                object2.updateMatrixWorld();

                const box1 = object1.geometry.boundingBox.clone();
                box1.applyMatrix4(object1.matrixWorld);

                const box2 = object2.geometry.boundingBox.clone();
                box2.applyMatrix4(object2.matrixWorld);

                return box1.intersectsBox(box2);
            };
    
            function update() {
                if (arToolkitSource.ready !== false) {
                    arToolkitContext.update(arToolkitSource.domElement);
                    if (audioInitialized) {
                        if (barcodesID.length) {
                            barcodesID.forEach((elem, index) => {
                                if (arToolkitContext.arController.barcodeMarkers[elem].inCurrent) {
                                    let sound = barcodesSound.get(elem);
                                    if (sound && !sound.isPlaying) sound.play();
                                } else {
                                    let sound = barcodesSound.get(elem);
                                    if (sound && sound.nodeName === 'VIDEO') {
                                        if (!sound.paused) sound.pause()
                                    }
                                    if (sound && sound.isPlaying) sound.stop();
                                }
                            })
                        }
                        if (patternsID.length) {
                            for (let index = 0; index < patternsID.length; index++) {
                                if (arToolkitContext.arController.patternMarkers[index].inCurrent) {
                                    let patternID = (arToolkitContext.arController.patternMarkers[index].markerWidth - 1) * patternIdOffset - 1;
                                    patternID = Math.round(patternID)
                                    let sound = patternsSound.get(patternID);
                                    if (sound && !sound.isPlaying) sound.play();
                                } else {
                                    let patternID = (arToolkitContext.arController.patternMarkers[index].markerWidth - 1) * patternIdOffset - 1;
                                    patternID = Math.round(patternID)
                                    let sound = patternsSound.get(patternID);
                                    if (sound && sound.nodeName === 'VIDEO') {
                                        if (!sound.paused) sound.pause()
                                    }
                                    if (sound && sound.isPlaying) sound.stop();
                                }
                            }
                        }
                    }
                }
            }
    
            function render() {
                renderer.render(scene, camera);
            }
    
            function animate(time) {
                requestAnimationFrame(animate);
                deltaTime = clock.getDelta();
                totalTime += deltaTime;
                update();
                checkController();
                render();
            }
        </script>
    
    </body>
    
    </html>
  `,
];

export { outputHTMLConfig };
