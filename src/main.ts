import { BoxGeometry, Color, Material, Mesh, MeshStandardMaterial, Raycaster, Vector2 } from 'three'
import { SceneManager } from './SceneManager'
import './style.css'

const canvas = document.querySelector('canvas')!

const sceneManager = SceneManager.getInstance(canvas)

const cubos: Mesh[] = []
// Crear 3x3 cubos en una cuadrícula horizontal
for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
        const cubo = new Mesh(
            new BoxGeometry(),
            new MeshStandardMaterial()
        )
        cubo.castShadow = true
        cubo.receiveShadow = true
        cubo.position.set(x * 2, 0, z * 2) // Espaciado de 2 unidades
        cubos.push(cubo)
        sceneManager.scene.add(cubo)
    }
}

const suelo = new Mesh(
    new BoxGeometry(10, 1, 10),
    new MeshStandardMaterial()
)
suelo.receiveShadow = true
suelo.position.setY(-1)

sceneManager.scene.add(suelo)

sceneManager.cameraManager.camera.lookAt(cubos[4].position)

const max = 3;
let direccion = 1;

const raycaster = new Raycaster()

sceneManager.addUpdatable({
    /**
     * EJERCICIO 1:
     * Hacer que un cubo se mueva de arriba a abajo como si estuviera
     * en un fluido
     */
    update(delta) {
        let time = Date.now() * 0.001;
        const cubo = cubos[0]
        cubo.position.y = Math.sin(time);
        cubo.rotation.x += 0.001;
        cubo.rotation.y += 0.001;
    }
})

let mx = 0
let my = 0

window.addEventListener('mousemove', (event) => {
    mx = ( event.clientX / window.innerWidth ) * 2 - 1;
    my = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

sceneManager.addUpdatable({
    update() {
        raycaster.setFromCamera(new Vector2(mx, my), sceneManager.cameraManager.camera)

        const intersecciones = raycaster.intersectObjects(cubos)

        if (intersecciones.length > 0) {
            const cubo = intersecciones[0].object as Mesh
            (cubo.material as MeshStandardMaterial).color = new Color('red')
        }
    }
})



window.addEventListener('click', () => {
    (cubos[3].material as MeshStandardMaterial).color = new Color('red')
})