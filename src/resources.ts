import { GLTFLoader } from "three/examples/jsm/Addons.js"

import houseGlbURL from './assets/models/house.glb?url'
import mercuryImg from './assets/textures/2k_mercury.jpg'
import bricksImg from './assets/textures/bricks.jpg'

import { Color, Texture, TextureLoader, type Mesh, type MeshStandardMaterial, type Object3D } from "three"

type ResourcesDict = {
    textures: { [key: string]: Texture }
    models: { [key: string]: Object3D }
}

export const resources: ResourcesDict = {
    models: {},
    textures: {}
}
// Repasito de async/await
// https://www.youtube.com/watch?v=5WVD_Iz_i14


const gltfLoader = new GLTFLoader()
const textureLoader = new TextureLoader()

export async function loadAllResources() {
    const houseGltf = await gltfLoader.loadAsync(houseGlbURL)
    resources.models['casa'] = houseGltf.scene.children[0]

    const mercuryTexture = await textureLoader.loadAsync(mercuryImg)
    resources.textures['mercury'] = mercuryTexture

    const bricksTexture = await textureLoader.loadAsync(bricksImg)
    resources.textures['bricks'] = bricksTexture
}


export function getModelCopy(modelName: string, cloneMaterial: boolean = false) {
    const model = resources.models[modelName].clone()
    if (cloneMaterial) {
        const mat1 = (model.children[0] as Mesh).material as MeshStandardMaterial
        (model.children[0] as Mesh).material = mat1.clone()
    }
    return model
}