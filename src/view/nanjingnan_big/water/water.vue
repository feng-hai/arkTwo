<template>
  <div ref="demo1"></div>
</template>

<script>
import * as THREE from "three";
import dat from "dat.gui";
const OrbitControls = require("three-orbitcontrols");
export default {
  data: () => ({
    controls: {
      scene: null,
      camera: null,
      renderer: null,
      rotationSpeed: 0.02
    }
  }),
  created() {
    this.$nextTick(() => {
      this.rafId = null;
      (this.myObjects = []), this.init();
    });
  },
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
  props:{
    w:{
      type:Number|String,
      default:window.innerWidth
    },
    h:{
      type:Number|String,
      default: window.innerHeight
    }
  },
  methods: {
    init() {
      let { initMesh, controls } = this;
      // const gui = new dat.GUI() // gui监测器
      // gui.add(controls, 'rotationSpeed', 0, 0.5)
      initMesh();
    },
    initControls() {
      this.controls = new OrbitControls(this.camera);
      // this.controls.addEventListener("change", function(){

      // });
      this.controls.autoRotate = false; //自动旋转开关
      this.controls.autoRotateSpeed = 2;
    },
    initMesh() {
      this.scene = new THREE.Scene(); // 场景
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.w / this.h,
        0.1,
        1000
      ); // 相机.视场，长宽比，近面，远面
      this.camera.position.x = 140;
      this.camera.position.y = 140;
      this.camera.position.z = 130;
      this.camera.lookAt(this.scene.position);
      this.initControls();
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 渲染器
      this.renderer.setSize(this.w, this.h);
      this.renderer.shadowMap.enabled = true; // 开启阴影
      // this.renderer.setClearColor(0xEEEEEE, 0.0);

      let axes = new THREE.AxesHelper(20); // 坐标轴

      // let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10); // 生成平面
      // let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 材质
      // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // plane.rotation.x = -0.5 * Math.PI;
      // plane.position.x = 0;
      // plane.position.y = 0;
      // plane.position.z = 0;
      // plane.receiveShadow = true;

      // let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      // let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      // this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // this.cube.position.x = -4;
      // this.cube.position.y = 3;
      // this.cube.position.z = 0;
      // this.cube.castShadow = true;
      // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不同
      // A start, 第二个参数是光源强度
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //模拟远处类似太阳的光源
      directionalLight.position.set(40, 60, 10).normalize();
      this.scene.add(directionalLight);
      //A end
      var ambient = new THREE.AmbientLight(0xffffff); //AmbientLight,影响整个场景的光源
      // ambient.position.set(0, 0, 0);
      this.scene.add(ambient);
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;

      this.scene.add(axes); // 场景添加坐标轴

      //this.myObjects.push(axes)
      // this.scene.add(plane) // 向该场景中添加物体
      // this.scene.add(this.cube)
      this.scene.add(spotLight);

      this.createBuilding();
      this.createWaterPipe(-80, -40, 0);
      this.createWaterPipe(-70, -40, 0);
      this.createWaterPipe(-60, -40, 0);
      var that = this;
      that.createWaterPipe(-50, 40, 0);
      that.createWaterPipe(-40, 40, 0);
      that.createWaterPipe(-30, 40, 0);

      // setTimeout(function(){

      that.createWaterPipe(-20, -20, 0);
      that.createWaterPipe(-10, -20, 0);
      that.createWaterPipe(0, -20, 0);
      //   // },50)

      //   //
      //   //  setTimeout(function(){
      that.createWaterPipe(10, 0, 0);
      that.createWaterPipe(20, 0, 0);
      that.createWaterPipe(30, 0, 0);

      that.createWaterPipe(40, 20, 0);
      that.createWaterPipe(50, 20, 0);
      that.createWaterPipe(60, 20, 0);

      

      //   },150)

      this.$refs.demo1.append(this.renderer.domElement);
      this.renderScene();
    },

    // function for drawing rounded rectangles
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
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
    //创建墙
    createCubeWall(width, height, depth, angle, material, x, y, z) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += (angle * Math.PI) / 180; //-逆时针旋转,+顺时针
      cube.castShadow = true;
      this.myObjects.push(cube);
      this.scene.add(cube);
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

      // var spritey = this.makeTextSprite(" 第四层 ", {
      //  fontsize:42,
      //   fontface: "Georgia",
      //   borderColor: { r: 0, g: 0, b: 255, a: 1.0 }
      // });
      // spritey.position.set(95, 80, 50);
      // this.scene.add(spritey);
      // var spritey = this.makeTextSprite(" 第三层 ", {
      //   fontsize:42,
      //   fontface: "Georgia",
      //   borderColor: { r: 0, g: 0, b: 255, a: 1.0 }
      // });
      // spritey.position.set(95, 60, 50);
      // this.scene.add(spritey);
      //   var spritey = this.makeTextSprite(" 第二层 ", {
      //   fontsize:42,
      //   fontface: "Georgia",
      //   borderColor: { r: 0, g: 0, b: 255, a: 1.0 }
      // });
      // spritey.position.set(95, 40, 50);
      // this.scene.add(spritey);
    },
    createShower(x, y, z) {
      var geometry = new THREE.CylinderGeometry(1, 0.1, 2, 32);
      var material = new THREE.MeshBasicMaterial({
        color: 0xffff00
      });
      var cylinder = new THREE.Mesh(geometry, material);
      geometry.dispose();
      material.dispose();
      cylinder.position.x = x;
      cylinder.position.y = y;
      cylinder.position.z = z;
      cylinder.rotation.x += (180 * Math.PI) / 180; //-逆时针旋转,+顺时针
      // cylinder.castShadow = true;
      this.scene.add(cylinder);
      this.myObjects.push(cylinder);
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
    createWaterPipe(x_offset, y_offset, z_offset) {
      x_offset += 2;
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

      this.createShower(0 + x_offset, 47 + y_offset, 30);
      this.createShower(0 + x_offset, 47 + y_offset, 20);
      this.createShower(0 + x_offset, 47 + y_offset, 10);
      this.createShower(0 + x_offset, 47 + y_offset, 0);
      this.createShower(0 + x_offset, 47 + y_offset, -10);
      this.createShower(0 + x_offset, 47 + y_offset, -20);
      this.createShower(0 + x_offset, 47 + y_offset, -30);
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
      tempArray = [];
      this.generatePoints(points, 140, radius, 10, false);
      points = [];
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
      var temp = new THREE.CanvasTexture(this.getTextCanvas("Leo Test Label"));

      var wireFrameMat = new THREE.MeshPhongMaterial({
        color: 0xbbbbbb,
        transparent: true,
        side: THREE.DoubleSide, //两面可见
        opacity: 1,
        map: temp
      });
      //temp.dispose();
      var mesh = new THREE.Mesh(geom, wireFrameMat);
      //wireFrameMat.dispose();
      //wireFrameMat.wireframe = true;

      // create a multimaterial
      //   var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [
      //     meshMaterial,
      //     wireFrameMat
      //   ]);

      return mesh;
    },
    generatePoints(points, segments, radius, radiusSegments, closed) {
      // add n random spheres

      var spGroup = new THREE.Object3D();
      var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: false,
        opacity: 1,
        side: THREE.DoubleSide //两面可见
      });
      points.forEach(function(point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
        spGeom.dispose();
        // spMesh.dispose();
      });
      material.dispose();

      // add the points as a group to the scene
      this.scene.add(spGroup);
      this.myObjects.push(spGroup);
      // spGroup.dispose();

      //use the same points to create a convexgeometry
      var sc = new THREE.CatmullRomCurve3(points);
      var tubeGeometry = new THREE.TubeGeometry(
        sc,
        segments,
        radius,
        radiusSegments,
        closed
      );
      // sc.dispose();

      points = [];
      // console.log(tubeGeometry,"ddd")
      var tubeMesh = this.createMesh(tubeGeometry);
      tubeGeometry.dispose();
      //   console.log(tubeMesh)

      // var tubeMesh = new THREE.Mesh(tubeGeometry, material);
      this.scene.add(tubeMesh);
      this.myObjects.push(tubeMesh);
      tubeMesh = null;
    },
    renderScene() {
      let { controls, cube, scene, camera, renderer } = this;
      // cube.rotation.x += controls.rotationSpeed;
      // cube.rotation.y += controls.rotationSpeed;
      // cube.rotation.z += controls.rotationSpeed;
      this.rafId = requestAnimationFrame(this.renderScene);
      renderer.render(scene, camera);
    },

    /* 创建字体精灵 */
 makeTextSprite(message, parameters) {

        if ( parameters === undefined ) parameters = {};

        let fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        /* 字体大小 */
        let fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 18;

        /* 边框厚度 */
        let borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 4;

        /* 边框颜色 */
        let borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

        /* 背景颜色 */
        let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

        /* 创建画布 */
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        /* 字体加粗 */
        context.font = "Bold " + fontsize + "px " + fontface;

        /* 获取文字的大小数据，高度取决于文字的大小 */
        let metrics = context.measureText( message );
        let textWidth = metrics.width;

        /* 背景颜色 */
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";

        /* 边框的颜色 */
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";
        context.lineWidth = borderThickness;

        /* 绘制圆角矩形 */
        this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

        /* 字体颜色 */
        context.fillStyle = "rgba(0, 0, 0, 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        /* 画布内容用于纹理贴图 */
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        let spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
        let sprite = new THREE.Sprite( spriteMaterial );

        console.log(sprite.spriteMaterial);

        /* 缩放比例 */
        sprite.scale.set(10,5,0);

        return sprite;

    },


    clearScene() {
      let { controls, cube, scene, camera, renderer } = this;
      console.log(this.myObjects.length);
      // 从scene中删除模型并释放内存
      if (this.myObjects.length > 0) {
        for (var i = 0; i < this.myObjects.length; i++) {
          var currObj = this.myObjects[i];

          // 判断类型
          if (
            currObj instanceof THREE.Scene 
          
          ) {
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
      //  camera.dispose();
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