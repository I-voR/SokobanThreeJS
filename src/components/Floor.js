/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
} from 'three'

export default class Floor extends Mesh {
    constructor(w, h) {
        console.log(w, h)
        super(
            new PlaneGeometry(w, h),
            new MeshBasicMaterial( { color: "#FFFFFF", side: DoubleSide } )
        )
        this.rotation.x = Math.PI / 2
    }
}