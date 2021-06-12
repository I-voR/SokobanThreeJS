/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

export default class Cube extends Mesh {
    constructor(size, x, z) {
        super(
            new BoxGeometry(10, 10, 10),
            new MeshBasicMaterial( { color: 'blue'} )
        )
        this.position.set(x, size / 2 , z)
    }
}
