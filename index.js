import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement); // add canvas to body

// set up camera
const fov = 75; // field of view in degrees
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// set up scene
const scene = new THREE.Scene();
const controls =new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// set up geometry
const geo = new THREE.IcosahedronGeometry(1.0, 16);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x333333,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

// run render
let animate = (t = 0) => {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

let main = () => {
    animate();
}

main();