/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping
} from 'three'

import floorTex from '../assets/floor.png'

export default class Floor extends Mesh {
    constructor(w, h) {
        super(
            new PlaneGeometry(w, h),
            new MeshBasicMaterial( {
                color: '#FFFFFF',
                side: DoubleSide,
                map: new TextureLoader().load(floorTex)
            } )
        )
        this.material.map.wrapS = RepeatWrapping
        this.material.map.wrapT = RepeatWrapping
        this.material.map.repeat.set(w / 4, h / 4)
        this.rotation.x = Math.PI / 2
    }
}