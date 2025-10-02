import { AmbientLight, DirectionalLight, Scene } from "three"

export class LightManager {

    ambient: AmbientLight
    sun: DirectionalLight

    constructor(scene: Scene) {
        this.ambient = new AmbientLight(0xffffff, 0.2)
        this.sun = new DirectionalLight(0xffffff, 0.5)
        scene.add(this.sun)
        scene.add(this.ambient)
    }
}