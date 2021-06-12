/* eslint-disable require-jsdoc */
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
    constructor(domElement, animation, mesh, collider, collisions) {
        this.socket = Config.socket
        this.domElement = domElement
        this.animation = animation
        this.mesh = mesh
        this.collider = collider
        this.collisions = collisions

        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false)
    }

    onKeyDown(event) {
        let collision
        switch (event.keyCode) {
        case KEYS.ArrowUp:
        case KEYS.W:
            if (!Config.move) {
                collision = this.collisions.playerWallCollision(
                    this.mesh.position.x, this.mesh.position.z, 'u'
                )

                if (collision === 'U') {
                    Config.moveCrate = this.collisions.searchCrate(
                        this.mesh.position.x, this.mesh.position.z, 'u'
                    )
                    Config.moveCrate.rotation.y = Math.PI / 2
                } else {
                    Config.moveCrate = null
                }

                this.mesh.rotation.y = Math.PI / 2
                this.collider.rotation.y = Math.PI / 2
            }
            break

        case KEYS.ArrowLeft:
        case KEYS.A:
            if (!Config.move) {
                collision = this.collisions.playerWallCollision(
                    this.mesh.position.x, this.mesh.position.z, 'l'
                )

                if (collision === 'L') {
                    Config.moveCrate = this.collisions.searchCrate(
                        this.mesh.position.x, this.mesh.position.z, 'l'
                    )
                    Config.moveCrate.rotation.y = Math.PI
                } else {
                    Config.moveCrate = null
                }

                this.mesh.rotation.y = Math.PI
                this.collider.rotation.y = Math.PI
            }
            break

        case KEYS.ArrowDown:
        case KEYS.S:
            if (!Config.move) {
                collision = this.collisions.playerWallCollision(
                    this.mesh.position.x, this.mesh.position.z, 'd'
                )

                if (collision === 'D') {
                    Config.moveCrate = this.collisions.searchCrate(
                        this.mesh.position.x, this.mesh.position.z, 'd'
                    )
                    Config.moveCrate.rotation.y = -Math.PI / 2
                } else {
                    Config.moveCrate = null
                }

                this.mesh.rotation.y = -Math.PI / 2
                this.collider.rotation.y = -Math.PI / 2
            }
            break
    
        case KEYS.ArrowRight:
        case KEYS.D:
            if (!Config.move) {
                collision = this.collisions.playerWallCollision(
                    this.mesh.position.x, this.mesh.position.z, 'r'
                )
                
                if (collision === 'R') {
                    Config.moveCrate = this.collisions.searchCrate(
                        this.mesh.position.x, this.mesh.position.z, 'r'
                    )
                    Config.moveCrate.rotation.y = 0
                } else {
                    Config.moveCrate = null
                }

                this.mesh.rotation.y = 0
                this.collider.rotation.y = 0
            }
            break

        default:
            return
        }
        
        Config.move = collision !== false

        if (Config.move && collision !== undefined) {
            console.log(collision)
            this.socket.emit('move', collision)
            this.animation.playAnim('CrWalk')
            document.getElementById('moves').innerText++
        }
    }
}
