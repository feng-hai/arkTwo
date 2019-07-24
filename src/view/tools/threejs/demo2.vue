<template>
  <!-- Div which will hold the Output -->
  <div>
    <div id="WebGL-output"></div>
    <div id="testDiv" style="width:100px;height:100px;"></div>
  </div>
</template>
<script>
import * as THREE from "three";

const OrbitControls = require("three-orbitcontrols");
// require("three/examples/js/utils/SceneUtils.js")
export default {
  data: () => ({
    controls: {
      //   scene: null,
      //   camera: null,
      //   renderer: null,
      //   rotationSpeed: 0.02,
      //   controls: null,
      //   SCREEN_WIDTH: window.innerWidth,
      //   SCREEN_HEIGHT: window.innerHeight,
      //   VIEW_ANGLE: 45,
      //   ASPECT: window.innerWidth / window.innerHeight,
      //   NEAR: 0.1,
      //   FAR: 10000,
      //   materialArrayA: [],
      //   materialArrayB: [],
      //   matArrayA: [],
      //   matArrayB: []
    }
  }),
  created() {
    this.$nextTick(() => {
      this.rafId = null;
      (this.myObjects = []), this.init();
    });
  },
  mounted() {},
  beforeDestroy() {
    console.log("开始清楚缓存");
    this.clearScene();
    THREE.Cache.clear();
    cancelAnimationFrame(this.rafId);
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.myObjects = [];
    console.log("清楚缓存结束");
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        this.VIEW_ANGLE,
        this.ASPECT,
        this.NEAR,
        this.FAR
      );
      //camera.position.set(0, 1000, 1800);
      //camera.lookAt(scene.position);
      //camera.lookAt(0, 0, 0);
      this.camera.position.x = 130;
      this.camera.position.y = 140;
      this.camera.position.z = 130;
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);
      //监听鼠标、键盘事件
    },
    initControls() {
      this.controls = new OrbitControls(this.camera);
      this.controls.addEventListener("change", this.render);
      this.controls.autoRotate = false; //自动旋转开关
      this.controls.autoRotateSpeed = 2;
    },
    //3.渲染器
    initRender() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      //renderer.setClearColor();
      //  renderer.setClearColor(new THREE.Color(0xEEEEEE));

      this.renderer.setClearColor(new THREE.Color(0xffffff));
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      // if (Detector.webgl)
      // renderer = new THREE.WebGLRenderer({
      //   antialias: true
      // });
      // // else
      // //   renderer = new THREE.CanvasRenderer();
      // //设置渲染器的大小为窗口的内宽度，也就是内容区的宽度。
      // renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      // container = document.getElementById('ThreeJS');
      // container.appendChild(renderer.domElement);
      // renderer.setClearColor(0x4682B4, 1.0);
    },
    //4.平面
    initPlane() {
      // create the ground plane
      var planeGeometry = new THREE.PlaneGeometry(60, 60);
      var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.2
      });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // rotate and position the plane
      plane.rotation.x = (-90 * Math.PI) / 180;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      // add the plane to the scene
      plane.receiveShadow = true;
      this.scene.add(plane);
    },
    initAxisHelper() {
      //坐标轴辅助
      var axes = new THREE.AxesHelper(500);
      this.scene.add(axes);
    },
    //5.物体对象
    initGeometry() {
      // create a cube
      var cubeGeometry = new THREE.BoxGeometry(14, 4, 4);
      var cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xafc0ca,
        wireframe: true
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // position the cube
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      cube.rotation.y = 90;
      // add the cube to the scene
      this.scene.add(cube);
      this.myObjects.push(cube)
    },
    //6.光源
    initLight() {
      // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不同
      // A start, 第二个参数是光源强度
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //模拟远处类似太阳的光源
      directionalLight.position.set(40, 60, 10).normalize();
      this.scene.add(directionalLight);
      //A end
      var ambient = new THREE.AmbientLight(0xffffff); //AmbientLight,影响整个场景的光源
      // ambient.position.set(0, 0, 0);
      this.scene.add(ambient);
      // var spotLight = new THREE.SpotLight(0xffffff);
      // spotLight.position.set(40, 60, -10);
      // spotLight.castShadow = true;
      // scene.add(spotLight);

      // var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
      //   light.position.set( 0, -20, 0 );
      //   scene.add(light);
    },
    //创建墙
    createCubeWall(width, height, depth, angle, material, x, y, z) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += (angle * Math.PI) / 180; //-逆时针旋转,+顺时针
      cube.castShadow = true;
      this.scene.add(cube);
      this.myObjects.push(cube);
      //   this.initLabel(cube);
    },
    initLine(inPoints) {
      var geometry = new THREE.Geometry();

      //  Build an array of points
      const segmentLength = 1;
      const nbrOfPoints = 100;
      const points = [];
      inPoints.forEach(item => {
        points.push(item.x, item.y, item.z);
      });

      // for (let i = 0; i < nbrOfPoints; i++) {
      //   points.push(i * segmentLength, 10, 0);
      // }
      // for (let i = 10; i < nbrOfPoints; i++) {
      //   points.push(100, i * segmentLength, 0);
      // }
      // for (let i = 0; i < inPoints; i++) {
      //   geometry.vertices.push(new THREE.Vector3(inPoints[i].x, inPoints[i].y, inPoints[i].z));
      // }
      // for (var j = 0; j < Math.PI; j += 2 * Math.PI / 100) {
      //   var v = new THREE.Vector3(Math.cos(j), Math.sin(j), 0);
      //   geometry.vertices.push(v);
      // }

      var line = new MeshLine();
      line.setGeometry(points);

      // Build an array of points
      // const segmentLength = 1;
      // const nbrOfPoints = 10;
      // const points = [];
      // for (let i = 0; i < nbrOfPoints; i++) {
      //   points.push(i * segmentLength, 10, 0);
      // }

      // Build the geometry
      // const line = new MeshLine();
      // line.setGeometry(points);
      // const geometry = line.geometry;

      // Build the material with good parameters to animate it.
      const material = new MeshLineMaterial({
        lineWidth: 0.4,
        color: "#E0FFFF",
        transparent: true,
        dashArray: 1, // always has to be the double of the line
        dashOffset: 0, // start the dash at zero
        dashRatio: 0.75 // visible length range min: 0.99, max: 0.5
      });

      // Build the Mesh
      lineMesh = new THREE.Mesh(line.geometry, material);
      lineMesh.position.y += 1;

      // ! Assuming you have your own webgl engine to add meshes on scene and update them.
      this.scene.add(lineMesh);
    },
    // ! Called each frame
    update() {
      // Check if the dash is out to stop animate it.
      //   if (
      //     lineMesh.material &&
      //     lineMesh.material.uniforms.dashOffset.value < -2
      //   ) {
      //     lineMesh.material.uniforms.dashOffset.value = 0;
      //   }
      //console.log(lineMesh.material.uniforms.dashOffset.value)
      // Decrement the dashOffset value to animate the path with the dash.
      //   if (lineMesh.material)
      //     lineMesh.material.uniforms.dashOffset.value -= 0.01;
    },
    //返回墙对象
    returnWallObject(width, height, depth, angle, material, x, y, z) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += (angle * Math.PI) / 180;
      return cube;
    },
    CSS2DRenderer() {
      labelRenderer = new THREE.CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = 0;
    },
    initLabel(object) {
      //   var testDiv = document.getElementById("testDiv");
      //   var moonLabel = new THREE.CSS2DObject(testDiv);
      //   //前两个参数是对于屏幕xy坐标,可以取负数  第三个不清楚,按道理应该是z轴坐标,不知道怎么体现
      //   moonLabel.position.set(0, 8, 0);
      //   object.add(moonLabel);
    },
    //墙上挖门，通过两个几何体生成BSP对象
    createResultBsp(bsp, less_bsp, material) {
      // switch (mat) {
      //   case 1:
      //     var material = new THREE.MeshPhongMaterial({
      //       color: 0x9cb2d1,
      //       specular: 0x9cb2d1,
      //       shininess: 30,
      //       transparent: true,
      //       opacity: 1
      //     });
      //     break;
      //   case 2:
      //     var material = new THREE.MeshPhongMaterial({
      //       color: 0xafc0ca,
      //       specular: 0xafc0ca,
      //       shininess: 30,
      //       transparent: true,
      //       opacity: 1
      //     });
      //     break;
      //   default:
      // }

      var sphere1BSP = new ThreeBSP(bsp);
      var cube2BSP = new ThreeBSP(less_bsp); //0x9cb2d1 淡紫,0xC3C3C3 白灰 , 0xafc0ca灰
      var resultBSP = sphere1BSP.subtract(cube2BSP);
      var result = resultBSP.toMesh(material);
      result.material.flatshading = THREE.FlatShading;
      result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
      result.geometry.computeVertexNormals();
      result.material.needsUpdate = true; //更新纹理
      result.geometry.buffersNeedUpdate = true;
      result.geometry.uvsNeedUpdate = true;
      this.scene.add(result);
    },
    createdoor() {
      var material = new THREE.MeshBasicMaterial({
        color: 0xcccccc
      });
      // 墙面4   带门的面
      var wall = returnWallObject(10, 6, 1, 0, material, 0, 3, 20);
      // 门框
      var door_cube = returnWallObject(9, 5.5, 1, 0, material, 0, 2.5, 20);
      createResultBsp(wall, door_cube, material);

      //茶色：0x58ACFA   透明玻璃色：0XECF1F3
      var glass_material = new THREE.MeshBasicMaterial({
        color: 0xecf1f3
      });
      glass_material.opacity = 0.6;
      glass_material.transparent = true;
      createCubeWall(5, 5, 1, 0, glass_material, -2.5, 3, 20);
      createCubeWall(5, 5, 1, 0, glass_material, 2.5, 3, 20);
    },
    //创建房间布局
    createLayout() {
      // 墙面1 立方体比较长的面  左一
      var cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x009e60
      });
      createCubeWall(16, 1, 1, 0, cubeMaterial, 0, 0, 0); //测试
      createCubeWall(80, 1, 80, 0, cubeMaterial, 0, 0, 0); //地板
      // add all the rubik cube elements
      var mats = [];
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0x009e60
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0x009e60
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0x0051ba
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0x0051ba
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xffd500
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xffd500
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xff5800
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xff5800
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xc41e3a
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xc41e3a
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xffffff
        })
      );
      mats.push(
        new THREE.MeshBasicMaterial({
          color: 0xffffff
        })
      );

      var faceMaterial = new THREE.MeshFaceMaterial(mats);
      createCubeWall(40, 8, 1, 90, faceMaterial, -20, 4, 0);
      createCubeWall(40, 8, 1, 90, faceMaterial, 20, 4, 0);
      createCubeWall(40, 8, 1, 0, faceMaterial, 0, 4, -20);

      //  createCubeWall(40, 8, 1, 0, faceMaterial, 0, 4, 20);

      // 墙面4   带门的面
      var wall = returnWallObject(40, 8, 1, 0, faceMaterial, 0, 4, 20);
      // 门框
      var door_cube = returnWallObject(10, 6, 2, 0, faceMaterial, 0, 3, 20);
      createResultBsp(wall, door_cube, faceMaterial);

      createdoor();

      // // 墙面2  立方体比较长的面   右一
      // createCubeWall(10, 200, 900, 1, matArrayB, 651, 100, 0);
      // 墙面3 门对面的墙 立方体比较短的面
      // createCubeWall(10, 200, 1310, 1.5, matArrayB, 0, 100, -451);

      // // 墙面4   带门的面
      // var wall = returnWallObject(1310, 200, 10, 0, matArrayB, 0, 100,
      //   455);
      // // 门框
      // var door_cube = returnWallObject(100, 180, 10, 0, matArrayB, 0, 90,
      //   455);
    },
    createBuilding() {
      var cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x009e60,
        transparent: true,
        opacity: 0.2
      });
      this.createCubeWall(180, 1, 80, 0, cubeMaterial, 0, 0, 0); //地板
      this.createCubeWall(180, 1, 80, 0, cubeMaterial, 0, 20, 0); //地板
      this.createCubeWall(180, 1, 80, 0, cubeMaterial, 0, 40, 0); //地板
      this.createCubeWall(180, 1, 80, 0, cubeMaterial, 0, 60, 0); //地板
      this.createCubeWall(180, 1, 80, 0, cubeMaterial, 0, 80, 0); //地板
    },
    generatePoints(points, segments, radius, radiusSegments, closed) {
      // add n random spheres

      var spGroup = new THREE.Object3D();
      var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: false,
        opacity: 0.2,
        side: THREE.DoubleSide //两面可见
      });
      points.forEach(function(point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
      });
      // add the points as a group to the scene
      this.scene.add(spGroup);
      this.myObjects.push(spGroup);
      // use the same points to create a convexgeometry
      var tubeGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        segments,
        radius,
        radiusSegments,
        closed
      );
      // console.log(tubeGeometry,"ddd")
      var tubeMesh = this.createMesh(tubeGeometry);
      //   console.log(tubeMesh)

      // var tubeMesh = new THREE.Mesh(tubeGeometry, material);
      this.scene.add(tubeMesh);
      this.myObjects.push(tubeMesh);
    },
    getTextCanvas(text) {
      var width = 512,
        height = 256;
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#C3C3C3";
      ctx.fillRect(0, 0, width, height);
      ctx.font = 50 + 'px " bold';
      ctx.fillStyle = "#2891FF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2);
      return canvas;
    },
    createMesh(geom) {
      // assign two materials
      //   var meshMaterial = new THREE.MeshNormalMaterial();
      //   var meshMaterial = new THREE.MeshBasicMaterial({
      //     color: 0x000000,
      //     transparent: true,
      //     side: THREE.DoubleSide, //两面可见
      //     opacity: 1
      //     // map: THREE.ImageUtils.loadTexture(
      //     //   "E:项目管理项目管理Threejslearning-threejsassetsmodelsassimpwal69ar_small.jpg"
      //     // )
      //   });

      //   var material = new THREE.MeshPhongMaterial( {
      //     map: THREE.ImageUtils.loadTexture('E:\项目管理\项目管理\Threejs\learning-threejs\assets\models\assimp\wal69ar_small.jpg') ,
      //     side:THREE.DoubleSide,//两面可见
      // } );
      var wireFrameMat = new THREE.MeshPhongMaterial({
        color: 0xbbbbbb,
        transparent: true,
        side: THREE.DoubleSide, //两面可见
        opacity: 1,
        map: new THREE.CanvasTexture(this.getTextCanvas("Leo Test Label"))
      });

      var mesh = new THREE.Mesh(geom, wireFrameMat);
      //wireFrameMat.wireframe = true;

      // create a multimaterial
      //   var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [
      //     meshMaterial,
      //     wireFrameMat
      //   ]);

      return mesh;
    },
    createPipe(inPoint, first, second) {
      var lineTemp = [
        {
          x: inPoint.x,
          y: inPoint.y - 2,
          z: inPoint.z + 0.15
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z - 2
        }
      ];
      var points = [];
      for (var i = 0; i < lineTemp.length; i++) {
        points.push(
          new THREE.Vector3(lineTemp[i].x, lineTemp[i].y, lineTemp[i].z)
        );
      }
      this.generatePoints(points, 140, 1, 10, false);
    },
    createPipe1(inPoint, first, second) {
      var lineTemp = [
        {
          x: inPoint.x,
          y: inPoint.y - 2,
          z: inPoint.z
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 0.15
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 2
        }
      ];
      var points = [];
      for (var i = 0; i < lineTemp.length; i++) {
        points.push(
          new THREE.Vector3(lineTemp[i].x, lineTemp[i].y, lineTemp[i].z)
        );
      }
      this.generatePoints(points, 140, 1, 10, false);
    },
    createPipe2(inPoint, first, second) {
      var lineTemp = [
        {
          x: inPoint.x,
          y: inPoint.y + 2,
          z: inPoint.z
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 0.15
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 2
        }
      ];
      var points = [];
      for (var i = 0; i < lineTemp.length; i++) {
        points.push(
          new THREE.Vector3(lineTemp[i].x, lineTemp[i].y, lineTemp[i].z)
        );
      }
      this.generatePoints(points, 140, 0.8, 10, false);
    },
    createPipe2(inPoint, first, second) {
      var lineTemp = [
        {
          x: inPoint.x,
          y: inPoint.y + 2,
          z: inPoint.z
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 0.15
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z + 2
        }
      ];
      var points = [];
      for (var i = 0; i < lineTemp.length; i++) {
        points.push(
          new THREE.Vector3(lineTemp[i].x, lineTemp[i].y, lineTemp[i].z)
        );
      }
      this.generatePoints(points, 140, 0.8, 10, false);
    },

    createPipe3(inPoint, first, second) {
      var lineTemp = [
        {
          x: inPoint.x,
          y: inPoint.y + 2,
          z: inPoint.z + 0.15
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z
        },
        {
          x: inPoint.x,
          y: inPoint.y,
          z: inPoint.z - 2
        }
      ];
      var points = [];
      for (var i = 0; i < lineTemp.length; i++) {
        points.push(
          new THREE.Vector3(lineTemp[i].x, lineTemp[i].y, lineTemp[i].z)
        );
      }
      this.generatePoints(points, 140, 1, 10, false);
    },
    /*
    创建管道线  tempArray 点的集合  radius管道半径
    */
    createLineChanel(tempArray, radius) {
      var points = [];

      for (var i = 0; i < tempArray.length; i++) {
        points.push(
          new THREE.Vector3(tempArray[i].x, tempArray[i].y, tempArray[i].z)
        );
        // points2.push(new THREE.Vector3(temp[i].x+10, temp[i].y, temp[i].z));
      }
      this.generatePoints(points, 140, radius, 10, false);
    },
    createShower(x, y, z) {
      var geometry = new THREE.CylinderGeometry(1, 0.1, 1, 32);
      var material = new THREE.MeshBasicMaterial({
        color: 0xffff00
      });
      var cylinder = new THREE.Mesh(geometry, material);

      cylinder.position.x = x;
      cylinder.position.y = y;
      cylinder.position.z = z;
      cylinder.rotation.x += (180 * Math.PI) / 180; //-逆时针旋转,+顺时针
      // cylinder.castShadow = true;
      this.scene.add(cylinder);
    this.myObjects.push(cylinder)
    },
    createWaterPipe(x_offset, y_offset, z_offset) {
      x_offset += 20;
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 0,
            z: 80.15
          },

          {
            x: 0 + x_offset,
            y: 6,
            z: 80.15
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 7,
            z: 79
          },
          {
            x: 0 + x_offset,
            y: 7,
            z: 40
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 7,
            z: 40
          },
          {
            x: 0 + x_offset,
            y: 48 + y_offset,
            z: 40
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 48 + y_offset,
            z: 39
          },
          {
            x: 0 + x_offset,
            y: 48 + y_offset,
            z: -40
          }
        ],
        0.7
      );

      this.createShower(0 + x_offset, 48 + y_offset, 30);
      this.createShower(0 + x_offset, 48 + y_offset, 20);
      this.createShower(0 + x_offset, 48 + y_offset, 10);
      this.createShower(0 + x_offset, 48 + y_offset, 0);
      this.createShower(0 + x_offset, 48 + y_offset, -10);
      this.createShower(0 + x_offset, 48 + y_offset, -20);
      this.createShower(0 + x_offset, 48 + y_offset, -30);
      this.createPipe({
        x: 0 + x_offset,
        y: 48 + y_offset,
        z: 40
      });
      this.createPipe({
        x: 0 + x_offset,
        y: 7,
        z: 80
      });
      this.createPipe2({
        x: 0 + x_offset,
        y: 7,
        z: 40
      });
    },
    createTemp() {
      var temp = [
        {
          x: 0,
          y: 7,
          z: 40
        },
        {
          x: 0,
          y: 20,
          z: 40
        },
        {
          x: 0,
          y: 48,
          z: 40
        }
      ];

      var lineTemp1 = [
        {
          x: 0,
          y: 7,
          z: 79
        },
        {
          x: 0,
          y: 7,
          z: 40
        }
      ];

      var lineTemp2 = [
        {
          x: 0,
          y: 0,
          z: 80.15
        },

        {
          x: 0,
          y: 6,
          z: 80.15
        }
      ];

      // var temp1 = [{
      //   x: 0,
      //   y: 63,
      //   z: 40
      // }, {
      //   x: 40,
      //   y: 63,
      //   z: 40
      // }, {
      //   x: 40,
      //   y: 63,
      //   z: -40
      // }, {
      //   x: -40,
      //   y: 63,
      //   z: -40
      // }, {
      //   x: -40,
      //   y: 63,
      //   z: 40
      // }, {
      //   x: 0,
      //   y: 63,
      //   z: 40
      // }];

      // temp2 = temp1.map(item => {

      //   return {
      //     x: item.x,
      //     y: item.y - 20,
      //     z: item.z
      //   };
      // })
      // temp3 = temp1.map(item => {

      //   return {
      //     x: item.x,
      //     y: item.y - 40,
      //     z: item.z
      //   };
      // })
      // temp4 = temp1.map(item => {

      //   return {
      //     x: item.x,
      //     y: item.y - 60,
      //     z: item.z
      //   };
      // })

      // var point2 = [];
      // for (var i = 0; i < temp1.length; i++) {

      //   point2.push(new THREE.Vector3(temp1[i].x, temp1[i].y, temp1[i].z));
      //   // points2.push(new THREE.Vector3(temp[i].x+10, temp[i].y, temp[i].z));
      // }
      //       path — Curve - A path that inherits from the Curve base class（曲线，路径，即管道的形状）
      // tubularSegments — Integer - The number of segments that make up the tube, default is 64（管道分成多少段）
      // radius — Float - The radius of the tube, default is 1（管道的半径）
      // radialSegments — Integer - The number of segments that make up the cross-section, default is 8 （管道口分成多少段，即管道口是几边形）
      // closed — Boolean Is the tube open or closed, default is false （是否闭合管道，首尾相接的意思）

      //createLine(temp);
      //createLine(temp1);
      //createLine(temp2);
      //createLine(temp3);
      // createLine(temp4);

      this.createPipe({
        x: 0,
        y: 40,
        z: 40
      });
      this.createLineChanel(
        [
          {
            x: 0,
            y: 40,
            z: 40
          },
          {
            x: 0,
            y: 40,
            z: 0
          }
        ],
        0.7
      );

      //第一条线横线
      this.createLineChanel(
        [
          {
            x: -20,
            y: 40,
            z: 10
          },
          {
            x: 20,
            y: 40,
            z: 10
          }
        ],
        0.5
      );
      this.createLineChanel(
        [
          {
            x: -20,
            y: 40,
            z: 30
          },
          {
            x: 20,
            y: 40,
            z: 30
          }
        ],
        0.5
      );

      //纵向第一线
      this.createLineChanel(
        [
          {
            x: 10,
            y: 40,
            z: 40
          },
          {
            x: 10,
            y: 40,
            z: 21
          }
        ],
        0.3
      );
      this.createLineChanel(
        [
          {
            x: -10,
            y: 40,
            z: 40
          },
          {
            x: -10,
            y: 40,
            z: 21
          }
        ],
        0.3
      );

      //
      this.createLineChanel(
        [
          {
            x: -10,
            y: 40,
            z: 19
          },
          {
            x: -10,
            y: 40,
            z: 0
          }
        ],
        0.3
      );

      this.createLineChanel(
        [
          {
            x: 10,
            y: 40,
            z: 19
          },
          {
            x: 10,
            y: 40,
            z: 0
          }
        ],
        0.3
      );

      this.createPipe({
        x: 0,
        y: 7,
        z: 80
      });

      this.createPipe1({
        x: 10,
        y: 7,
        z: 80
      });
      this.createPipe2({
        x: 20,
        y: 7,
        z: 80
      });
      this.createPipe3({
        x: 30,
        y: 7,
        z: 80
      });

      this.createPipe2({
        x: 0,
        y: 7,
        z: 40
      });

      // createLineChanel(temp1,0.7)
      // createLineChanel(temp2,0.7)

      // var spline = new THREE.CatmullRomCurve3([
      //   new THREE.Vector3(0, -10, 44),
      //   new THREE.Vector3(0, 5, 44),
      //   new THREE.Vector3(0, 5, 0),
      //   new THREE.Vector3(0, 20, 0),
      //   new THREE.Vector3(0, 30, 0),
      //   new THREE.Vector3(0, 40, 0),
      //   new THREE.Vector3(0, 60, 0),
      //   new THREE.Vector3(0, 80, 0)
      // ]);
      // points = spline.getPoints(7); //细分数为20，从spline曲线上获取系列顶点数据
      // var geometry = new THREE.Geometry(); //声明一个空几何体对象
      // geometry.vertices = points; //顶点坐标添加到geometry对象
      // var material = new THREE.LineBasicMaterial({
      //   color: 0xff0000 //线条颜色
      // }); //材质对象
      // var line = new THREE.Line(geometry, material); //线条模型对象
      // scene.add(line); //线条对象添加到场景中
    },
    createLine(inPoints) {
      //定义材质THREE.LineBasicMaterial . MeshBasicMaterial...都可以
      var material = new THREE.LineBasicMaterial({
        linewidth: 120,
        linecap: "butt",
        color: 0xff0000
      });
      // 空几何体，里面没有点的信息,不想BoxGeometry已经有一系列点，组成方形了。
      var geometry = new THREE.Geometry();
      // 给空白几何体添加点信息，这里写3个点，geometry会把这些点自动组合成线，面。
      for (let i = 0; i < inPoints.length; i++) {
        geometry.vertices.push(
          new THREE.Vector3(inPoints[i].x, inPoints[i].y, inPoints[i].z)
        );
      }

      // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
      // geometry.vertices.push(new THREE.Vector3(0, 5, 0));

      var line = new THREE.Line(geometry, material);
      console.log("test");
      // 加入到场景中
      this.scene.add(line);
      this.myObjects.push(line);
    },
    createGrid() {
      var mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({
          color: 0x999999,
          depthWrite: false
        })
      );
      mesh.rotation.x = -Math.PI / 2;
      this.scene.add(mesh);
      var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);
      this.myObjects.push(grid);
    },
    // once everything is loaded, we run our Three.js stuff.
    init() {
      var that = this;
      // here we'll put the Three.js stuff
      this.initScene();
      this.initCamera();
      this.initControls();

      this.createGrid();

      this.initRender();
      //CSS2DRenderer();
      //initLine();
      this.initLight();
      // initPlane();
      this.initAxisHelper();
      // initGeometry();
      // temp();
      // createTemp();
      //  createWallMaterail();
      // createLayout();
      this.createBuilding();
      this.createWaterPipe(-80, -40, 0);
      this.createWaterPipe(-70, -40, 0);
      this.createWaterPipe(-60, -40, 0);
      that.createWaterPipe(-50, 40, 0);
      that.createWaterPipe(-40, 40, 0);
      that.createWaterPipe(-30, 40, 0);

      // setTimeout(function(){

    //   that.createWaterPipe(-20, -20, 0);
    //   that.createWaterPipe(-10, -20, 0);
    //   that.createWaterPipe(0, -20, 0);
    //   // },50)

    //   //
    //   //  setTimeout(function(){
    //   that.createWaterPipe(10, 0, 0);
    //   that.createWaterPipe(20, 0, 0);
    //   that.createWaterPipe(30, 0, 0);

    //   that.createWaterPipe(40, 20, 0);
    //   that.createWaterPipe(50, 20, 0);
    //   that.createWaterPipe(60, 20, 0);
      //   },150)

      //   this.createShower(5, 5, 5, 1);

      // position and point the camera to the center of the scene
      // camera.position.x = -30;
      // camera.position.y = 40;
      // camera.position.z = -30;
      // camera.lookAt(scene.position);
      document
        .getElementById("WebGL-output")
        .appendChild(this.renderer.domElement);
      this.render();
      this.animate();
    },

    render() {
      //plane.rotation.y = step += 0.01;
      this.renderer.render(this.scene, this.camera);
      this.update();
      //  labelRenderer.render(scene, camera);
    },

    animate() {
      // render using requestAnimationFrame
      this.rafId = requestAnimationFrame(this.animate);
      this.render();
      this.controls.update();
    },
    clearScene() {
      let { controls, cube, scene, camera, renderer } = this;
      console.log(this.myObjects.length);
      // 从scene中删除模型并释放内存
      if (this.myObjects.length > 0) {
        for (var i = 0; i < this.myObjects.length; i++) {
          var currObj = this.myObjects[i];

          // 判断类型
          if (currObj instanceof THREE.Scene) {
            var children = currObj.children;
            for (var i = 0; i < children.length; i++) {
              this.deleteGroup(children[i]);
            }
          } else {
            this.deleteGroup(currObj);
          }
          this.scene.remove(currObj);
        }
      }
      renderer.dispose();
      controls.dispose();
      scene.dispose();
      //  BufferGeometry.dispose();
    },

    // 删除group，释放内存
    deleteGroup(group) {
      //console.log(group);
      if (!group) return;
      // 删除掉所有的模型组内的mesh
      group.traverse(function(item) {
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose(); // 删除几何体
          item.material.dispose(); // 删除材质
        }
      });
    }
  }
};
</script>
