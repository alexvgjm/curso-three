import { GLTFLoader } from "three/examples/jsm/Addons.js"

import houseGlbURL from './assets/models/house.glb?url'
import type { Object3D } from "three"

type ResourcesDict = {
    models: { [key: string]: Object3D }
}

export const resources: ResourcesDict = {
    models: {}
}
// Repasito de async/await
// https://www.youtube.com/watch?v=5WVD_Iz_i14


const gltfLoader = new GLTFLoader()

export async function loadAllResources() {
    const gltf = await gltfLoader.loadAsync(houseGlbURL)
    resources.models['casa'] = gltf.scene.children[0]
}