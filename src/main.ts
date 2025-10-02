import { AmbientLight, BoxGeometry, Clock, DirectionalLight, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { WebGPURenderer } from 'three/webgpu'

// Escena
const scene = new Scene()

// Geometría y material
const geometria = new BoxGeometry()
const material = new MeshStandardMaterial()

// Crear 3x3 cubos en una cuadrícula horizontal
const cubos: Mesh[] = [] // En este array guardaremos referencias a los cubos
for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
        const cubo = new Mesh(geometria, material)
        cubo.position.set(x * 2, 0, z * 2) // Espaciado de 2 unidades
        cubos.push(cubo)
        scene.add(cubo)
    }
}

const canvas = document.querySelector('canvas')!
const renderer = new WebGPURenderer({
    forceWebGL: true,
    canvas: canvas
})

// Luces
const luzAmbiental = new AmbientLight(0xffffff, 0.2)
const sol = new DirectionalLight(0xffffff, 0.5)
sol.position.set(1, 2, 3)
scene.add(sol)
scene.add(luzAmbiental)

// Cámara
const camara = new PerspectiveCamera()
const orbitControls = new OrbitControls(camara, canvas)
orbitControls.enableDamping = true

camara.position.setZ(8)
camara.position.setY(2)
camara.lookAt(cubos[4].position)
scene.add(camara)

// Dibujar en el canvas lo que ve la cámara
// de la escena concreta
renderer.render(scene, camara)
renderer.setAnimationLoop(update)

function girarUnCubo30GradosY() {
  const y = cubos[1].rotation.y;
  cubos[1].rotation.set(0, y + 3, 0);
  renderer.render(scene, camara);
}

function escalarUnCubo() {
    // EJERCICIO. Al gusto
    cubos[0].scale.add(new Vector3(0.1, 0.1, 0.1));
    renderer.render(scene, camara)
}

const reloj = new Clock(true)
function update() {
    const delta = reloj.getDelta()
    cubos[0].rotateY(1 * delta)
    renderer.render(scene, camara)
    orbitControls.update(delta)
}

// Eventos de los botones (no tocar)
document.querySelector('#btn-ejercicio-1')!
    .addEventListener('click', girarUnCubo30GradosY)
document.querySelector('#btn-ejercicio-2')!
    .addEventListener('click', escalarUnCubo)


function alCambiarTamanoPantalla() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camara.aspect = window.innerWidth / window.innerHeight
    camara.updateProjectionMatrix()
    renderer.render(scene, camara)
}

window.addEventListener('resize', alCambiarTamanoPantalla)
alCambiarTamanoPantalla()
