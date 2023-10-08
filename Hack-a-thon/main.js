import * as THREE from "https://cdn.skypack.dev@0.129/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import{GLTFLoader}from "https://cdn.skypack.dev.three@0.129.0/examples/jsm/loaders/GLTFLoader.js";





const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let objToRender ='eye';

const loader = new GLTFLoader();

loader.load(
    `models/${objToRender}/planet1.gltf`,
    function(gltf){
        object = gltf.scene;
        scene.add(object);
    },
    function(xhr){
        console/log((xhr.loaded/xhr.total*100)+'% loaded');
    },
    function(error){
        console.error(error);
    }
);

const renderer =new  THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "dino"? 25: 500;

const topLight = new THREE.DirectionalLight(0*ffffff,1);
topLight.position.set(500,500,500)
topLight.castShadow=true;
scene.add(topLight);

const ambientLight =new THREE.AmbientLight(0*333333, objToRender === "dino"?5:1);
scene.add(ambientLight);


if (objToRender === "dino") {
    controls = new OrbitControls(camera, renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement
  
    //Make the eye move
    if (object && objToRender === "eye") {
      //I've played with the constants here until it looked good 
      object.rotation.y = -3 + mouseX / window.innerWidth * 3;
      object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
  }
  
  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  //add mouse position listener, so we can make the eye move
  document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  //Start the 3D rendering
  animate();