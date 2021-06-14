/* eslint-disable require-jsdoc */

import Config from './Config'

export default class Collisions {
    constructor(objects) {
        this.objects = objects
    }

    searchBox(x, z, dir) {
        let x1 = x, z1 = z
        
        switch (dir.toLowerCase()) {
        case 'u':
            z1 -= Config.size
            break
        case 'l':
            x1 -= Config.size
            break
        case 'd':
            z1 += Config.size
            break
        case 'r':
            x1 += Config.size
            break
        }

        for (let i in this.objects.boxes) {
            if (
                this.objects.boxes[i].position.x === x1 &&
                this.objects.boxes[i].position.z === z1
            ) return this.objects.boxes[i]
        }

        return null
    }

    playerWallCollision(x, z, dir) {
        let x1 = x, z1 = z

        switch (dir) {
        case 'u':
            z1 -= Config.size
            break
        case 'l':
            x1 -= Config.size
            break
        case 'd':
            z1 += Config.size
            break
        case 'r':
            x1 += Config.size
            break
        }

        for (let i in this.objects.walls) {
            if (
                this.objects.walls[i].position.x === x1 &&
                this.objects.walls[i].position.z === z1
            ) return false
        }

        return this.playerBoxCollision(dir, x1, z1)
    }

    playerBoxCollision(dir, x1, z1) {
        let x2 = x1, z2 = z1

        switch (dir) {
        case 'u':
            z2 -= Config.size
            break
        case 'l':
            x2 -= Config.size
            break
        case 'd':
            z2 += Config.size
            break
        case 'r':
            x2 += Config.size
            break
        }

        for (let i in this.objects.boxes) {
            if (
                this.objects.boxes[i].position.x === x1 &&
                this.objects.boxes[i].position.z === z1
            ) {
                if (this.boxWallCollision(x2, z2)) return false
                else if (this.boxBoxCollision(x2, z2)) return false
                else return dir.toUpperCase()
            }
        }

        return dir
    }

    boxWallCollision(x2, z2) {
        for (let i in this.objects.walls) {
            if (
                this.objects.walls[i].position.x === x2 &&
                this.objects.walls[i].position.z === z2
            ) {
                return true
            }
        }

        return false
    }

    boxBoxCollision(x2, z2) {
        for (let i in this.objects.boxes) {
            if (
                this.objects.boxes[i].position.x === x2 &&
                this.objects.boxes[i].position.z === z2
            ) {
                return true
            }
        }

        return false
    }

    detectCollisions(object1, object2) {
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

    goalCollisions() {
        let bool
        for (let i in this.objects.goals) {
            for (let j in this.objects.boxes) {
                bool = (
                    this.detectCollisions(this.objects.goals[i], this.objects.boxes[j]) ||
                    this.detectCollisions(this.objects.goals[i], this.objects.collider)
                )
                this.objects.goals[i].update(bool)
                if (bool) {
                    console.log(bool)
                    break
                }
            }
        }
    }

    gameEndCheck() {
        let c = 0

        for (let i in this.objects.goals) {
            for (let j in this.objects.boxes) {
                if (this.detectCollisions(this.objects.goals[i], this.objects.boxes[j])) {
                    c++
                    break
                }
            }
        }

        return c === this.objects.goals.length
    }
}
