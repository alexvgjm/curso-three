import { BoxGeometry, Color, InstancedMesh, Matrix4, Mesh, MeshStandardMaterial, Raycaster, Vector2, Vector3 } from 'three'
import { SceneManager } from './SceneManager'
import './style.css'
import { resources, loadAllResources, getModelCopy } from './resources'
import Stats from 'three/examples/jsm/libs/stats.module.js'

const stats = new Stats()
document.body.appendChild(stats.dom)

await loadAllResources()
console.log(resources.models['casa'])

const canvas = document.querySelector('canvas')!

const sceneManager = SceneManager.getInstance(canvas)


const geometry = new BoxGeometry()
const material = new MeshStandardMaterial()

const cubos = new InstancedMesh(geometry, material, 9*9*9)
const matrix = new Matrix4()
let i = 0;
// Necesario establecer al menos un color antes del primer render
// para que Three.js cree el atributo en sí.
cubos.setColorAt(0, new Color())
for (let x = -4; x <= 4; x++) {
    for (let y = -4; y <= 4; y++) {
        for (let z = -4; z <= 4; z++, i++) {
            matrix.identity()
            matrix.scale(new Vector3(1 + Math.random(), 1  + Math.random(), 1 + Math.random()))
            matrix.setPosition(x * 2, y * 2, z * 2)
            cubos.setMatrixAt(i, matrix)
        }
    }
}
sceneManager.scene.add(cubos)

const suelo = new Mesh(
    new BoxGeometry(10, 1, 10),
    new MeshStandardMaterial()
)
suelo.receiveShadow = true
suelo.position.setY(-9)

sceneManager.scene.add(suelo)
sceneManager.cameraManager.camera.lookAt(cubos.position)

const raycaster = new Raycaster()

let mx = 0
let my = 0

window.addEventListener('mousemove', (event) => {
    mx = ( event.clientX / window.innerWidth ) * 2 - 1;
    my = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

sceneManager.addUpdatable({
    update() {
        raycaster.setFromCamera(new Vector2(mx, my), sceneManager.cameraManager.camera)

        const intersecciones = raycaster.intersectObjects([cubos])

        if (intersecciones.length > 0) {
            const instanceId = intersecciones[0].instanceId!
            cubos.setColorAt(instanceId, new Color('red'))
            cubos.instanceColor!.needsUpdate = true
            console.log(instanceId)
        }

        stats.update()
    }
})