import { Clock, Scene } from "three";
import { WebGPURenderer } from "three/webgpu";
import { LightManager } from "./LightManager";
import { CameraManager } from "./CameraManager";


export interface Updatable {
    update: (delta: number) => void 
}

/**
 * POSIBILIDAD 1: Clase que gestiona todos los recursos de una escena
 * 
 *   Dos sabores:
 *     1. La clase inicializa todo (incluyendo el renderer)
 *     2. La clase recibe todo por constructor
 */
export class SceneManager {
    private static instance: SceneManager

    static getInstance(canvas?: HTMLCanvasElement) {
        if (SceneManager.instance === undefined) {
            if (!canvas) {
                throw new Error("canvas required")
            }
            
            SceneManager.instance = new SceneManager(canvas)
        }

        return SceneManager.instance
    }

    scene: Scene
    renderer: WebGPURenderer
    reloj: Clock
    cameraManager: CameraManager
    lightManager: LightManager

    private updatables: Updatable[]

    private constructor(canvas: HTMLCanvasElement) {
        this.scene = new Scene()
        this.reloj = new Clock(true)
        this.updatables = []
        this.renderer = new WebGPURenderer({ canvas: canvas, forceWebGL: true })
        this.renderer.setAnimationLoop(() => this.update())

        this.lightManager = new LightManager(this.scene)
        this.cameraManager = new CameraManager(this.scene, canvas)
        
        this.updatables.push(this.cameraManager)
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    addUpdatable(updatable: Updatable) {
        this.updatables.push(updatable)
    }

    update() {
        const delta = this.reloj.getDelta()
        this.renderer.render(this.scene, this.cameraManager.camera)
        
        for (const updatable of this.updatables) {
            updatable.update(delta)
        }
    }
    
    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.cameraManager.camera.aspect = window.innerWidth / window.innerHeight
        this.cameraManager.camera.updateProjectionMatrix()
        this.renderer.render(this.scene, this.cameraManager.camera)
    }
}