import { AmbientLight, DirectionalLight, Scene, Vector2 } from "three"

export class LightManager {

    ambient: AmbientLight
    sun: DirectionalLight

    constructor(scene: Scene) {
        this.ambient = new AmbientLight(0xffffff, 0.2)
        this.sun = new DirectionalLight(0xffffff, 0.5)
        this.sun.castShadow = true
        this.sun.position.set(7, 10, -10)
        this.sun.shadow.bias = -0.0001
        this.sun.shadow.blurSamples = 128
        scene.add(this.sun)
        scene.add(this.ambient)
    }
}