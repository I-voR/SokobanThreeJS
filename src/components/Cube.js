/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    TextureLoader
} from 'three'

export default class Cube extends Mesh {
    constructor(size, x, z, texture, isCrate) {
        super(
            new BoxGeometry(size, size, size),
            new MeshBasicMaterial({
                map: new TextureLoader().load(texture),
                side: DoubleSide,
                wireframe: false,
            })
        )
        this.position.set(x, size / 2 , z)
    }
}
