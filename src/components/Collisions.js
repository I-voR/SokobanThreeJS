/* eslint-disable require-jsdoc */

import Config from './Config'

export default class Collisions {
    constructor() {
        this.size = Config.size
        this.width = Config.width
        this.height = Config.height
    }

    detectWall(posX, posZ, dir) {
        let x1 = parseInt(posX / this.size + (this.width) / 2)
        let z1 = parseInt(posZ / this.size + (this.height) / 2)
        let x2 = x1, z2 = z1

        switch (dir) {
        case 'u':
            x2--
            break
        case 'l':
            z2++
            break
        case 'd':
            x2++
            break
        case 'r':
            z2--
            break
        }

        return Config.map[z2][x2] !== '#'
    }

    detectCollisions(object1, object2){
        object1.geometry.computeBoundingBox()
        object2.geometry.computeBoundingBox()
        object1.updateMatrixWorld()
        object2.updateMatrixWorld()
        
        let box1 = object1.geometry.boundingBox.clone()
        box1.applyMatrix4(object1.matrixWorld)

        let box2 = object2.geometry.boundingBox.clone()
        box2.applyMatrix4(object2.matrixWorld)

        return box1.intersectsBox(box2)
    }
}