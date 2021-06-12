/* eslint-disable require-jsdoc */
import Collisions from './Collisions'
import Config from './Config'

const KEYS = {
    'ArrowUp': 38,
    'W': 87,
    'ArrowLeft': 37,
    'A': 65,
    'ArrowDown': 40,
    'S': 83,
    'ArrowRight': 39,
    'D': 68
}

export default class Keyboard {
    constructor(domElement, animation, mesh, collider) {
        this.domElement = domElement
        this.animation = animation
        this.mesh = mesh
        this.collider = collider
        this.collisions = new Collisions()

        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false)
    }

    onKeyDown(event) {
        let collision
        switch (event.keyCode) {
        case KEYS.ArrowUp:
        case KEYS.W:
            if (!Config.move) {
                collision = this.collisions.detectWall(
                    this.mesh.position.x, this.mesh.position.z, 'u'
                )

                this.mesh.rotation.y = Math.PI
                this.collider.rotation.y = Math.PI
            }
            break

        case KEYS.ArrowLeft:
        case KEYS.A:
            if (!Config.move) {
                collision = this.collisions.detectWall(
                    this.mesh.position.x, this.mesh.position.z, 'l'
                )

                this.mesh.rotation.y = -Math.PI / 2
                this.collider.rotation.y = -Math.PI / 2
            }
            break

        case KEYS.ArrowDown:
        case KEYS.S:
            if (!Config.move) {
                collision = this.collisions.detectWall(
                    this.mesh.position.x, this.mesh.position.z, 'd'
                )

                this.mesh.rotation.y = 0
                this.collider.rotation.y = 0
            }
            break
    
        case KEYS.ArrowRight:
        case KEYS.D:
            if (!Config.move) {
                collision = this.collisions.detectWall(
                    this.mesh.position.x, this.mesh.position.z, 'r'
                )

                this.mesh.rotation.y = Math.PI / 2
                this.collider.rotation.y = Math.PI / 2
            }
            break

        default:
            return
        }
        
        Config.move = collision !== false

        if (Config.move && collision !== undefined) {
            this.animation.playAnim('CrWalk')
            document.getElementById('moves').innerText++
        }
    }
}
