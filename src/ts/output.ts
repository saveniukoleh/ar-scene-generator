const outputHTMLConfig = [
    `
    <!DOCTYPE html>

    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <title>AR project template</title>
        <!-- Main libraries -->
        <script src="js/three.js"></script>
        <script src="js/tween.umd.js"></script>
        <script src='loaders/GLTFLoader.js'></script>
        <script src='loaders/GLTF2Loader.js'></script>
        <script src='loaders/MTLLoader.js'></script>
        <script src='loaders/OBJLoader.js'></script>
        <!-- jsartookit -->
        <script src="jsartoolkit5/artoolkit.min.js"></script>
        <script src="jsartoolkit5/artoolkit.api.js"></script>
        <!-- threex.artoolkit -->
        <script src="threex/threex-artoolkitsource.js"></script>
        <script src="threex/threex-artoolkitcontext.js"></script>
        <script src="threex/threex-arbasecontrols.js"></script>
        <script src="threex/threex-armarkercontrols.js"></script>
    </head>
    
    <body style='margin : 0px; overflow: hidden; font-family: Monospace; user-select: none; pointer-events: none;'>
    
        <div id="access" style="top: 0; left: 0; right:0; bottom: 0; background: #000; position: absolute; user-select: all; pointer-events: all;">
            <div id="text-wrapper" style="top: 50%; left: 50%; position: absolute; color: #fff; transform: translate(-50%, -50%); text-align: center;
                    text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-weight: 400; line-height: 1.5em; font-size: large; white-space: nowrap;
                    user-select: none; pointer-events: none;
                ">
                Press here
                <br>
                to enter the experience
            </div>
        </div>
    
        <div id="loader" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #fff; pointer-events: none; user-select: none;
            transition: all .2s linear; display: none;">
            <div style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%); text-align: center; width: 130px; height: 165px;
                font-family: Arial, Helvetica, sans-serif; font-weight: 400; line-height: 1.5em; font-size: large;" class="spinner-wrapper">
                <img style="width: 130px; height: 130px; pointer-events: none; user-select: none;" src="data/spin.gif" alt="spin gif">
                <br>
                Loading...
            </div>
        </div>
    
        <script>
            const access = document.getElementById('access');
            const loader = document.getElementById('loader');
    
            function initiateExperience() {
                // Global variables
                var scene, camera, renderer, clock, deltaTime, totalTime;
    
                var patternIdOffset = 10000000000
    
                // AR toolkit variables
                var arToolkitSource, arToolkitContext;
    
                // Main container
                var markerRoot, mainContainer;
    
                // Array for any video or audio keys
                var audioContent = [];
    
                var contentPromises = [];
    
                let contentInitialized = false;
                let barcodesSound = new Map();
                let patternsSound = new Map();
                let barcodesID = [];
                let patternsID = [];
    
                let controller;
    
                // Initializing the scene and animation
                initialize();
                animate();
    
                function initialize() {
                    // Creating new scene
                    scene = new THREE.Scene();
    
                    // Adding light to the scene
                    let ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
                    scene.add(ambientLight);
    
                    // Creating camera
                    camera = new THREE.Camera();
                    scene.add(camera);
                    const listener = new THREE.AudioListener();
                    camera.add(listener);
                    const audioLoader = new THREE.AudioLoader();
    
                    // Creating renderer
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
    
                    // Re-render canvas and ar-toolkit controller
                    function onResize() {
                        arToolkitSource.onResize()
                        arToolkitSource.copySizeTo(renderer.domElement)
                        if (arToolkitContext.arController !== null) {
                            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
                        }
                    }
    
                    // Render on initialization
                    arToolkitSource.init(function onReady() {
                        onResize()
                    });
    
                    // Re-render canvas evety time browser window gets resize
                    window.addEventListener('resize', function () {
                        onResize()
                    });
    
                    // AR context initialization
                    arToolkitContext = new THREEx.ArToolkitContext({
                        cameraParametersUrl: 'data/camera_para.dat',
                        detectionMode: 'mono_and_matrix',
                        matrixCodeType: "3x3",
                        maxDetectionRate: 60,
                        canvasWidth: 640,
                        canvasHeight: 480
                    });
    
                    // Reasign camera projection Matrix to AR toolkit projection matrix
                    arToolkitContext.init(function onCompleted() {
                        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
                    });
    
                    // Main group on the scene for all markers
                    mainContainer = new THREE.Group();
    
                    // Array for .patt file names
                    const patternNames = [`, `];
                    // Array for barcodes
                    const patternBarcode = [`, `];
                    // Array for content types
                    const modes = [`, `];
                    // Array for .glb or .gltf model file names
                    const modelFiles = [`, `];
                    // Array for image file names
                    const imageFiles = [`, `];
                    // Array for video file names
                    const videoFiles = [`, `];
                    // Array for audio file names
                    const audioFiles = [`, `];
                    // Array for autoplay option
                    const repeatOptions = [`, `];
      
                    // Creating separate group for every marker
                    const markerRoots = [];
                    for (let i = 0; i < `, `; i++) {
                        markerRoots[i] = new THREE.Group();
                    }
      
                    // Adding content to every marker group
                    for (let i = 0; i < `, `; i++) {
                        mainContainer.add(markerRoots[i]);
    
                        // If current barcode is -1, create marker controller type. Otherwise barcode controller
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
    
                        // Using switch operator to check for content type
                        switch (modes[i]) {
                            // If current type is a model, do next
                            case 'model':
                                function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }
                                function onError(xhr) { console.log('An error happened'); }
    
                                contentPromises.push(new Promise((resolve) => {
                                    // Creating a loader for .glb or .gltf models
                                    const test = new THREE.GLTF2Loader().load(\`\${modelFiles[i]}\`, (response) => {
                                        const scene = response.scene;
                                        const object = scene.children[0];
                                        // Sometimes we can not see our model because it is too large on the scene or too small
                                        // For more info read: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models
                                        // Here we scale it down to see it on scene for sure. You can remove this scale if needed
                                        object.scale.set(0.01, 0.01, 0.01);
                                        // You can adjust the position and rotation of your model also, play with it
                                        // object.position.set(0, Math.PI / 2, Math.PI / 4);
                                        // object.rotation.set(0, Math.PI / 2, Math.PI / 4);
                                        // Adding our model to the marker group container
                                        markerRoots[i].add(object);
                                        resolve(modelFiles[i])
                                    }, onProgress, onError)
                                }).then((file) => {
                                    console.log(\`File \${file} loaded\`)
                                }))
                                break;
                            // If current type is an image, do next
                            case 'image':
                                if (imageFiles[i]) {
                                    contentPromises.push(new Promise((resolve) => {
                                        // Creating a loader for textures
                                        let loader = new THREE.TextureLoader();
                                        loader.load(\`\${imageFiles[i]}\`, (texture) => {
                                            let geometry1, ratio = texture.image.naturalWidth / texture.image.naturalHeight;
                                            if (texture.image.naturalHeight < texture.image.naturalWidth) {
                                                geometry1 = new THREE.PlaneBufferGeometry(ratio, 1);
                                            } else {
                                                geometry1 = new THREE.PlaneBufferGeometry(1, 1 / ratio);
                                            }
                                            let material1 = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                                            mesh1 = new THREE.Mesh(geometry1, material1);
                                            // Rotating the plane
                                            mesh1.rotation.x = -Math.PI / 2;
                                            // Adding to the marker group container
                                            markerRoots[i].add(mesh1);
                                            resolve(imageFiles[i])
                                        });
                                    }).then(image => {
                                        console.log(\`File \${image} loaded\`)
                                    }))
                                }
                                break;
                            // If current type is a video, do next
                            case 'video':
                                // Creating plane for video canvas, canvas should be adjusted for the video dimensions
                                // Currently this is 16:9 video dimension
                                let geometry2 = new THREE.PlaneBufferGeometry(1.6 , 0.9);
                                // Creating html video element
                                let video = document.createElement('video');
                                video.src = \`\${videoFiles[i]}\`;
                                video.playsInline = true;
                                // Setting the autoplay if needed
                                if (repeatOptions[i]) {
                                    video.addEventListener('ended', () => {
                                        video.play();
                                    })
                                }
                                // Adding video to correstpondent audio content array
                                if (patternBarcode[i] === -1) {
                                    patternsSound.set(i, video);
                                } else {
                                    barcodesSound.set(patternBarcode[i], video);
                                }
                                // Coping video texture to the plane
                                let texture2 = new THREE.VideoTexture(video);
                                texture2.minFilter = THREE.LinearFilter;
                                texture2.magFilter = THREE.LinearFilter;
                                texture2.format = THREE.RGBFormat;
                                let material2 = new THREE.MeshBasicMaterial({ map: texture2 });
                                mesh2 = new THREE.Mesh(geometry2, material2);
                                // Rotating the plane
                                mesh2.rotation.x = -Math.PI / 2;
                                // Adding plane to the marker group
                                markerRoots[i].add(mesh2);
                                break;
                            // In case we need a 3d controller prototype
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
                            // In case none of the content was selected
                            default:
                                mesh11 = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1),
                                    new THREE.MeshBasicMaterial({ color: '#fff' }));
                                mesh11.rotation.x = -Math.PI / 2;
                                markerRoots[i].add(mesh11);
                                break;
                        }
    
                        // Adding audio files to correspondent array
                        if (audioFiles[i]) {
                            contentPromises.push(new Promise((resolve, reject) => {
                                audioLoader.load(\`\${audioFiles[i]}\`, function (buffer) {
                                    // Creating audio source
                                    let sound = new THREE.Audio(listener);
                                    sound.name = \`\${audioFiles[i]}\`;
                                    sound.setBuffer(buffer);
                                    // Setting autoplay for the audio
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
                                console.log(\`File \${sound.name} loaded\`)
                            }))
                        }
                    }
    
                    // Hiding the loader after most of the content has been loaded
                    Promise.all(contentPromises)
                        .then(() => {
                            console.log('Most of the content loaded')
                            contentInitialized = true;
                            loader.style.opacity = '0';
                        });
    
                    // Adding main container for all of the marker groups to the scene
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
    
                // Checking for the intersections between two objects
                function detectCollisionCubes(object1, object2) {
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
    
                // Updating AR source on each frame and manipulating with sound
                function update() {
                    if (arToolkitSource.ready !== false) {
                        arToolkitContext.update(arToolkitSource.domElement);
                        if (contentInitialized) {
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
    
                // Render scene
                function render() {
                    renderer.render(scene, camera);
                }
    
                // Animation loop
                function animate(time) {
                    // Requesting animation loop from the browser
                    requestAnimationFrame(animate);
                    deltaTime = clock.getDelta();
                    totalTime += deltaTime;
                    update();
                    checkController();
                    render();
                }
            }
    
            // Removing entry screen after user interaction to unlock audio content. Safari browser policy
            access.addEventListener('click', () => {
                initiateExperience();
                document.body.removeChild(access);
                loader.style.display = 'block';
            });
        </script>
    
    </body>
    
    </html>
    `
    ,
];

export { outputHTMLConfig };
