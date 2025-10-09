import { Clock, PCFSoftShadowMap, Scene, Vector2, WebGLRenderer } from "three";
import { WebGPURenderer } from "three/webgpu";
import { LightManager } from "./LightManager";
import { CameraManager } from "./CameraManager";
import { BloomPass, CSS2DRenderer, EffectComposer, OutputPass, RenderPass, SAOPass, SMAAPass, SSAOPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { resources } from "./resources";


export interface Updatable {
    update: (delta: number) => void 
}

/**
 * POSIBILIDAD 1: Clase que gestiona todos los recursos de una escena
 * 
 *   Dos sabores:
 *     1. La clase inicializa todo (incluyendo el renderer)
 *     2. La clase recibe todo por constructor
 * 
 * BONUS: hemos implementado el "antipatrón" Singleton.
 *  · Uno de los pocos usos justificados que encontraremos en El Mundo Real™
 * 
 *  · La idea es imposibilitar segundas instancias de recursos que pueden ser
 *    especialmente problemáticos de limpiar.
 * 
 *  · Podemos paliar todos sus contras si nos aseguramos de evitar side-effects
 *    y de no hardwirear todo la aplicación con esto.
 * 
 *  · No es un patrón necesario si conocemos bien otras técnicas como la inyección
 *    de dependencias, aunque tampoco son mutuamente excluyentes: se puede usar
 *    Singleton e inyectar su instancia, evitando hardwiring y que más tarde
 *    se pueda eliminar el Singleton sin mucho problema.
 * 
 *  · El mayor problema de Singleton es la testabilidad, pero no es común testar lógica 
 *    de renderizado. 
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
    renderer: WebGLRenderer
    css2dRenderer: CSS2DRenderer
    reloj: Clock
    cameraManager: CameraManager
    lightManager: LightManager

    private composer: EffectComposer
    private updatables: Updatable[]

    private constructor(canvas: HTMLCanvasElement) {
        this.scene = new Scene()
        this.reloj = new Clock(true)
        this.updatables = []
        this.renderer = new WebGLRenderer({ canvas: canvas })
        this.renderer.shadowMap.enabled = true

        this.renderer.setAnimationLoop(() => this.update())
        this.css2dRenderer = new CSS2DRenderer()
        document.body.appendChild(this.css2dRenderer.domElement)

        this.lightManager = new LightManager(this.scene)
        this.cameraManager = new CameraManager(this.scene, canvas)
    
        this.composer = new EffectComposer(this.renderer)
        const renderPass = new RenderPass(this.scene, this.cameraManager.camera)
        const sao = new SAOPass(this.scene, this.cameraManager.camera)
        sao.params.saoIntensity = 0.0004
        sao.params.saoKernelRadius = 5
        // Anti-aliasing
        const aa = new SMAAPass()
        const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0.55)
        const outputPass = new OutputPass()
        this.composer.addPass(renderPass)
        // this.composer.addPass(bloomPass)
        this.composer.addPass(sao)
        this.composer.addPass(aa)
        this.composer.addPass(outputPass)

        this.updatables.push(this.cameraManager)
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    addUpdatable(updatable: Updatable) {
        this.updatables.push(updatable)
    }

    update() {
        const delta = this.reloj.getDelta()
        this.composer.render()
        // this.renderer.render(this.scene, this.cameraManager.camera)
        this.css2dRenderer.render(this.scene, this.cameraManager.camera)
        
        for (const updatable of this.updatables) {
            updatable.update(delta)
        }
    }
    
    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.composer.setSize(window.innerWidth, window.innerHeight)
        this.css2dRenderer.setSize(window.innerWidth, window.innerHeight)
        this.cameraManager.camera.aspect = window.innerWidth / window.innerHeight
        this.cameraManager.camera.updateProjectionMatrix()
        this.composer.render()
        this.css2dRenderer.render(this.scene, this.cameraManager.camera)
    }
}