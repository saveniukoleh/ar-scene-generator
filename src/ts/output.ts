const outputHTMLConfig = [
  `
      <!DOCTYPE html>
  
      <head>
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
          <title>AR project template</title>
          <!-- Добавляем необходимые библиотеки -->
          <!-- Библиотека three.js -->
          <script src='js/three.js'></script>
          <script src='js/OBJLoader.js'></script>
          <script src='js/MTLLoader.js'></script>
          <!-- Библиотека tween.js -->
          <script src="js/tween.umd.js"></script>
          <!-- Добавляем jsartookit -->
          <script src="jsartoolkit5/artoolkit.min.js"></script>
          <script src="jsartoolkit5/artoolkit.api.js"></script>
          <!-- Добавляем threex.artoolkit -->
          <script src="threex/threex-artoolkitsource.js"></script>
          <script src="threex/threex-artoolkitcontext.js"></script>
          <script src="threex/threex-arbasecontrols.js"></script>
          <script src="threex/threex-armarkercontrols.js"></script>
      </head>
      
      <body style='margin : 0px; overflow: hidden; font-family: Monospace;'>
      
          <script>
              // Объявляем глобальные переменные
              var scene, camera, renderer, clock, deltaTime, totalTime;
      
              // Переменные необходимые для работы AR окружения
              var arToolkitSource, arToolkitContext;
      
              // Главный контейнер, в который войдут все 3D объекты для приложения 
              var markerRoot, mainContainer;
  
              // Отдельный массив для хранение всего аудио и видео контента, который будет 
              // запущен по нажатию на экран смартфона
              var audioContent = [];
      
              // Инициализируем сцену и запускаем цикл анимации
              initialize();
              animate();
      
              function initialize() {
                  // Объявляем сцену в которую добавим главный контейнер со всеми 3D объектами
                  scene = new THREE.Scene();
      
                  // Добавляем свет на сцену, иначе базовые материалы будут просто чёрными
                  // т.к. им будет нечего отражать, обратитесь к документации библиотеки three.js, чтобы
                  // прочитать о подробной работе класса Material
                  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
                  scene.add(ambientLight);
      
                  // Добавляем камеру, которая будет позже переназначена на камеру смартфона
                  camera = new THREE.Camera();
                  scene.add(camera);
      
                  // Объявляем стандартный рендерер и добавляем его в тег body html документа
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
      
                  // Функция перерендерит AR сцену под текущий размер canvas
                  function onResize() {
                      arToolkitSource.onResize()
                      arToolkitSource.copySizeTo(renderer.domElement)
                      if (arToolkitContext.arController !== null) {
                          arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
                      }
                  }
      
                  // Вызываем функцию при инициализации AR
                  arToolkitSource.init(function onReady() {
                      onResize()
                  });
      
                  // Вызываем функцию на resize ивент веб-страницы
                  window.addEventListener('resize', function () {
                      onResize()
                  });	
      
                  // Инициализируем AR контекст под камеру, паттерны, баркод 3х3
                  arToolkitContext = new THREEx.ArToolkitContext({
                      cameraParametersUrl: 'data/camera_para.dat',
                      detectionMode: 'mono_and_matrix',
                      matrixCodeType: "3x3",
                      maxDetectionRate: 60,
                      canvasWidth: 640,
                      canvasHeight: 480
                  });
      
                  // Обновляем матрицу проекции камеры после окончания инициализации
                  arToolkitContext.init(function onCompleted() {
                      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
                  });
      
                  // Создаём главную группу для всех 3D объектов
                  mainContainer = new THREE.Group();
                  
                  // Массив имён файлов .patt. Массив заполняется в порядке добавления маркеров
                  // если вместо .patt был добавлен баркод, на его место в массив добавляется пустая строка
                  const patternNames = [`,
  `];
                  // Maссив баркодов, заполняется одновременно с массивом паттернов
                  // если вместо баркода был добавлен .patt, на его место в массив добавляется -1
                  const patternBarcode = [`,
  `];
                  // Массив типов контента для каждого маркера, заполняется значиями: изображение, модель, видео
                  const modes = [`,
  `];
                  // Массив файлов моделей, если нет модели будет добавлена пустая строка
                  const modelFiles = [`,
  `];
                  // Массив файлов изображений, если нет изображения будет добавлена пустая строка
                  const imageFiles = [`,
  `];
                  // Массив файлов видео, если нет видео будет добавлена пустая строка
                  const videoFiles = [`,
  `];
                  // Массив файлов аудио, если нет аудио будет добавлена пустая строка
                  const audioFiles = [`,
  `];
                  // Массив опций повтора аудио и видео контента, по дефолту для всех будет false
                  const repeatOptions = [`,
  `];
  
                  // Создаём массив для всех маркеров
                  const markerRoots = [];
                  for (let i = 0; i < `,
  `; i++) {
                        markerRoots[i] = new THREE.Group();
                  }
  
                  // Проходимся по каждому маркеру из массива и добавляем его в главный контейнер 
                  for (let i = 0; i < `,
  `; i++) {
                    mainContainer.add(markerRoots[i]);

                    // Если текущий маркер это баркод, создаём AR контроллер под баркод
                    // если текущий маркер это паттерн, аналогично создаём AR контроллер под паттерн
                    if (patternBarcode[i] === -1) {
                        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                            type: 'pattern', patternUrl: patternNames[i],
                        })
                    } else {
                        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoots[i], {
                            type: "barcode", barcodeValue: patternBarcode[i],
                        })
                    }
    
                    // Используем switch для работы с каждым отдельным случаем контента
                    switch (modes[i]) {
                        // Если контент под маркер это модель
                        case 'model':
                            function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }
                            function onError(xhr) { console.log('An error happened'); }
    
                            // Загружаем MTL модель
                            new THREE.MTLLoader()
                                .load(\`\${modelFiles[i]}.mtl\`, function (materials) {
                                    materials.preload();
                                    // Загружаем OBJ модель
                                    new THREE.OBJLoader()
                                        .setMaterials(materials)
                                        .load(\`\${modelFiles[i]}.obj\`, function (group) {
                                            let mesh0 = group.children[0];
                                            mesh0.material.side = THREE.DoubleSide;
                                            // Уменьшаем модель в 20 раз
                                            mesh0.scale.set(0.05, 0.05, 0.05);
                                            // Поворачивает модель на -90 градусов по оси OX
                                            mesh0.rotation.set(Math.PI / -2, 0, 0);
                                            // Добавляем модель в контейнер
                                            markerRoots[i].add(mesh0);
    
                                        }, onProgress, onError);
                                });
                            break;
                        // Если контент под маркер это изображение
                        case 'image':
                            // Объявляем плоскость под изображение
                            let geometry1 = new THREE.PlaneBufferGeometry(1, 1, 4, 4);
                            // Загружаем изображение
                            let loader = new THREE.TextureLoader();
                            let texture = loader.load(\`\${imageFiles[i]}\`, render);
                            let material1 = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                            mesh1 = new THREE.Mesh(geometry1, material1);
                            // Поворачиваем плоскость
                            mesh1.rotation.x = -Math.PI / 2;
                            // Добавляем плоскость в контейнер
                            markerRoots[i].add(mesh1);
                            break;
                        // Если контент под маркер это видео
                        case 'video':
                            // Объявляем плоскость под видео
                            let geometry2 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
                            // Объявляем и загружаем видео
                            let video = document.createElement('video');
                            video.src = \`\${videoFiles[i]}\`;
                            // Устанавлием видео на автоповтор в зависимости от значения в массиве
                            if (repeatOptions[i]) {
                                video.addEventListener('ended', () => {
                                    video.play();
                                })
                            }
                            // Добавляем видео в массив аудио контента
                            audioContent.push(video);
                            // Перенаправляем текстуру из видео в материал для плоскости
                            let texture2 = new THREE.VideoTexture(video);
                            texture2.minFilter = THREE.LinearFilter;
                            texture2.magFilter = THREE.LinearFilter;
                            texture2.format = THREE.RGBFormat;
                            let material2 = new THREE.MeshBasicMaterial({ map: texture2 });
                            mesh2 = new THREE.Mesh(geometry2, material2);
                            // Поворачиваем плоскость
                            mesh2.rotation.x = -Math.PI / 2;
                            // Добавляем плоскость в контейнер
                            markerRoots[i].add(mesh2);
                            break;
                        default:
                            // Если никакого контента добавленно не было, добавляем обычный красный куб 1х1х1
                            let mesh = new THREE.Mesh(
                                new THREE.CubeGeometry(1, 1, 1),
                                new THREE.MeshBasicMaterial({ color: 'red', transparent: true, opacity: 0.5 })
                            );
                            mesh.position.y = 0.5;
                            markerRoots[i].add(mesh);
                            break;
                    }
    
                    // Если имеются аудио файлы настраиваем их и добавляем в массив аудио контента
                    if (audioFiles[i]) {
                        const listener = new THREE.AudioListener();
                        camera.add(listener);
                        // Создаём глобальный аудио источник
                        const sound = new THREE.Audio(listener);
                        audioContent.push(sound);
                        // Загружаем аудио и добавляем его в буфер
                        const audioLoader = new THREE.AudioLoader();
                        audioLoader.load(\`\${audioFiles[i]}\`, function (buffer) {
                            sound.setBuffer(buffer);
                            // Устанавлием аудио на автоповтор в зависимости от значения в массиве
                            if (repeatOptions[i]) {
                                sound.setLoop(true);
                            }
                            // Уменьшаем громкость в 2 раза
                            sound.setVolume(0.5);
                        });
                    }
                }
    
                // Добавляем главный контейнер на сцену
                scene.add(mainContainer);
            }
    
            // Обновляем AR контент на каждый кадр
            function update() {
                if (arToolkitSource.ready !== false) {
                    arToolkitContext.update(arToolkitSource.domElement);
                }
            }
    
            // Рендерим сцену на каждый кадр
            function render() {
                renderer.render(scene, camera);
            }
    
            // Запускаем цикл анимации
            function animate(time) {
                // Запускаем цикл в петлю
                requestAnimationFrame(animate);
                deltaTime = clock.getDelta();
                totalTime += deltaTime;
                update();
                render();
            }

            // Функция запуска всего аудио контента приложения
            const playAudioContent = () => {
                // Убираем ивент с функции, чтобы она не вызвалась при последующих нажатиях
                window.removeEventListener('touchstart', playAudioContent);
                // Проходимся по массиву аудио контента и запускаем каждый контент
                for (let i = 0; i < audioContent.length; i++) {
                    audioContent[i].play();
                }
            };
            // Вызываем функцию по нажатию на экран
            window.addEventListener('touchstart', playAudioContent)
    
        </script>
    
    </body>
    
    </html>
  `,
];

export { outputHTMLConfig };
