import { PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class CameraManager {
    camera: PerspectiveCamera

    private orbitControls: OrbitControls

    constructor(scene: Scene, canvas: HTMLCanvasElement) {
        this.camera = new PerspectiveCamera()
        this.camera.position.setZ(8)
        this.camera.position.setY(2)
        scene.add(this.camera)

        this.orbitControls = new OrbitControls(this.camera, canvas)
        this.orbitControls.enableDamping = true
    }

    update(delta: number) {
        this.orbitControls.update(delta)
    }
}