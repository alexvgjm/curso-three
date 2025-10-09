import { AmbientLight, CameraHelper, DirectionalLight, DirectionalLightHelper, PointLight, Scene, Vector2, Vector3 } from "three"

export class LightManager {

    ambient: AmbientLight
    sun: DirectionalLight
    scene: Scene
    
    pointsLight: PointLight[] = []

    constructor(scene: Scene) {
        this.ambient = new AmbientLight(0xffffff, 0.2)
        this.sun = new DirectionalLight(0xffffff, 0.5)
        this.sun.castShadow = true
        this.sun.position.set(7, 10, -10)
        this.sun.shadow.bias = -0.0001
        this.sun.shadow.blurSamples = 128
        this.sun.shadow.mapSize = new Vector2(2048, 2048)
        this.sun.shadow.camera.left = -16
        this.sun.shadow.camera.right = 16
        this.sun.shadow.camera.top = 16
        this.sun.shadow.camera.bottom = -16
        this.sun.shadow.camera.updateProjectionMatrix()

        const directionalLightHelper = new DirectionalLightHelper(this.sun)
        const shadowHelper = new CameraHelper(this.sun.shadow.camera)
        this.scene = scene
        // this.scene.add(directionalLightHelper)
        // this.scene.add(shadowHelper)
        // scene.add(this.sun, this.ambient)
    }

    addPointLight(position: Vector3, intensity = 1) {
        const light = new PointLight(0xffffff, intensity)
        light.castShadow = true
        light.position.set(position.x, position.y, position.z)
        this.scene.add(light)
        this.pointsLight.push(light)
    }
}