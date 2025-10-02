import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
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
        cubo.position.set(x * 2, 0, z * 2) // Espaciado de 2 unidades
        cubos.push(cubo)
        sceneManager.scene.add(cubo)
    }
}

sceneManager.cameraManager.camera.lookAt(cubos[4].position)

sceneManager.addUpdatable({
    /**
     * EJERCICIO 1:
     * Hacer que un cubo se mueva de arriba a abajo como si estuviera
     * en un fluido
     */
    update(delta) {
        
    }
})