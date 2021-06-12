/* eslint-disable require-jsdoc */
import {
    LoadingManager,
    Clock,
    Vector3,
    Scene
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import MapLoader from './MapLoader'
import Renderer from './Renderer'
import Camera from './Camera'
import Player from './Player'
import Keyboard from './Keyboard'
import Animation from './Animation'
import Config from './Config'
import Collisions from './Collisions'

export default class Main {
    constructor(container, isPlayer) {
        document.getElementById('moves').innerText = 0
        this.isLoaded = null
        this.animation = null
        this.collider = null
        this.container = container
        this.isPlayer = isPlayer

        this.scene = new Scene()
        this.clock = new Clock()
        this.manager = new LoadingManager()
        this.objects = new MapLoader().load()

        this.collisions = new Collisions(this.objects)
        this.renderer = new Renderer(this.container)
        this.camera = new Camera(25, (window.innerWidth / 2), window.innerHeight)

        // eslint-disable-next-line no-unused-vars
        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        const vector = new Vector3((Config.map[0].length - 1) * Config.size / 2, 0, (2 + (Config.map.length - 1) / 2) * Config.size)

        this.camera.position.set((Config.map[0].length - 1) * Config.size * 2, 900, (2 + (Config.map.length - 1)) * Config.size * 2)
        this.camera.lookAt(vector)

        this.player = new Player(this.scene, this.manager, isPlayer)
        this.player.load()

        this.scene.add(this.objects.collider)
        this.scene.add(this.objects.floor)
        for (let i in this.objects.walls) {
            this.scene.add(this.objects.walls[i])
        }
        for (let i in this.objects.boxes) {
            this.scene.add(this.objects.boxes[i])
        }
        for (let i in this.objects.goals) {
            this.scene.add(this.objects.goals[i])
        }

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)

            this.player.mesh.position.set(
                Config.size * this.objects.player.x,
                24,
                Config.size * this.objects.player.z,
            )

            this.objects.collider.position.x = Config.size * this.objects.player.x
            this.objects.collider.position.z = Config.size * this.objects.player.z

            if (isPlayer) {
                this.animation.playAnim('Stand')
                this.keyboard = new Keyboard(window, this.animation, this.player.mesh, this.objects.collider, this.collisions)
            } else {
                this.animation.playAnim('stand')
            }
        }

        this.render()
    }

    render() {
        let delta = this.clock.getDelta()
        if (this.animation) this.animation.update(delta)

        this.renderer.setViewport(
            0, 0,
            innerWidth, innerHeight
        )

        this.renderer.render(this.scene, this.camera)

        if (this.player.mesh && this.isPlayer) { 
            if (Config.move) {
                this.player.mesh.translateX(1)
                this.objects.collider.translateX(1)
                if (parseInt(this.player.mesh.position.x) % (Config.size) === 0 &&
                parseInt(this.player.mesh.position.z) % (Config.size) === 0) {
                    Config.move = false
                    this.animation.playAnim('CrStand')
                }
            }
        }

        this.collisions.playerGoalCollision()

        requestAnimationFrame(this.render.bind(this))
    }
}
