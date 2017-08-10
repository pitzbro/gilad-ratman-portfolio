import topographies from '@/services/topography/topographies'

//--------------------------------------------------

if (!Detector.webgl) Detector.addGetWebGLMessage();

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

// var renderer, container, stats;
var renderer = new THREE.WebGLRenderer();
var container;

var camera, scene, controls;
// var camera, scene;
var cameraOrtho, sceneRenderTarget;

var uniformsNoise, uniformsNormal, uniformsTerrain,
  heightMap, normalMap,
  quadTarget;

var directionalLight, pointLight;

var terrain;

var textureCounter = 0;

var animDelta = 0, animDeltaDir = 1;
var lightVal = 0, lightDir = 1;

var clock = new THREE.Clock();

var updateNoise = true;

var animateTerrain = false;

var mlib = {};


function onWindowResize(event) {

  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

}


export default {
  name: 'topography',
  data() {
    return {

      //Project
      alias: null,
      name: null,
      loaded: false,

      //animation
      mainAnimation: null,

      //topography
      topographyIntensity: 1.5,
      vectorHeight: null,
      topographyHeight: 375,

      //textures
      texturesRepeat: 5,
      loadingManager: null,
      terrain: null,
      textureLoader: null,

      diffuseTexture1: null,
      diffuseTexture2: null,
      detailTexture: null,

      //fog
      fogIntensity: 2000,
      fogColor: '0x000000',

      //camera
      cameraHeight: 1500,
      cameraTilt: 1500,
      cameraPan: -1500,

      //lights
      ambientLight: null,
      directionalLight: null,
      pointLight: null,
      lightAmbientColor: '0x111111',
      lightDirectionalColor: '0xffffff',
      lightPointColor: '0xff4400',
    }
  },
  methods: {
    init() {

      scene = null;

      container = this.$refs.topographyContainer;

      // SCENE (RENDER TARGET)

      sceneRenderTarget = new THREE.Scene();

      cameraOrtho = new THREE.OrthographicCamera(SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -10000, 10000);
      cameraOrtho.position.z = 100;

      sceneRenderTarget.add(cameraOrtho);

      // CAMERA

      camera = new THREE.PerspectiveCamera(40, SCREEN_WIDTH / SCREEN_HEIGHT, 2, 4000);
      camera.position.set(this.cameraPan, this.cameraHeight, this.cameraTilt);

      controls = new THREE.OrbitControls(camera);
      controls.target.set(0, 0, 0);

      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;

      controls.keys = [65, 83, 68];

      // SCENE (FINAL)

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x050505, this.fogIntensity, 4000);

      //set fog color
      scene.fog.color.setHex(this.fogColor);

      // LIGHTS

      // var ambientLight = new THREE.AmbientLight(0x111111);
      scene.add(this.ambientLight);
      // scene.add(new THREE.AmbientLight(lightAmbientColor));

      // directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
      this.directionalLight.position.set(500, 2000, 0);
      scene.add(this.directionalLight);

      // pointLight = new THREE.PointLight(0xff4400, 1.5);
      this.pointLight.position.set(0, 0, 0);
      scene.add(this.pointLight);

      // seting lights colors
      // this.ambientLight.color.setHex(this.lightAmbientColor);
      // this.directionalLight.color.setHex(this.lightDirectionalColor);
      // this.pointLight.color.setHex(this.lightPointColor);


      // HEIGHT + NORMAL MAPS

      var normalShader = THREE.NormalMapShader;

      var rx = 256, ry = 256;
      var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

      heightMap = new THREE.WebGLRenderTarget(rx, ry, pars);
      heightMap.texture.generateMipmaps = false;

      normalMap = new THREE.WebGLRenderTarget(rx, ry, pars);
      normalMap.texture.generateMipmaps = false;

      uniformsNoise = {

        time: { value: 1.0 },
        scale: { value: this.vectorHeight },
        offset: { value: new THREE.Vector2(0, 0) }

      };

      uniformsNormal = THREE.UniformsUtils.clone(normalShader.uniforms);

      uniformsNormal.height.value = 0.05;
      uniformsNormal.resolution.value.set(rx, ry);
      uniformsNormal.heightMap.value = heightMap.texture;

      var vertexShader = document.getElementById('vertexShader').textContent;

      // TEXTURES

      var that = this;

      this.loadingManager = new THREE.LoadingManager(function () {
        terrain.visible = true;
        that.loaded = true;
      });

      this.loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

      };

      this.textureLoader = new THREE.TextureLoader(this.loadingManager);

      var specularMap = new THREE.WebGLRenderTarget(2048, 2048, pars);
      specularMap.texture.generateMipmaps = false;

      this.diffuseTexture1 = this.textureLoader.load(`/static/img/textures/terrain/${this.alias}/001.jpg`);
      this.diffuseTexture2 = this.textureLoader.load(`/static/img/textures/terrain/${this.alias}/002.jpg`);
      this.detailTexture = this.textureLoader.load(`/static/img/textures/terrain/${this.alias}/003.jpg`);

      this.diffuseTexture1.wrapS = this.diffuseTexture1.wrapT = THREE.RepeatWrapping;
      this.diffuseTexture2.wrapS = this.diffuseTexture2.wrapT = THREE.RepeatWrapping;
      this.detailTexture.wrapS = this.detailTexture.wrapT = THREE.RepeatWrapping;
      specularMap.texture.wrapS = specularMap.texture.wrapT = THREE.RepeatWrapping;

      // TERRAIN SHADER

      var terrainShader = THREE.ShaderTerrain["terrain"];

      uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);

      uniformsTerrain['tNormal'].value = normalMap.texture;
      uniformsTerrain['uNormalScale'].value = 3.5;

      uniformsTerrain['tDisplacement'].value = heightMap.texture;

      uniformsTerrain['tDiffuse1'].value = this.diffuseTexture1;
      uniformsTerrain['tDiffuse2'].value = this.diffuseTexture2;
      uniformsTerrain['tSpecular'].value = specularMap.texture;
      uniformsTerrain['tDetail'].value = this.detailTexture;

      uniformsTerrain['enableDiffuse1'].value = true;
      uniformsTerrain['enableDiffuse2'].value = true;
      uniformsTerrain['enableSpecular'].value = true;

      uniformsTerrain['diffuse'].value.setHex(0xffffff);
      uniformsTerrain['specular'].value.setHex(0xffffff);

      uniformsTerrain['shininess'].value = 30;

      uniformsTerrain['uDisplacementScale'].value = 375;

      uniformsTerrain['uRepeatOverlay'].value.set(6, 6);

      var params = [
        ['heightmap', document.getElementById('fragmentShaderNoise').textContent, vertexShader, uniformsNoise, false],
        ['normal', normalShader.fragmentShader, normalShader.vertexShader, uniformsNormal, false],
        ['terrain', terrainShader.fragmentShader, terrainShader.vertexShader, uniformsTerrain, true]
      ];

      for (var i = 0; i < params.length; i++) {

        var material = new THREE.ShaderMaterial({

          uniforms: params[i][3],
          vertexShader: params[i][2],
          fragmentShader: params[i][1],
          lights: params[i][4],
          fog: true
        });

        mlib[params[i][0]] = material;

      }


      var plane = new THREE.PlaneBufferGeometry(SCREEN_WIDTH, SCREEN_HEIGHT);

      quadTarget = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      quadTarget.position.z = -500;
      sceneRenderTarget.add(quadTarget);

      // TERRAIN MESH

      var geometryTerrain = new THREE.PlaneBufferGeometry(6000, 6000, 256, 256);

      THREE.BufferGeometryUtils.computeTangents(geometryTerrain);

      terrain = new THREE.Mesh(geometryTerrain, mlib['terrain']);
      terrain.position.set(0, -125, 0);
      terrain.rotation.x = -Math.PI / 2;
      terrain.visible = false;
      scene.add(terrain);

      // RENDERER

      // renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(scene.fog.color);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      container.appendChild(renderer.domElement);

      // STATS

      // stats = new Stats();
      // container.appendChild(stats.dom);

      // EVENTS

      onWindowResize();

      window.addEventListener('resize', onWindowResize, false);

      // document.addEventListener('keydown', onKeyDown, false);

    },

    startAnimation() {
      this.mainAnimation = requestAnimationFrame(this.startAnimation);
      this.render();
    },

    stopAnimation() {
      cancelAnimationFrame(this.mainAnimation);
    },

    render() {
      var delta = clock.getDelta();

      if (terrain.visible) {

        controls.update();

        var time = Date.now() * 0.001;

        var fLow = 0.1, fHigh = 0.8;

        lightVal = THREE.Math.clamp(lightVal + 0.5 * delta * lightDir, fLow, fHigh);

        var valNorm = (lightVal - fLow) / (fHigh - fLow);

        // scene.fog.color.setHSL(0.1, 0.5, lightVal);
        scene.fog.color.setHex(this.fogColor);

        renderer.setClearColor(scene.fog.color);

        this.directionalLight.intensity = THREE.Math.mapLinear(valNorm, 0, 1, 0.1, 1.15);
        this.pointLight.intensity = THREE.Math.mapLinear(valNorm, 0, 1, 0.9, 1.5);

        uniformsTerrain['uNormalScale'].value = THREE.Math.mapLinear(valNorm, 0, 1, 0.6, 3.5);

        if (updateNoise) {

          animDelta = THREE.Math.clamp(animDelta + 0.00075 * animDeltaDir, 0, 0.05);
          uniformsNoise['time'].value += delta * animDelta;

          uniformsNoise['offset'].value.x += delta * 0.05;

          uniformsTerrain['uOffset'].value.x = 4 * uniformsNoise['offset'].value.x;

          quadTarget.material = mlib['heightmap'];
          renderer.render(sceneRenderTarget, cameraOrtho, heightMap, true);

          quadTarget.material = mlib['normal'];
          renderer.render(sceneRenderTarget, cameraOrtho, normalMap, true);

        }

        renderer.render(scene, camera);

      }
    },

    getCurTopography() {
      this.alias = this.$route.params.alias;
      return this.alias? topographies.find(topography => topography.alias === this.alias) : null
    },

    setCurTopography(topography) {
      if (topography) {

        for (var key in topography) {
          this[key] = topography[key];
        }

        this.init();

        //Set Topography
        this.vectorHeight.set(this.topographyIntensity, this.topographyIntensity);
        uniformsTerrain['uDisplacementScale'].value = this.topographyHeight;

        //Fog
        scene.fog.near = this.fogIntensity;
        scene.fog.color.setHex(this.fogColor);

        //Textures
        uniformsTerrain['uRepeatOverlay'].value.set(this.texturesRepeat, this.texturesRepeat);
        this.diffuseTexture1 = this.textureLoader.load("/static/img/textures/terrain/001/001.jpg");
        this.diffuseTexture2 = this.textureLoader.load("/static/img/textures/terrain/001/002.jpg");
        this.detailTexture = this.textureLoader.load("/static/img/textures/terrain/001/003.jpg");

        terrain.material.needsUpdate = true;

        //Set Camera Position
        camera.position.set(this.cameraPan, this.cameraHeight, this.cameraTilt);

        //Set Lights Color
        this.ambientLight.color.setHex(this.lightAmbientColor);
        this.directionalLight.color.setHex(this.lightDirectionalColor);
        this.pointLight.color.setHex(this.lightPointColor);

        this.startAnimation();

      } else {
        this.loaded = false;
        this.stopAnimation();
      }

    }

  },

  watch: {
    '$route' (to, from) {
      var curtopography = this.getCurTopography();
      this.setCurTopography(curtopography);
    }
  },
  
  mounted() {
    this.vectorHeight = new THREE.Vector2(this.topographyIntensity, this.topographyIntensity);
    this.ambientLight = new THREE.AmbientLight(0x111111);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
    this.pointLight = new THREE.PointLight(0xff4400, 1.5);


    var curtopography = this.getCurTopography();
    this.setCurTopography(curtopography);   
  }
}
