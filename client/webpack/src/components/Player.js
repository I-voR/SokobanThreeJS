/* eslint-disable require-jsdoc */
import { Mesh, TextureLoader, MeshBasicMaterial } from 'three'
import { MD2Loader } from './MD2Loader.js'

import player1Tex from '../assets/player1.jpg'
import player2Tex from '../assets/player2.jpg'

import player1MD2 from '../assets/player1.md2'
import player2MD2 from '../assets/player2.md2'

export default class Player {
    constructor(scene, manager, isPlayer) {
        this.isPlayer = isPlayer
        this.scene = scene
        this.mesh = null
        this.manager = manager
        this.geometry = null
    }

    load() {
        let model = this.isPlayer ? player1MD2 : player2MD2

        new MD2Loader(this.manager).load(
            model,
            geometry => {
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
