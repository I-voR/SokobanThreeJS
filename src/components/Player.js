/* eslint-disable require-jsdoc */
// import { MD2Loader } from './MD2Loader.js'
/* import { Mesh, TextureLoader, MeshBasicMaterial } from 'https://cdn.skypack.dev/three@0.129.0'
import { MD2Loader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/MD2Loader.js'*/

import { Mesh, TextureLoader, MeshBasicMaterial } from 'three'
import { MD2Loader } from './MD2Loader.js'

import player1Tex from '../assets/player1.jpg'
import player2Tex from '../assets/player2.jpg'

export default class Player {
    constructor(scene, manager, isPlayer) {
        this.isPlayer = isPlayer
        this.scene = scene
        this.mesh = null
        this.manager = manager
        this.geometry = null
    }

    load() {
        new MD2Loader(this.manager).load(
            PlayerMD2,
            geometry => {
                console.log(geometry.animations)
                this.geometry = geometry

                this.mesh = new Mesh(geometry, new MeshBasicMaterial({
                    map: new TextureLoader().load(this.isPlayer ? player1Tex : player2Tex),
                    morphTargets: true
                }))
                
                this.scene.add(this.mesh)
            },
        )
    }

    unload() {
        this.scene.remove(this.mesh)
    }

    update() {
        'pass'
    }
}
