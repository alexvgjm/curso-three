import { ArrowHelper, BoxGeometry, Color, Mesh, MeshStandardMaterial, PointLightHelper, Raycaster, SphereGeometry, Vector2, Vector3 } from 'three'
import { SceneManager } from './SceneManager'
import './style.css'
import { resources, loadAllResources, getModelCopy } from './resources'
import { CSS2DObject, EffectComposer, SSAOPass } from 'three/examples/jsm/Addons.js'
import { AxisHelper } from './AxisHelper'

await loadAllResources()
console.log(resources.models['casa'])

const canvas = document.querySelector('canvas')!
const sceneManager = SceneManager.getInstance(canvas)



sceneManager.lightManager.addPointLight(new Vector3(2, 0.5, 3), 2)
const lightHelper = new PointLightHelper(sceneManager.lightManager.pointsLight[0])
sceneManager.scene.add(lightHelper)



const cubos: Mesh[] = []
// Crear 3x3 cubos en una cuadrícula horizontal
for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
        const cubo = new Mesh(
            new SphereGeometry(0.5, 64, 32),
            new MeshStandardMaterial({ map: resources.textures['bricks'] }) // PBR
        )
        cubo.castShadow = true
        cubo.receiveShadow = true
        cubo.position.set(x * 2, 0, z * 2) // Espaciado de 2 unidades
        cubos.push(cubo)
        sceneManager.scene.add(cubo)
    }
}

;(cubos[4].material as MeshStandardMaterial).emissive = new Color('#ffaaaa')

const loquesea = { a: 3, b: 7 }
const alias = loquesea

const suelo = new Mesh(
    new BoxGeometry(20, 1, 10),
    new MeshStandardMaterial()
)
suelo.receiveShadow = true
suelo.position.setY(-1)

sceneManager.scene.add(suelo)

resources.models['casa'].position.setY(-0.5)
resources.models['casa'].traverse((obj) => {
    obj.castShadow = true
})

const casa1 = getModelCopy('casa', true)
const casa2 = getModelCopy('casa', true)
sceneManager.scene.add(casa1)
sceneManager.scene.add(casa2)
casa1.position.setX(-6)
casa2.position.setX(6)

const mat1 = (casa1.children[0] as Mesh).material as MeshStandardMaterial

mat1.color = new Color('red')

sceneManager.cameraManager.camera.lookAt(cubos[4].position)

////////////////////////////////////
//  PUNTO DE INFO DE LA CASA (2D)
////////////////////////////////////
const infoDiv = document.querySelector<HTMLElement>('.house-info-point')!
const infoPoint2dObj = new CSS2DObject(infoDiv)
infoPoint2dObj.position.setX(-3)
infoPoint2dObj.position.setY(2)
infoPoint2dObj.position.setZ(-4)
sceneManager.scene.add(infoPoint2dObj)
////////////////////////////////////


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


const axis = new AxisHelper(5)
axis.position.setY(3)
sceneManager.scene.add(axis)



window.addEventListener('click', () => {
    (cubos[3].material as MeshStandardMaterial).color = new Color('red')
})