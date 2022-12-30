window.addEventListener('DOMContentLoaded', app);

const textarr = [
  '手牵手压马路。',
  '一起坐摩天轮。',
  '一起去教堂。',
  '一起养一条小狗。',
  '一起看日出日落。',
  '一起吃冰淇淋。',
  '一起看烟火。',
  '一起看电影。',
  '一起做顿饭。',
  '一起堆雪人。',
  '送对方惊喜。',
  '一起去捡贝壳。',
  '一起喝醉。',
  '一起种一种花。',
  '吃完饭一起刷碗。',
  '一起淋雨。',
  '一起唱首歌。',
  '一起看一次演唱会。',
  '一起去天台看星星。',
  '互相写信。',
  '穿情侣装逛街',
  '一起喝咖啡',
  '一起爬山',
  '一起坐过山车',
  '一起滑冰',
  '一起放风筝',
  '一起进鬼屋',
  '一起买一张彩票',
  '比赛啃骨头',
  '教我一项我的特长',
  '整晚不睡觉打电话唠嗑',
  '一起去放生',
  '一起在河里放纸船',
  '一起放孔明灯。',
  '一起去寺庙里祈福',
  '一起在树下埋下我们的约定',
  '一起陪“我们”过生日',
  '一起去一趟海南的“天涯海角”',
  '一起赏月',
  '一起去看樱花',
  '雨中漫步',
  '一起荡秋千',
  '念故事哄我入睡',
  '一起沿铁轨走',
  '在树上刻下我们的约定',
  '看我打一场篮球比赛',
  '一起露营一次',
  '为你做一次早餐',
  '为你做一个蛋糕',
  '为你系围脖',
  '一起吃好吃的吃到吐',
  '一起去看海',
  '唱歌给我听',
  '一起去我的小学，初中，高中',
  '一起去你的小学，初中，高中',
  '比赛吃西瓜，用勺吃的那种',
  '一起打雪仗',
  '一起去当义工一天',
  '看我打台球',
  '一起撮合成一对情侣',
  '背靠背听歌',
  '一起打扑克',
  '扶老人过马路',
  '看冰灯',
  '靠我肩膀睡觉',
  '比赛吹气球',
  '一起包一次饺子',
  '一起坐一辆从没做过的车，在不认识的地方下车到处逛',
  '一起去一次敬老院',
  '一起去看海豚',
  '把我打扮成女生一次',
  '和你玩捉迷藏',
  '以喝交杯酒的方式喝东西',
  '去拍一次婚纱照',
  '用沙子做堡垒',
  '背着我走一段路',
  '一起去划船',
  '帮你吹头发',
  '一起坐火车去一个当天就能回来的地方',
  '一起去吃自助餐，必须扶墙进去扶墙出来',
  '去所在城市的美丽景点玩',
  '用泥巴做两个小人，我们的形象',
  '为我刮胡子',
  '在冬天共用一副手套',
  '生病的时候要陪着我',
  '一起去捡落叶',
  '一起照相',
  '打气球游戏帮我赢东西',
  '一起去孤儿院一次',
  '比赛磕瓜子',
  '假装当陌生人一天',
  '为我织一件东西',
  '教我玩一个我会的游戏',
  '专心为我做一件事，哪怕很不起眼',
  '为我做一件我很不喜欢的事',
  '在公共场合下一起喝娃哈哈',
  '在我的父母面前保护你一次',
  '为我挡酒',
  '在朋友面前大方的介绍我',
  '奖励臭老婆今天8点洗澡.',
  '奖励臭老婆不洗澡.',
  '免洗碗一次',
  '免洗衣一次',
  // '给老婆吹头发一次',
  '白头偕老❤'
];

for (let i = 0; i < 100; i++) {
  textarr.push('谢谢惠顾!!!');
}

function randomOne(arr = textarr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function app() {
  var scene,
    camera,
    renderer,
    present,
    raycaster = new THREE.Raycaster(),
    intersects,
    pointer = new THREE.Vector2(),
    init = () => {
      // setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      renderer.setClearColor(0xf98686, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      // present
      present = new Present(10, 7);
      scene.add(present.mesh);

      // ambient light
      let ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight.name = 'Ambient Light';
      scene.add(ambientLight);
      const light = new THREE.PointLight(0xffffff);
      light.position.set(50, 50, 50);
      scene.add(light);
      // directional light
      let directionLight = new THREE.DirectionalLight(0xffffff, 0.7);
      directionLight.name = 'Directional Light';
      directionLight.position.set(10, 20, 0);
      directionLight.castShadow = true;
      directionLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      scene.add(directionLight);

      // camera
      camera.position.set(30, 30, 30);
      camera.lookAt(scene.position);

      // render
      document.body.appendChild(renderer.domElement);
      renderScene();
    },
    renderScene = () => {
      if (present) present.openLoop();

      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
    },
    adjustWindow = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    updateRaycaster = e => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      intersects = raycaster.intersectObjects(present.mesh.children, true);
      intersects = intersects.filter(child => child.object.type == 'Mesh');
    },
    presentActive = e => {
      if (present && (intersects.length || e.keyCode == 32)) present.open();
    },
    presentHover = e => {
      updateRaycaster(e);
      renderer.domElement.style.cursor = intersects.length
        ? 'pointer'
        : 'default';
    };

  init();
  window.addEventListener('resize', adjustWindow);
  document.addEventListener('click', presentActive);
  window.addEventListener('keydown', presentActive);
  window.addEventListener('mousemove', presentHover, false);
}

class Present {
  constructor(sideWidth = 7, divisions = 5) {
    this.sideWidth = sideWidth;
    this.divisions = divisions;
    this.effectFadeSpeed = 0.02;
    this.effectMoveSpeed = 0.8;
    this.effectRotateSpeed = 0.1;
    this.openSpeed = 4;
    this.openTime = 0;
    this.timeToOpen = 320;
    this.opacity = 0.7;
    this.opening = false;
    this.opened = false;
    this.wireframe = false;
    this.pieces = [];
    const textureLoader = new THREE.TextureLoader();
    const doorColorTexture = textureLoader.load('../public/img/boxcolor.jpg');
    const lineColorTexture = textureLoader.load('../public/img/linecolor.jpg');
    const blowColorTexture = textureLoader.load('../public/img/blowcolor.jpg');
    this.materials = [
      // wrapping
      new THREE.MeshPhongMaterial({
        color: '#ff3821',
        side: THREE.DoubleSide,
        transparent: true,
        wireframe: this.wireframe,
        specular: '#fff', //高光部分的颜色
        shininess: 20, //高光部分的亮度，默认30
        map: doorColorTexture
      }),
      // ribbon
      new THREE.MeshPhongMaterial({
        color: '#a6a3ac',
        side: THREE.DoubleSide,
        transparent: true,
        wireframe: this.wireframe,
        specular: '#fff', //高光部分的颜色
        shininess: 50, //高光部分的亮度，默认30,
        map: lineColorTexture
      }),
      // bow
      new THREE.MeshPhongMaterial({
        color: '#f98686',
        transparent: true,
        wireframe: this.wireframe,
        specular: '#fff', //高光部分的颜色
        shininess: 20, //高光部分的亮度，默认30
        map: blowColorTexture
      })
    ];
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'Present';

    let getTails = () => Math.random() < 0.5,
      randDecimal = (min, max) => Math.random() * (max - min) + min,
      S = this.sideWidth,
      HS = S / 2,
      fracS = S / divisions,
      fracHS = fracS / 2,
      HD = divisions / 2,
      pieceGeo = new THREE.PlaneBufferGeometry(fracS, fracS),
      wrappingMat = this.materials[0],
      wrappingPiece = new THREE.Mesh(pieceGeo, wrappingMat),
      ribbonMat = this.materials[1],
      ribbonPiece = new THREE.Mesh(pieceGeo, ribbonMat);

    wrappingPiece.receiveShadow = true;
    ribbonPiece.receiveShadow = true;

    for (let s = 0; s < 6; ++s) {
      // place sides
      let side = new THREE.Object3D();
      switch (s) {
        // bottom
        case 0:
          side.position.set(0, -HS, 0);
          side.rotation.x = Math.PI / 2;
          break;
        // back
        case 1:
          side.position.set(0, 0, -HS);
          side.rotation.y = Math.PI;
          break;
        // left
        case 2:
          side.position.set(-HS, 0, 0);
          side.rotation.y = -Math.PI / 2;
          break;
        // right
        case 3:
          side.position.set(HS, 0, 0);
          side.rotation.y = Math.PI / 2;
          break;
        // front
        case 4:
          side.position.set(0, 0, HS);
          break;
        // top
        default:
          side.position.set(0, HS, 0);
          side.rotation.x = -Math.PI / 2;
          break;
      }

      // assemble box
      for (let h = -HD; h < HD; ++h) {
        for (let w = -HD; w < HD; ++w) {
          let isMiddleX = w >= -1 && w <= 0,
            isMiddleY = h >= -1 && h <= 0,
            topOrBottom = s == 0 || s == 5,
            onBow = isMiddleX || (isMiddleY && topOrBottom),
            piece = onBow ? ribbonPiece.clone() : wrappingPiece.clone();

          piece.firstPosition = {
            x: fracS * w + fracHS,
            y: fracS * h + fracHS,
            z: 0
          };
          piece.position.set(piece.firstPosition.x, piece.firstPosition.y, 0);

          // adjust movements while adhereing to star–like direction
          piece.xMoveBias = randDecimal(0.3, 1);
          piece.yMoveBias = randDecimal(0.3, 1);
          piece.zMoveBias = randDecimal(0.3, 1);

          piece.xRotateDir = getTails() ? -1 : 1;
          piece.yRotateDir = getTails() ? -1 : 1;
          piece.zRotateDir = getTails() ? -1 : 1;

          side.add(piece);
          this.pieces.push(piece);
        }
      }
      this.mesh.add(side);
    }

    // add bow
    let bowRad = this.divisions % 2 == 0 ? 4 : 3,
      bowGeo = new THREE.DodecahedronBufferGeometry(bowRad),
      bowMat = this.materials[2];

    this.bow = new THREE.Mesh(bowGeo, bowMat);
    this.bow.castShadow = true;

    this.bow.firstPosition = {
      y: HS + bowRad / 4
    };
    this.bow.position.set(0, this.bow.firstPosition.y, 0);

    this.bow.xMoveDir =
      Math.random() * this.effectMoveSpeed * (getTails() ? -1 : 1);
    this.bow.yMoveDir = 1;
    this.bow.zMoveDir =
      Math.random() * this.effectMoveSpeed * (getTails() ? -1 : 1);

    this.bow.xRotateDir = getTails() ? -1 : 1;
    this.bow.yRotateDir = getTails() ? -1 : 1;
    this.bow.zRotateDir = getTails() ? -1 : 1;

    this.bow.scale.y = 0.6;
    this.mesh.add(this.bow);
    this.mesh.position.y = -5;
  }
  open() {
    if (!this.opening && !this.opened) this.opening = true;
  }
  openLoop() {
    if (this.opening) {
      let openSpeed = this.openSpeed,
        sineCurve = n => 0.03 * Math.sin((8 * Math.PI * n) / 100),
        scaleBy = 1 - sineCurve(this.openTime);

      this.mesh.scale.x = scaleBy;
      this.mesh.scale.y = scaleBy;
      this.mesh.scale.z = scaleBy;

      this.openTime += this.openSpeed;
      // 开关
      if (this.openTime >= this.timeToOpen) {
        this.openTime = 0;
        this.opening = false;
        this.opened = true;
      }
    } else if (this.opened) {
      let moveSpeed = this.effectMoveSpeed,
        rotateSpeed = this.effectRotateSpeed,
        divs = this.divisions;

      // pieces
      if (this.opacity > 0) {
        this.opacity -= this.effectFadeSpeed;

        this.pieces.forEach((e, i) => {
          let angleXZ = -45 + (90 * (i % divs)) / (divs - 1),
            angleY =
              -45 + (90 / (divs - 1)) * Math.floor((i % divs ** 2) / divs);

          e.position.x +=
            moveSpeed * Math.sin((angleXZ * Math.PI) / 180) * e.xMoveBias;
          e.position.y +=
            moveSpeed * Math.sin((angleY * Math.PI) / 180) * e.yMoveBias;
          e.position.z +=
            moveSpeed * Math.cos((angleXZ * Math.PI) / 180) * e.zMoveBias;

          e.rotation.x += rotateSpeed * e.xRotateDir;
          e.rotation.y += rotateSpeed * e.yRotateDir;
          e.rotation.z += rotateSpeed * e.zRotateDir;
        });

        // bow
        this.bow.position.x += moveSpeed * this.bow.xMoveDir;
        this.bow.position.y += moveSpeed * this.bow.yMoveDir;
        this.bow.position.z += moveSpeed * this.bow.xMoveDir;

        this.bow.rotation.x += rotateSpeed * this.bow.xRotateDir;
        this.bow.rotation.y += rotateSpeed * this.bow.yRotateDir;
        this.bow.rotation.z += rotateSpeed * this.bow.zRotateDir;
      } else {
        this.opacity = 0;

        this.restore();
      }

      this.materials.forEach(e => {
        e.opacity = this.opacity;
      });
    }
  }
  restore() {
    this.opened = false;
    this.opacity = 1;

    $('#fade').modal({
      fadeDuration: 100
    });
    setTimeout(() => {
      $('.text')[0].innerHTML = randomOne();
      $('.close-modal').on('click', () => {
        $('.text')[0].innerHTML = '***';
        // pieces
        this.pieces.forEach(e => {
          e.position.set(
            e.firstPosition.x,
            e.firstPosition.y,
            e.firstPosition.z
          );
          e.rotation.set(0, 0, 0);
        });
        // bow
        this.bow.position.set(0, this.bow.firstPosition.y, 0);
        this.bow.rotation.set(0, 0, 0);
      });
    }, 200);
  }
}
