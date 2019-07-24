<template>
  <div ref="demo1"></div>
</template>

<script>
import * as THREE from "three";
import dat from "dat.gui";
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
  methods: {
    init() {
      let { initMesh, controls } = this;
      // const gui = new dat.GUI() // gui监测器
      // gui.add(controls, 'rotationSpeed', 0, 0.5)
      initMesh();
    },
    initMesh() {
      this.scene = new THREE.Scene(); // 场景
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ); // 相机.视场，长宽比，近面，远面
      this.camera.position.x = -20;
      this.camera.position.y = 40;
      this.camera.position.z = 30;
      this.camera.lookAt(this.scene.position);

      this.renderer = new THREE.WebGLRenderer({ antialias: true }); // 渲染器
      this.renderer.setSize(window.innerWidth, window.innerHeight - 100);
      this.renderer.shadowMap.enabled = true; // 开启阴影

      let axes = new THREE.AxesHelper(20); // 坐标轴

      let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10); // 生成平面
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 材质
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.receiveShadow = true;

      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = -4;
      this.cube.position.y = 3;
      this.cube.position.z = 0;
      this.cube.castShadow = true;

      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;

      this.scene.add(axes); // 场景添加坐标轴

      //this.myObjects.push(axes)
      // this.scene.add(plane) // 向该场景中添加物体
      // this.scene.add(this.cube)
      this.scene.add(spotLight);

      this.createBuilding();
      this.createWaterPipe(-8, -4, 0);
      this.createWaterPipe(-7, -4, 0);
      this.createWaterPipe(-6, -4, 0);
      this.createWaterPipe(-5, 4, 0);
      this.createWaterPipe(-4, 4, 0);
      this.createWaterPipe(-3, 4, 0);

      this.createWaterPipe(-8, -4, 0);
      this.createWaterPipe(-7, -4, 0);
      this.createWaterPipe(-6, -4, 0);
      this.createWaterPipe(-5, 4, 0);
      this.createWaterPipe(-4, 4, 0);
      this.createWaterPipe(-3, 4, 0);

      this.$refs.demo1.append(this.renderer.domElement);
      this.renderScene();
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
      this.createCubeWall(8, 0.1, 8, 0, cubeMaterial, 0, 0, 0); //地板
      this.createCubeWall(8, 0.1, 8, 0, cubeMaterial, 0, 2, 0); //地板
      this.createCubeWall(8, 0.1, 8, 0, cubeMaterial, 0, 4, 0); //地板
      this.createCubeWall(8, 0.1, 8, 0, cubeMaterial, 0, 6, 0); //地板
      this.createCubeWall(8, 0.1, 8, 0, cubeMaterial, 0, 8, 0); //地板
    },
    createWaterPipe(x_offset, y_offset, z_offset) {
      x_offset += 2;
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 0,
            z: 8.15
          },

          {
            x: 0 + x_offset,
            y: 6,
            z: 8.15
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 7,
            z: 7.9
          },
          {
            x: 0 + x_offset,
            y: 7,
            z: 4
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 7,
            z: 4
          },
          {
            x: 0 + x_offset,
            y: 4.8 + y_offset,
            z: 4
          }
        ],
        0.7
      );
      this.createLineChanel(
        [
          {
            x: 0 + x_offset,
            y: 4.8 + y_offset,
            z: 3.9
          },
          {
            x: 0 + x_offset,
            y: 4.8 + y_offset,
            z: -4
          }
        ],
        0.7
      );

      // this.createShower(0 + x_offset, 4.8 + y_offset, 3);
      // this.createShower(0 + x_offset, 4.8 + y_offset, 2);
      // this.createShower(0 + x_offset, 48 + y_offset, 1);
      // this.createShower(0 + x_offset, 4.8 + y_offset, 0);
      // this.createShower(0 + x_offset, 4.8 + y_offset, -1);
      // this.createShower(0 + x_offset, 4.8 + y_offset, -2);
      // this.createShower(0 + x_offset, 4.8 + y_offset, -3);
      //  this. createPipe({
      //     x: 0 + x_offset,
      //     y: 4.8 + y_offset,
      //     z: 4
      //   });
      //   this.createPipe({
      //     x: 0 + x_offset,
      //     y: 7,
      //     z: 8
      //   });
      //  this. createPipe2({
      //     x: 0 + x_offset,
      //     y: 7,
      //     z: 4
      //   });
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
        color: 0x000000,
        transparent: true,
        side: THREE.DoubleSide, //两面可见
        opacity: 0.5,
        map: temp
      });
      temp.dispose();
      var mesh = new THREE.Mesh(geom, wireFrameMat);
      wireFrameMat.dispose();
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

      // var spGroup = new THREE.Object3D();
      // var material = new THREE.MeshBasicMaterial({
      //   color: 0xff0000,
      //   transparent: false,
      //   opacity: 0.2,
      //   side: THREE.DoubleSide //两面可见
      // });
      // points.forEach(function(point) {
      //   var spGeom = new THREE.SphereGeometry(0.2);
      //   var spMesh = new THREE.Mesh(spGeom, material);
      //   spMesh.position.copy(point);
      //   spGroup.add(spMesh);
      //   // spMesh.dispose();
      //   // spMesh.dispose();
      // });

      // // add the points as a group to the scene
      // this.scene.add(spGroup);
      // this.myObjects.push(spGroup)
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
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;
      this.rafId = requestAnimationFrame(this.renderScene);
      renderer.render(scene, camera);
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