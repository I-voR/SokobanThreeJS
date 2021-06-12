/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping
} from 'three'

import Config from './Config'

import floorTex from '../assets/floor.png'

export default class Floor extends Mesh {
    constructor(w, h) {
        super(
            new PlaneGeometry(w, h),
            new MeshBasicMaterial( {
                side: DoubleSide,
                map: new TextureLoader().load(floorTex)
            } )
        )
        this.material.map.wrapS = RepeatWrapping
        this.material.map.wrapT = RepeatWrapping
        this.material.map.repeat.set(w / Config.map[0].length, h / Config.map.length)
        this.rotation.x = Math.PI / 2
        this.position.set((Config.map[0].length - 1) * Config.size / 2, 0, (Config.map.length - 1) * Config.size / 2)
    }
}