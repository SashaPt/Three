import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("container");

const scene = new THREE.Scene();

//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = container.offsetWidth / 2;
let mouseY = container.offsetHeight / 2;

let move;
let controls;

const loader = new GLTFLoader();

loader.load(
  "../files/model.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(container.offsetWidth, container.offsetHeight);

//Add the renderer to the DOM
container.appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 8;

controls = new OrbitControls(camera, renderer.domElement);

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
});

document.querySelector("canvas").addEventListener("mousedown", () => {
  move = true;
});
document.querySelector("canvas").addEventListener("mouseup", () => {
  move = false;
});

document.onmousemove = (e) => {
  if (move) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
};

animate();
