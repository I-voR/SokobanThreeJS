/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

export default class Collider extends Mesh {
    constructor() {
        super(
            new BoxGeometry(30, 1, 30),
            new MeshBasicMaterial( {
                transparent: true,
                opacity: 0
            } )
        )
    }
}
