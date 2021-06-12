/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    TextureLoader
} from 'three'

import wallTex from '../assets/wall.png'
import boxTex from '../assets/box.png'
import goalTopTex from '../assets/goal_top.png'
import goalSideTex from '../assets/goal_side.png'

export default class Cuboid extends Mesh {
    constructor(size, x, z, type) {
        let material
        let height

        switch (type) {
        case 0: // Wall
            material = new MeshBasicMaterial({
                map: new TextureLoader().load(wallTex),
                side: DoubleSide,
                wireframe: false
            })
            height = size
            break
        case 1: // Box
            material = new MeshBasicMaterial({
                map: new TextureLoader().load(boxTex),
                side: DoubleSide,
                wireframe: false
            })
            height = size
            break
        case 2: // Goal
            material = [
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalSideTex),
                    side: DoubleSide,
                    wireframe: false
                }),
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalSideTex),
                    side: DoubleSide,
                    wireframe: false
                }),
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalTopTex),
                    side: DoubleSide,
                    wireframe: false
                }),
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalTopTex),
                    side: DoubleSide,
                    wireframe: false
                }),
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalSideTex),
                    side: DoubleSide,
                    wireframe: false
                }),
                new MeshBasicMaterial({
                    map: new TextureLoader().load(goalSideTex),
                    side: DoubleSide,
                    wireframe: false
                })
            ]
            height = size / 12
            break
        case 3: // Collider
            material = new MeshBasicMaterial({
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 0
            })
            height = 1
            break
        }

        super(
            new BoxGeometry(size, height, size),
            material
        )
        this.type = type
        this.position.set(x, height / 2 , z)
    }

    update(bool) {
        if (this.type === 2) {
            this.scale.setY(bool ? 0.5 : 1)
        }
    }
}
