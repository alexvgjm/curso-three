import { ArrowHelper, Object3D, Vector3 } from "three";

export class AxisHelper extends Object3D {
    constructor(size = 1) {
        super()
        const arrowX = new ArrowHelper(new Vector3(1, 0, 0), new Vector3(0, 0, 0), size, 0xff0000, 0.2)
        const arrowY = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), size, 0xffff00, 0.2)
        const arrowZ = new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), size, 0x6699ff, 0.2)
        this.add(arrowX, arrowY, arrowZ)
    }
}