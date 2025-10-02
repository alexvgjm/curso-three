import { AmbientLight, BoxGeometry, Clock, DirectionalLight, 
    Mesh, MeshStandardMaterial, PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { WebGPURenderer } from "three/webgpu";

/**
 * POSIBILIDAD 1: Clase que gestiona todos los recursos de una escena
 * 
 *   Dos sabores:
 *     1. La clase inicializa todo (incluyendo el renderer)
 *     2. La clase recibe todo por constructor
 */
export class SceneManager {
    scene: Scene
    renderer: WebGPURenderer
    reloj: Clock
    orbitControls: OrbitControls
    camara: PerspectiveCamera

    cubos: Mesh[]

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new Scene()
        this.reloj = new Clock(true)
        this.renderer = new WebGPURenderer({
            canvas: canvas,
            forceWebGL: true
        })
        this.renderer.setAnimationLoop(() => this.update())

        // Crear 3x3 cubos en una cuadrícula horizontal
        this.cubos = [] // En este array guardaremos referencias a los cubos
        for (let x = -1; x <= 1; x++) {
            for (let z = -1; z <= 1; z++) {
                const cubo = new Mesh(
                    new BoxGeometry(),
                    new MeshStandardMaterial()
                )
                cubo.position.set(x * 2, 0, z * 2) // Espaciado de 2 unidades
                this.cubos.push(cubo)
                this.scene.add(cubo)
            }
        }

        const luzAmbiental = new AmbientLight(0xffffff, 0.2)
        const sol = new DirectionalLight(0xffffff, 0.5)
        sol.position.set(1, 2, 3)
        this.scene.add(sol)
        this.scene.add(luzAmbiental)

        this.camara = new PerspectiveCamera()
        this.orbitControls = new OrbitControls(this.camara, canvas)
        this.orbitControls.enableDamping = true

        this.camara.position.setZ(8)
        this.camara.position.setY(2)
        this.camara.lookAt(this.cubos[4].position)
        this.scene.add(this.camara)

        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    update() {
        const delta = this.reloj.getDelta()
        this.cubos[0].rotateY(1 * delta)
        this.renderer.render(this.scene, this.camara)
        this.orbitControls.update(delta)
    }

    
    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camara.aspect = window.innerWidth / window.innerHeight
        this.camara.updateProjectionMatrix()
        this.renderer.render(this.scene, this.camara)
    }

}