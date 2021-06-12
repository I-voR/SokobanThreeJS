/* eslint-disable require-jsdoc */
import {
    IcosahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    DoubleSide,
} from 'https://cdn.skypack.dev/three@0.129.0'

export default class Ico extends Mesh {
    constructor() {
        super(
            new IcosahedronGeometry(),
            new MeshNormalMaterial( { side:DoubleSide } )
        )
    }
    update() {
        this.rotation.y += 0.01
    }
}
