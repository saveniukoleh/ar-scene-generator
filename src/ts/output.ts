const outputHTMLConfig = [
  `
      <!DOCTYPE html>
  
      <head>
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
          <title>AR project template</title>
          <!-- include three.js library -->
          <script src='js/three.js'></script>
          <script src='js/OBJLoader.js'></script>
          <script src='js/MTLLoader.js'></script>
          <!-- include tween.js library -->
          <script src="js/tween.umd.js"></script>
          <!-- include jsartookit -->
          <script src="jsartoolkit5/artoolkit.min.js"></script>
          <script src="jsartoolkit5/artoolkit.api.js"></script>
          <!-- include threex.artoolkit -->
          <script src="threex/threex-artoolkitsource.js"></script>
          <script src="threex/threex-artoolkitcontext.js"></script>
          <script src="threex/threex-arbasecontrols.js"></script>
          <script src="threex/threex-armarkercontrols.js"></script>
      </head>
      
      <body style='margin : 0px; overflow: hidden; font-family: Monospace;'>
      
          <!-- 
        Example based on the AR.js library and examples created by Jerome Etienne: https://github.com/jeromeetienne/AR.js/
      -->
      
          <script>
              var scene, camera, renderer, clock, deltaTime, totalTime;
      
              var arToolkitSource, arToolkitContext;
      
              var markerRoot, mainContainer;
  
              var audioContent = [];
      
              initialize();
              animate();
      
              function initialize() {
                  scene = new THREE.Scene();
      
                  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
                  scene.add(ambientLight);
      
                  camera = new THREE.Camera();
                  scene.add(camera);
      
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
      
                  ////////////////////////////////////////////////////////////
                  // setup arToolkitSource
                  ////////////////////////////////////////////////////////////
      
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
      
                  // handle resize event
                  window.addEventListener('resize', function () {
                      onResize()
                  });
      
                  ////////////////////////////////////////////////////////////
                  // setup arToolkitContext
                  ////////////////////////////////////////////////////////////	
      
                  // create atToolkitContext
                  arToolkitContext = new THREEx.ArToolkitContext({
                      cameraParametersUrl: 'data/camera_para.dat',
                      detectionMode: 'mono_and_matrix',
                      matrixCodeType: "3x3",
                      maxDetectionRate: 60,
                      canvasWidth: 640,
                      canvasHeight: 480
                  });
      
                  // copy projection matrix to camera when initialization complete
                  arToolkitContext.init(function onCompleted() {
                      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
                  });
      
                  ////////////////////////////////////////////////////////////
                  // setup markerRoots
                  ////////////////////////////////////////////////////////////
      
                  // CUSTOM PART
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
];

const finalOutput = `; i++) {
                      mainContainer.add(markerRoots[i]);
                      if (patternBarcode[i] === -1) {
                          let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                              type: 'pattern', patternUrl: \`\${patternNames[i]}.patt\`,
                          })
                      } else {
                          let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                              type: "barcode", barcodeValue: patternBarcode[i],
                          })
                      }
      
                      switch (modes[i]) {
                          case 'model':
                              function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }
                              function onError(xhr) { console.log('An error happened'); }
      
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
      
                                          }, onProgress, onError);
                                  });
                              break;
                          case 'image':
                              let geometry1 = new THREE.PlaneBufferGeometry(1, 1, 4, 4);
                              let loader = new THREE.TextureLoader();
                              let texture = loader.load(\`\${imageFiles[i]}\`, render);
                              let material1 = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      
                              mesh1 = new THREE.Mesh(geometry1, material1);
                              mesh1.rotation.x = -Math.PI / 2;
                              markerRoots[i].add(mesh1);
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
                              audioContent.push(video);
                              let texture2 = new THREE.VideoTexture(video);
                              texture2.minFilter = THREE.LinearFilter;
                              texture2.magFilter = THREE.LinearFilter;
                              texture2.format = THREE.RGBFormat;
                              let material2 = new THREE.MeshBasicMaterial({ map: texture2 });
      
                              mesh2 = new THREE.Mesh(geometry2, material2);
                              mesh2.rotation.x = -Math.PI / 2;
      
                              markerRoots[i].add(mesh2);
                              break;
                          default:
                              let mesh = new THREE.Mesh(
                                  new THREE.CubeGeometry(1, 1, 1),
                                  new THREE.MeshBasicMaterial({ color: 'red', transparent: true, opacity: 0.5 })
                              );
                              mesh.position.y = 0.5;
                              markerRoots[i].add(mesh);
                              break;
                      }
      
      
                      if (audioFiles[i]) {
                          const listener = new THREE.AudioListener();
                          camera.add(listener);
                          // create a global audio source
                          const sound = new THREE.Audio(listener);
                          audioContent.push(sound);
                          // load a sound and set it as the Audio object's buffer
                          const audioLoader = new THREE.AudioLoader();
                          audioLoader.load(\`\${audioFiles[i]}\`, function (buffer) {
                              sound.setBuffer(buffer);
                              if (repeatOptions[i]) {
                                  sound.setLoop(true);
                              }
                              sound.setVolume(0.5);
                          });
                      }
                  }
      
                  scene.add(mainContainer);
              }
      
              function update() {
                  // update artoolkit on every frame
                  if (arToolkitSource.ready !== false) {
                      arToolkitContext.update(arToolkitSource.domElement);
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
                  render();
              }
  
              
              const playAudioContent = () => {
                  window.removeEventListener('touchstart', playAudioContent);
                  for (let i = 0; i < audioContent.length; i++) {
                      audioContent[i].play();
                  }
              };
              window.addEventListener('touchstart', playAudioContent)
      
          </script>
      
      </body>
      
      </html>
    `;

export { outputHTMLConfig, finalOutput };
